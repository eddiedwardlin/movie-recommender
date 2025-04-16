from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import recommendation

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendation.router)

@app.get("/")
def root():
    return {"message": "Hello World"}