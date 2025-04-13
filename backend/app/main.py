from fastapi import FastAPI
from .routers import recommendation

app = FastAPI()

app.include_router(recommendation.router)

@app.get("/")
def root():
    return {"message": "Hello World"}