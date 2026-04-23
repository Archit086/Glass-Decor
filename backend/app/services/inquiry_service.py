from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
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

    @staticmethod
    async def get_all(session: AsyncSession):
        statement = select(Inquiry).order_by(Inquiry.created_at.desc())
        result = await session.exec(statement)
        return result.all()

    @staticmethod
    async def update_status(session: AsyncSession, inquiry_id: int, new_status: str):
        inquiry = await session.get(Inquiry, inquiry_id)
        if not inquiry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inquiry not found")
        inquiry.status = new_status
        session.add(inquiry)
        await session.commit()
        await session.refresh(inquiry)
        return inquiry

    @staticmethod
    async def delete(session: AsyncSession, inquiry_id: int):
        inquiry = await session.get(Inquiry, inquiry_id)
        if not inquiry:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Inquiry not found")
        await session.delete(inquiry)
        await session.commit()
        return {"ok": True}
