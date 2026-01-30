import os
import requests
from vertex_llm import generate_text

def _log_execution(tool_name: str):
    print(f"[TOOL] Executing: {tool_name}")

def search_web(query: str) -> dict:
    _log_execution("search_web")
    api_key = os.environ.get("SERPAPI_API_KEY")
    if not api_key:
        return {"status": "error", "output": "Missing SERPAPI_API_KEY environment variable"}

    try:
        response = requests.get(
            "https://serpapi.com/search",
            params={"q": query, "api_key": api_key, "engine": "google"},
            timeout=10
        )
        response.raise_for_status()
        data = response.json()
        
        results = []
        if "organic_results" in data:
            for item in data["organic_results"][:3]:
                title = item.get("title", "No title")
                snippet = item.get("snippet", "No snippet")
                results.append(f"- {title}: {snippet}")
        
        output = "\n".join(results) if results else "No results found."
        return {"status": "success", "output": output}

    except Exception as e:
        return {"status": "error", "output": f"Search failed: {str(e)}"}

def summarize_content(content: str) -> dict:
    _log_execution("summarize_content")
    try:
        # Cap input length to avoid token limits
        max_length = 20000
        safe_content = content[:max_length]
        
        prompt = f"Summarize the following text concisely:\n\n{safe_content}"
        summary = generate_text(prompt, temperature=0.0)
        
        return {"status": "success", "output": summary.strip()}

    except Exception as e:
        return {"status": "error", "output": f"Summarization failed: {str(e)}"}

def write_to_file(filename: str, content: str) -> dict:
    _log_execution("write_to_file")
    try:
        with open(filename, "w", encoding="utf-8") as f:
            f.write(content)
        return {"status": "success", "output": f"Successfully wrote to {filename}"}

    except Exception as e:
        return {"status": "error", "output": f"Write failed: {str(e)}"}
