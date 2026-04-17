from fastapi import APIRouter, Depends, Query, status
from typing import List, Optional
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.database import get_session
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse, ProductResponseWithCategory
from app.services.product_service import ProductService

router = APIRouter(prefix="/products", tags=["Products"])

@router.get("", response_model=List[ProductResponse])
async def get_products(
    category_id: Optional[int] = Query(None, description="Filter by category ID"),
    search: Optional[str] = Query(None, description="Search by product name"),
    min_price: Optional[float] = Query(None, description="Minimum price"),
    max_price: Optional[float] = Query(None, description="Maximum price"),
    session: AsyncSession = Depends(get_session)
):
    return await ProductService.get_all(
        session, category_id=category_id, search=search, min_price=min_price, max_price=max_price
    )

@router.get("/{product_id}", response_model=ProductResponseWithCategory)
async def get_product(product_id: int, session: AsyncSession = Depends(get_session)):
    return await ProductService.get_by_id(session, product_id)

@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(product_in: ProductCreate, session: AsyncSession = Depends(get_session)):
    return await ProductService.create(session, product_in)

@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(product_id: int, product_in: ProductUpdate, session: AsyncSession = Depends(get_session)):
    return await ProductService.update(session, product_id, product_in)

@router.delete("/{product_id}", status_code=status.HTTP_200_OK)
async def delete_product(product_id: int, session: AsyncSession = Depends(get_session)):
    return await ProductService.delete(session, product_id)
