# Quick test with different model
from google import genai
from google.genai import types

API_KEY = "AIzaSyCdK4R7NbQVnZXVUa-BLQxMvhST0AxFXw4"

print("Testing with models/gemini-2.5-flash...")
try:
    client = genai.Client(api_key=API_KEY)
    response = client.models.generate_content(
        model="models/gemini-2.5-flash",
        contents="Say 'hello' only.",
        config=types.GenerateContentConfig(temperature=0.0)
    )
    print(f"SUCCESS: {response.text.strip()}")
except Exception as e:
    print(f"ERROR: {str(e)[:300]}")
