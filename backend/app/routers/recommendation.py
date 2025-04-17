from fastapi import APIRouter, HTTPException, status
from .. import schemas
from app.utils.generate import get_response

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)

@router.post("/", status_code=status.HTTP_200_OK, response_model=schemas.RecommendationResponse)
def create_recommendations(media: schemas.Media):
    # Generate response using LLM
    response = get_response("test_prompt.txt", name=media.name, about=media.about)

    if not response:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Generate response failed")
    
    print(response)

    return {"text": response}