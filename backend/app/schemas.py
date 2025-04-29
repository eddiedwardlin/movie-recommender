from pydantic import BaseModel

class Media(BaseModel):
    name: str
    preferences: str

class RecommendationResponse(BaseModel):
    text: str