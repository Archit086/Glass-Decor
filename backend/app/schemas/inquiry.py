from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing import Optional
from datetime import datetime

class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., min_length=7, max_length=20)
    message: str = Field(..., min_length=5)

class InquiryResponse(InquiryCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
