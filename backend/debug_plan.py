# Debug: test the full plan_task function
import json
from vertex_llm import generate_text

task = "write an essay on car"

prompt = f"""
You are an expert AI planner. Break down the following user task into a precise, ordered list of high-level, actionable steps.
Task: "{task}"

Rules:
1. Output MUST be a valid JSON array of strings.
2. No explanations, no markdown, no other text.
3. Steps should be clear and concise.
4. Do not include tool names or code snippets.

Example output:
["Search for the history of AI", "Summarize the key events", "Write a short report to report.txt"]
"""

print("Sending prompt to LLM...")
response = generate_text(prompt, temperature=0.0)

print("\n--- RAW RESPONSE ---")
print(repr(response))

# Clean up potential markdown formatting
cleaned_response = response.strip()
if cleaned_response.startswith("```json"):
    cleaned_response = cleaned_response[7:]
if cleaned_response.startswith("```"):
    cleaned_response = cleaned_response[3:]
if cleaned_response.endswith("```"):
    cleaned_response = cleaned_response[:-3]

print("\n--- CLEANED RESPONSE ---")
print(repr(cleaned_response.strip()))

try:
    plan = json.loads(cleaned_response.strip())
    print("\n--- PARSED SUCCESSFULLY ---")
    for i, step in enumerate(plan, 1):
        print(f"{i}. {step}")
except json.JSONDecodeError as e:
    print(f"\n--- JSON PARSE ERROR ---")
    print(f"Error: {e}")
