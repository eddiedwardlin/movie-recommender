from pydantic import BaseModel

class Media(BaseModel):
    name: str
    about: str

class RecommendationResponse(BaseModel):
    text: str