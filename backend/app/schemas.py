from pydantic import BaseModel

# Name of movie and user preferences
class Media(BaseModel):
    name: str
    preferences: str

class RecommendationResponse(BaseModel):
    text: str