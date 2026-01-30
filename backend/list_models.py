# List available models
from google import genai

API_KEY = "AIzaSyCdK4R7NbQVnZXVUa-BLQxMvhST0AxFXw4"

client = genai.Client(api_key=API_KEY)

print("Available models:")
for model in client.models.list():
    print(f"  - {model.name}")
