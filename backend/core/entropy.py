import math

def calculate_entropy(password: str) -> float:
    if not password:
        return 0.0

    pool_size = 0
    if any(c.islower() for c in password): pool_size += 26
    if any(c.isupper() for c in password): pool_size += 26
    if any(c.isdigit() for c in password): pool_size += 10
    if any(not c.isalnum() for c in password): pool_size += 32

    if pool_size == 0:
        return 0.0

    return round(len(password) * math.log2(pool_size), 2)

def estimate_crack_time(entropy: float) -> dict:
    rtx_guesses = 100_000_000_000  # 100 Billion/sec
    quantum_guesses = 1_000_000_000_000_000  # 1 Quadrillion/sec
    
    try:
        combinations = 2 ** entropy
        rtx_seconds = combinations / rtx_guesses
        quantum_seconds = combinations / quantum_guesses
    except OverflowError:
        return {"rtx": "Centuries", "quantum": "Centuries"}

    def format_time(seconds):
        if seconds < 1: return "Instantly"
        if seconds < 60: return f"{int(seconds)}s"
        if seconds < 3600: return f"{int(seconds/60)}m"
        if seconds < 86400: return f"{int(seconds/3600)}h"
        if seconds < 31536000: return f"{int(seconds/86400)}d"
        if seconds < 3153600000: return f"{int(seconds/31536000)}y"
        return "Centuries"

    return {
        "rtx": format_time(rtx_seconds),
        "quantum": format_time(quantum_seconds)
    }
