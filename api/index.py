import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from core.checker import check_password
from core.entropy import calculate_entropy, estimate_crack_time

app = FastAPI(title="PASSHIELD-X API")

# Allow React frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PasswordRequest(BaseModel):
    password: str

@app.post("/api/analyze")
def analyze_password(req: PasswordRequest):
    if not req.password:
        return {
            "score": 0, 
            "entropy": 0, 
            "strength": "STANDBY", 
            "threats": [], 
            "feedback": ["System awaiting input..."],
            "crack_times": {"rtx": "N/A", "quantum": "N/A"},
            "classes": {"lower": False, "upper": False, "digit": False, "special": False}
        }
        
    analysis = check_password(req.password)
    entropy = calculate_entropy(req.password)
    crack_times = estimate_crack_time(entropy)
    
    return {
        **analysis,
        "entropy": entropy,
        "crack_times": crack_times
    }
