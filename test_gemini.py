import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

print("API KEY exists:", bool(api_key))

try:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content("Hello! Return a JSON with { 'greeting': 'hi' }", generation_config={"response_mime_type": "application/json"})
    print("Success:", response.text)
except Exception as e:
    import traceback
    traceback.print_exc()
