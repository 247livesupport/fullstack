import json
import requests
import os

def handler(event, context):
    # 1. Get city from query params (e.g., ?city=London)
    city = event.get("queryStringParameters", {}).get("city", "New York")
    
    # In a real app, you'd use an Env Var for the API Key
    # API_KEY = os.environ.get("WEATHER_API_KEY")
    # For now, we'll use a mock response so you can build the UI immediately
    
    mock_data = {
        "city": city,
        "temp": 22,
        "condition": "Cloudy",
        "theme_color": "#6366f1" # Indigo
    }
    
    return {
        "statusCode": 200,
        "body": json.dumps(mock_data),
        "headers": {"Content-Type": "application/json"}
    }