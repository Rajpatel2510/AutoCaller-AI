from pydantic import BaseModel
from typing import List, Optional


class UserCallingSchema(BaseModel):
    name: str
    phone_number: str


class OutboundCallRequest(BaseModel):
    welcome_message: str
    short_description: str
    detailed_description: str
    users: List[UserCallingSchema]
    processing_mode: str
    stt: Optional[str] = None
    tts: Optional[str] = None
    LLM_model: str
    temperature: float