from fastapi import APIRouter, HTTPException, status
from .. import schemas
from app.utils.generate import get_response

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

# Get recommendation given movie name and preference description
@router.post("/", status_code=status.HTTP_200_OK, response_model=schemas.RecommendationResponse)
def create_recommendations(media: schemas.Media):
    # Generate response using LLM
    response = get_response("prompt_1.txt", name=media.name, about=media.preferences)

    if not response:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Generate response failed")

    return {"text": response}