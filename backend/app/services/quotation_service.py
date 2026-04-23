from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select
from fastapi import HTTPException, status
from app.models.product import Product
from app.models.quotation import QuotationRequest
from app.schemas.quotation import QuotationRequestCreate

class QuotationService:
    @staticmethod
    async def create(session: AsyncSession, quote_in: QuotationRequestCreate):
        product = await session.get(Product, quote_in.product_id)
        if not product:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
            
        quote = QuotationRequest.model_validate(quote_in)
        session.add(quote)
        await session.commit()
        await session.refresh(quote)
        return quote

    @staticmethod
    async def get_all(session: AsyncSession):
        result = await session.exec(select(QuotationRequest).order_by(QuotationRequest.created_at.desc()))
        return result.all()

    @staticmethod
    async def update_status(session: AsyncSession, quote_id: int, new_status: str):
        quote = await session.get(QuotationRequest, quote_id)
        if not quote:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quotation not found")
        quote.status = new_status
        session.add(quote)
        await session.commit()
        await session.refresh(quote)
        return quote

    @staticmethod
    async def delete(session: AsyncSession, quote_id: int):
        quote = await session.get(QuotationRequest, quote_id)
        if not quote:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quotation not found")
        await session.delete(quote)
        await session.commit()
        return {"ok": True}
