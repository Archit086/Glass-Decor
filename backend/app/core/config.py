import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres:postgres@localhost:5432/glass_decor")
    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "admin@glassdecor.com")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "admin_password_123")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "12345678901234567890123456789012")

settings = Settings()
