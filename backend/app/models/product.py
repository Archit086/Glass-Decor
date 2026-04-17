from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime, timezone

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    description: Optional[str] = Field(default=None)
    price: Optional[float] = Field(default=None)
    category_id: int = Field(foreign_key="category.id", index=True)
    image_url: Optional[str] = Field(default=None)
    is_customizable: bool = Field(default=False)
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)

    category: Optional["Category"] = Relationship(back_populates="products")
    quotations: List["QuotationRequest"] = Relationship(back_populates="product")
