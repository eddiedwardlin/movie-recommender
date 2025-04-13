from pydantic import BaseModel

class Media(BaseModel):
    type: str
    title: str
    content: str

class RecommendationResponse(BaseModel):
    text: str