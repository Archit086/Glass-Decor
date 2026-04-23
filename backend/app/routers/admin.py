from fastapi import APIRouter, HTTPException, status
from app.schemas.admin import AdminLoginSchema, TokenResponse
from app.core.config import settings
from app.core.security import create_access_token

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/login", response_model=TokenResponse)
def login_admin(credentials: AdminLoginSchema):
    if credentials.email != settings.ADMIN_EMAIL or credentials.password != settings.ADMIN_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": "admin"})
    return {"access_token": access_token, "token_type": "bearer"}
