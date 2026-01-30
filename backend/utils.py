def generate_with_retry(
    generate_fn,
    prompt: str,
    temperature: float = 0.0,
    max_retries: int = 3
) -> str:
    last_error = None
    for _ in range(max_retries):
        try:
            return generate_fn(prompt, temperature=temperature)
        except Exception as e:
            last_error = e
            
    raise RuntimeError(f"All retries failed: {last_error}")
