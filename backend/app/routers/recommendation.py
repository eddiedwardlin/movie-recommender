from fastapi import APIRouter, HTTPException, status
from .. import schemas

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

@router.post("/", status_code=status.HTTP_200_OK, response_model=schemas.RecommendationResponse)
def create_recommendations(media: schemas.Media):
    # Generate response using LLM
    response = True # Generate here
    if not response:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Generate response failed")

    return {"text": "generated"}