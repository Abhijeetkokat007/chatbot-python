from fastapi import FastAPI
from pydantic import BaseModel
import google.generativeai as ai
from fastapi.middleware.cors import CORSMiddleware

# Direct API Key (Replace with your actual key)
API_KEY = "AIzaSyDPt_z1OBtkBjtV-1z1Nkt8plmr8krNE1M"

# Configure Google Gemini AI
ai.configure(api_key=API_KEY)
model = ai.GenerativeModel("gemini-pro")
chat = model.start_chat()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Allow React frontend to communicate)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model for chatbot messages
class ChatRequest(BaseModel):
    message: str

# Route to handle chat messages
@app.post("/chat")
async def chat_with_ai(request: ChatRequest):
    try:
        response = chat.send_message(request.message)
        return {"response": response.text}
    except Exception as e:
        return {"error": str(e)}

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
