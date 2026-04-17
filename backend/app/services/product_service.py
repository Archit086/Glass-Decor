from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from sqlalchemy.orm import selectinload
from typing import Optional
from datetime import datetime, timezone
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductUpdate

class ProductService:
    @staticmethod
    async def get_all(
        session: AsyncSession, 
        category_id: Optional[int] = None, 
        search: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None
    ):
        query = select(Product).options(selectinload(Product.category))
        
        if category_id is not None:
            query = query.where(Product.category_id == category_id)
        if search:
            query = query.where(Product.name.ilike(f"%{search}%"))
        if min_price is not None:
            query = query.where(Product.price >= min_price)
        if max_price is not None:
            query = query.where(Product.price <= max_price)
            
        result = await session.exec(query)
        return result.all()

    @staticmethod
    async def get_by_id(session: AsyncSession, product_id: int):
        query = select(Product).options(selectinload(Product.category)).where(Product.id == product_id)
        result = await session.exec(query)
        product = result.first()
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
        return product

    @staticmethod
    async def create(session: AsyncSession, product_in: ProductCreate):
        category = await session.get(Category, product_in.category_id)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
            
        product = Product.model_validate(product_in)
        session.add(product)
        await session.commit()
        await session.refresh(product)
        # return with category loaded ideally, but creation might just return basic product schema.
        return product

    @staticmethod
    async def update(session: AsyncSession, product_id: int, product_in: ProductUpdate):
        product = await session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        if product_in.category_id is not None:
            category = await session.get(Category, product_in.category_id)
            if not category:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
                
        update_data = product_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(product, key, value)
            
        product.updated_at = datetime.now(timezone.utc)
        session.add(product)
        await session.commit()
        await session.refresh(product)
        return product

    @staticmethod
    async def delete(session: AsyncSession, product_id: int):
        product = await session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        await session.delete(product)
        await session.commit()
        return {"ok": True}
