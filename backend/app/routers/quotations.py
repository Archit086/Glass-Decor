from fastapi import APIRouter, Depends, status
from typing import List
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.database import get_session
from app.schemas.quotation import QuotationRequestCreate, QuotationRequestResponse
from app.services.quotation_service import QuotationService
from app.core.auth_deps import get_current_admin
from pydantic import BaseModel

router = APIRouter(prefix="/quotation", tags=["Quotation"])

class StatusUpdate(BaseModel):
    status: str

@router.post("", response_model=QuotationRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_quotation(quote_in: QuotationRequestCreate, session: AsyncSession = Depends(get_session)):
    return await QuotationService.create(session, quote_in)

@router.get("", response_model=List[QuotationRequestResponse])
async def get_quotations(session: AsyncSession = Depends(get_session), admin: dict = Depends(get_current_admin)):
    return await QuotationService.get_all(session)

@router.patch("/{quote_id}/status", response_model=QuotationRequestResponse)
async def update_quotation_status(quote_id: int, status_update: StatusUpdate, session: AsyncSession = Depends(get_session), admin: dict = Depends(get_current_admin)):
    return await QuotationService.update_status(session, quote_id, status_update.status)

@router.delete("/{quote_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_quotation(quote_id: int, session: AsyncSession = Depends(get_session), admin: dict = Depends(get_current_admin)):
    await QuotationService.delete(session, quote_id)
    return None
