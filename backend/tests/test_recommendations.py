import pytest
from app import schemas

@pytest.mark.parametrize("name, preferences, text", [('The Dark Knight', 'I like action movies.', '**Recommendation:** Yes'), ('The Dark Knight', 'I like romance movies.', '**Recommendation:** No')])
def test_recommendation(client, name, preferences, text):
    res = client.post("/recommendations/", json={"name": name, "preferences": preferences})
    recommendation = schemas.RecommendationResponse(**res.json())
    assert text in recommendation.text