from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime, timezone

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class QuotationRequest(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    phone: str
    product_id: int = Field(foreign_key="product.id")
    quantity: int = Field(default=1)
    custom_requirements: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=utc_now)

    product: Optional["Product"] = Relationship(back_populates="quotations")
