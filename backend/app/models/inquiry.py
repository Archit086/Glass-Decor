from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class Inquiry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    phone: str
    message: str
    created_at: datetime = Field(default_factory=utc_now)
