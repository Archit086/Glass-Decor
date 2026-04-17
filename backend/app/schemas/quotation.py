from pydantic import BaseModel, ConfigDict, EmailStr, Field
from typing import Optional
from datetime import datetime

class QuotationRequestCreate(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    phone: str = Field(..., min_length=7, max_length=20)
    product_id: int
    quantity: int = Field(default=1, gt=0)
    custom_requirements: Optional[str] = None

class QuotationRequestResponse(QuotationRequestCreate):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
