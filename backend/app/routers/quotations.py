from fastapi import APIRouter, Depends, status
from typing import List
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.database import get_session
from app.schemas.quotation import QuotationRequestCreate, QuotationRequestResponse
from app.services.quotation_service import QuotationService

router = APIRouter(prefix="/quotation-request", tags=["Quotation"])

@router.post("", response_model=QuotationRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_quotation(quote_in: QuotationRequestCreate, session: AsyncSession = Depends(get_session)):
    return await QuotationService.create(session, quote_in)

@router.get("", response_model=List[QuotationRequestResponse])
async def get_quotations(session: AsyncSession = Depends(get_session)):
    return await QuotationService.get_all(session)
