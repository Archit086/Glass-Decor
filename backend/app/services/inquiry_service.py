from sqlmodel.ext.asyncio.session import AsyncSession
from app.models.inquiry import Inquiry
from app.schemas.inquiry import InquiryCreate

class InquiryService:
    @staticmethod
    async def create(session: AsyncSession, inquiry_in: InquiryCreate):
        inquiry = Inquiry.model_validate(inquiry_in)
        session.add(inquiry)
        await session.commit()
        await session.refresh(inquiry)
        return inquiry
