# movie-recommender

This a webapp that takes in a query and presents a list of potential images. Users can then like and dislike images that suit their design taste.

### Instructions
1. Create and activate virtual environment
    - Run `python3 -m venv env` 
    - Run `source env/bin/activate`
2. Install dependencies
    - Run `pip install -r /backend/requirements.txt`
3. Navigate into /backend and create a .env file with the following environment variable
    - GEMINI_API_KEY=your-api-key
3. Run backend
    - Navigate into /backend
    - Run `fastapi dev app/main.py`
4. Navigate into /frontend and create a .env file with the following environment variable
    - VITE_API_URL="http://127.0.0.1:8000/"
5. Run frontend
    - `npm run dev`
6. Access web app at "http://localhost:5173/"