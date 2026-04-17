from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.routers import categories, products, inquiries, quotations

app = FastAPI(
    title="Glass Decor API",
    description="Product catalog and inquiry backend for Glass Decor.",
    version="1.0.0",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(categories.router)
app.include_router(products.router)
app.include_router(inquiries.router)
app.include_router(quotations.router)

@app.get("/")
def root():
    return {"message": "Welcome to Glass Decor API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
