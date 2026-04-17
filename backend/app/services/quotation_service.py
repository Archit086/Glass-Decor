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
        result = await session.exec(select(QuotationRequest))
        return result.all()
