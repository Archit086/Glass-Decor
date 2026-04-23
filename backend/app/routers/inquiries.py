from fastapi import APIRouter, Depends, status
from typing import List
from sqlmodel.ext.asyncio.session import AsyncSession
from app.core.database import get_session
from app.schemas.inquiry import InquiryCreate, InquiryResponse
from app.services.inquiry_service import InquiryService
from app.core.auth_deps import get_current_admin
from pydantic import BaseModel

router = APIRouter(prefix="/inquiry", tags=["Inquiry"])

class StatusUpdate(BaseModel):
    status: str

@router.post("", response_model=InquiryResponse, status_code=status.HTTP_201_CREATED)
async def create_inquiry(inquiry_in: InquiryCreate, session: AsyncSession = Depends(get_session)):
    return await InquiryService.create(session, inquiry_in)

@router.get("", response_model=List[InquiryResponse])
async def get_inquiries(session: AsyncSession = Depends(get_session), admin: dict = Depends(get_current_admin)):
    return await InquiryService.get_all(session)

@router.patch("/{inquiry_id}/status", response_model=InquiryResponse)
async def update_inquiry_status(inquiry_id: int, status_update: StatusUpdate, session: AsyncSession = Depends(get_session), admin: dict = Depends(get_current_admin)):
    return await InquiryService.update_status(session, inquiry_id, status_update.status)

@router.delete("/{inquiry_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_inquiry(inquiry_id: int, session: AsyncSession = Depends(get_session), admin: dict = Depends(get_current_admin)):
    await InquiryService.delete(session, inquiry_id)
    return None
