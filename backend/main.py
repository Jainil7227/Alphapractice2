

from agent import plan_task
from vertex_llm import generate_text
import tools

def run_agent(task: str) -> dict:
    steps = plan_task(task)
    logs = []
    context = ""
    original_task = task
    
    for step in steps:
        step_lower = step.lower()
        logs.append(f"Executing step: {step}")
        
        result = None
        
        if any(k in step_lower for k in ["search for", "search the", "web search", "look up online"]):
            # Use the step description as the query
            result = tools.search_web(step)
            
        elif "summarize" in step_lower:
            # Summarize the current context
            if context:
                result = tools.summarize_content(context)
            else:
                logs.append("Nothing to summarize yet, skipping.")
                continue
                
        elif any(k in step_lower for k in ["write", "save", "file"]):
            # Extract filename from the last word, handling punctuation
            filename = step.split()[-1].strip().rstrip(".")
            if "." not in filename:
                filename = "output.txt"
            result = tools.write_to_file(filename, context)
            
        else:
            # For any other step, use LLM to execute it
            try:
                prompt = f"""You are executing a step in a task.
                
Original task: {original_task}

Current step to execute: {step}

Previous context (if any):
{context[:2000] if context else "No previous context."}

Execute this step and provide the output. Be detailed and thorough."""
                
                llm_output = generate_text(prompt, temperature=0.3)
                result = {"status": "success", "output": llm_output}
                logs.append(f"Step executed via LLM.")
            except Exception as e:
                result = {"status": "error", "output": str(e)}
            
        # Handle result
        if result:
            if result["status"] == "error":
                logs.append(f"Step failed: {result['output']}")
                # Critical failure check
                if "search" in step_lower or "summarize" in step_lower:
                    logs.append("Critical step failed. Stopping execution.")
                    break
            else:
                context = result["output"]
                logs.append(f"Step success. Output length: {len(context)}")

    return {
        "steps": steps,
        "logs": logs,
        "result": context
    }

if __name__ == "__main__":
    import sys
    
    # Simple CLI
    if len(sys.argv) > 1:
        task = " ".join(sys.argv[1:])
    else:
        print("Enter your task:")
        task = input("> ")

    print(f"\n[Running Agent] Task: {task}\n")
    
    try:
        output = run_agent(task)
        
        print("-" * 40)
        print("PLAN:")
        for i, step in enumerate(output["steps"], 1):
            print(f"{i}. {step}")
            
        print("-" * 40)
        print("LOGS:")
        for log in output["logs"]:
            print(f"- {log}")
            
        print("-" * 40)
        print("FINAL RESULT:")
        print(output["result"])
        print("-" * 40)
        
    except Exception as e:
        print(f"\n[Error] {str(e)}")
