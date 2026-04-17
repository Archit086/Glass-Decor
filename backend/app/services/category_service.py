from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate

class CategoryService:
    @staticmethod
    async def get_all(session: AsyncSession):
        result = await session.exec(select(Category))
        return result.all()

    @staticmethod
    async def get_by_id(session: AsyncSession, category_id: int):
        category = await session.get(Category, category_id)
        if not category:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
        return category

    @staticmethod
    async def create(session: AsyncSession, category_in: CategoryCreate):
        # Check if name exists
        existing = await session.exec(select(Category).where(Category.name == category_in.name))
        if existing.first():
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Category with this name already exists")
        
        category = Category.model_validate(category_in)
        session.add(category)
        await session.commit()
        await session.refresh(category)
        return category

    @staticmethod
    async def update(session: AsyncSession, category_id: int, category_in: CategoryUpdate):
        category = await CategoryService.get_by_id(session, category_id)
        update_data = category_in.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(category, key, value)
        session.add(category)
        await session.commit()
        await session.refresh(category)
        return category

    @staticmethod
    async def delete(session: AsyncSession, category_id: int):
        category = await CategoryService.get_by_id(session, category_id)
        await session.delete(category)
        await session.commit()
        return {"ok": True}
