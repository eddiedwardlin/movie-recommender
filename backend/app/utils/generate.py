import os
from dotenv import load_dotenv
from pathlib import Path
from google import genai
from google.genai.types import Tool, GenerateContentConfig, GoogleSearch

load_dotenv()

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Get a response from Gemini using the prompt in the file
def get_response(prompt_file, **kwargs):
    client = genai.Client(api_key=GEMINI_API_KEY)
    model_id = "gemini-2.0-flash"
    google_search_tool = Tool(
        google_search = GoogleSearch()
    )

    prompt_path = Path(__file__).resolve().parent.parent / "data" / "prompts" / prompt_file

    with open(prompt_path, "r") as file:
        prompt = file.read()

    prompt = prompt.format(
         name=kwargs['name'],
         about=kwargs['about']
    )

    response = client.models.generate_content(
        model=model_id,
        contents=prompt, 
        config=GenerateContentConfig(
            temperature=0.0,
            tools=[google_search_tool], 
            response_modalities=["TEXT"],
        )
    )

    return response.candidates[0].content.parts[0].text