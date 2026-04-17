from fastapi import APIRouter, Depends, status
from typing import List
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.database import get_session
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryResponse
from app.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.get("", response_model=List[CategoryResponse])
async def get_categories(session: AsyncSession = Depends(get_session)):
    return await CategoryService.get_all(session)

@router.get("/{category_id}", response_model=CategoryResponse)
async def get_category(category_id: int, session: AsyncSession = Depends(get_session)):
    return await CategoryService.get_by_id(session, category_id)

@router.post("", response_model=CategoryResponse, status_code=status.HTTP_201_CREATED)
async def create_category(category_in: CategoryCreate, session: AsyncSession = Depends(get_session)):
    return await CategoryService.create(session, category_in)
