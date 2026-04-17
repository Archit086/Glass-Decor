from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime
from app.schemas.category import CategoryResponse

class ProductBase(BaseModel):
    name: str = Field(..., min_length=1)
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: int
    image_url: Optional[str] = None
    is_customizable: bool = False

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)
    description: Optional[str] = None
    price: Optional[float] = None
    category_id: Optional[int] = None
    image_url: Optional[str] = None
    is_customizable: Optional[bool] = None

class ProductResponse(ProductBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ProductResponseWithCategory(ProductResponse):
    category: Optional[CategoryResponse] = None
