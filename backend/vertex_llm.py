import os
import time
from google import genai
from google.genai import types

# API Keys for rotation
API_KEYS = [
    "AIzaSyCdK4R7NbQVnZXVUa-BLQxMvhST0AxFXw4",
    "AIzaSyD7pEwfz7e3I_1mCuaCnzgma9OW5SaDwGw",
    "AIzaSyAyiHj-n7foIr-P2K_UaIcm1plONy6YXbA",
    "AIzaSyDzYtFbmtYxGnvtJzu2gbPSDEGf-LZMaQ8"
]

current_key_index = 0

def _get_client():
    global current_key_index
    return genai.Client(api_key=API_KEYS[current_key_index])

def _rotate_key():
    global current_key_index
    current_key_index = (current_key_index + 1) % len(API_KEYS)

def generate_text(prompt: str, temperature: float = 0.0) -> str:
    global current_key_index
    
    # Try through all keys, with retry delay
    for attempt in range(len(API_KEYS) * 2):  # Allow 2 rounds of retries
        try:
            client = _get_client()
            response = client.models.generate_content(
                model="models/gemini-2.5-flash",
                contents=prompt,
                config=types.GenerateContentConfig(temperature=temperature)
            )
            return response.text
        except Exception as e:
            error_msg = str(e).lower()
            if "429" in error_msg or "quota" in error_msg or "resource_exhausted" in error_msg:
                _rotate_key()
                # Wait before next attempt
                time.sleep(5)
                continue
            elif "403" in error_msg or "permission" in error_msg:
                _rotate_key()
                continue
            else:
                raise e
                
    raise RuntimeError("All API keys exhausted or rate limited. Please wait a minute and try again.")
