import json
from vertex_llm import generate_text

def plan_task(task: str) -> list[str]:
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
    try:
        response = generate_text(prompt, temperature=0.0)
        
        # Clean up potential markdown formatting
        cleaned_response = response.strip()
        if cleaned_response.startswith("```json"):
            cleaned_response = cleaned_response[7:]
        if cleaned_response.startswith("```"):
            cleaned_response = cleaned_response[3:]
        if cleaned_response.endswith("```"):
            cleaned_response = cleaned_response[:-3]
        
        plan = json.loads(cleaned_response.strip())
        
        if not isinstance(plan, list) or not all(isinstance(step, str) for step in plan):
             raise ValueError("Model output is not a list of strings")
             
        return plan

    except json.JSONDecodeError:
        raise ValueError("Failed to parse plan from model output")
    except Exception as e:
        raise ValueError(f"Planning failed: {str(e)}")
