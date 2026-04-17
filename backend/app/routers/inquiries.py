from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.database import get_session
from app.schemas.inquiry import InquiryCreate, InquiryResponse
from app.services.inquiry_service import InquiryService

router = APIRouter(prefix="/inquiry", tags=["Inquiry"])

@router.post("", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_inquiry(inquiry_in: InquiryCreate, session: AsyncSession = Depends(get_session)):
    return await InquiryService.create(session, inquiry_in)
