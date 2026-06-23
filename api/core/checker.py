import re

COMMON_PASSWORDS = {"password", "123456", "12345678", "qwerty", "admin", "password123", "letmein"}

def check_password(password: str) -> dict:
    feedback = []
    score = 0
    length = len(password)
    
    if length >= 16: score += 35
    elif length >= 12: score += 25
    elif length >= 8: score += 15

    has_lower = bool(re.search(r"[a-z]", password))
    has_upper = bool(re.search(r"[A-Z]", password))
    has_digit = bool(re.search(r"\d", password))
    has_special = bool(re.search(r"[^a-zA-Z0-9]", password))

    if has_lower: score += 10
    if has_upper: score += 15
    if has_digit: score += 15
    if has_special: score += 25

    lower_pwd = password.lower()
    threats = []

    if lower_pwd in COMMON_PASSWORDS:
        score -= 50
        threats.append("Dictionary Attack")
        feedback.append("Breach detected: Found in known dictionary.")

    seqs = ["12345", "qwerty", "asdfg", "123456", "abcde"]
    for seq in seqs:
        if seq in lower_pwd:
            score -= 20
            threats.append("Sequential Walk")
            feedback.append(f"Vulnerability: Sequential pattern '{seq}'.")
            break

    if re.search(r"(.)\1{2,}", lower_pwd):
        score -= 15
        threats.append("Character Repetition")
        feedback.append("Vulnerability: Repeating characters.")

    score = max(0, min(100, score))

    if score < 40: strength = "CRITICAL"
    elif score < 70: strength = "VULNERABLE"
    elif score < 90: strength = "SECURE"
    else: strength = "IMPENETRABLE"

    if not feedback and strength == "IMPENETRABLE":
        feedback.append("System: Shield integrity at maximum. No vulnerabilities detected.")
    elif not feedback:
        feedback.append("System: Password is secure, but entropy could be increased.")

    return {
        "score": score,
        "strength": strength,
        "feedback": feedback,
        "threats": threats,
        "length": length,
        "classes": {
            "lower": has_lower,
            "upper": has_upper,
            "digit": has_digit,
            "special": has_special
        }
    }
