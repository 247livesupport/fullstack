import json

def handler(event, context):
    # 1. Get data from the JS frontend
    try:
        body = json.loads(event.get("body", "{}"))
        input_text = body.get("text", "")
        
        # 2. Perform some "Pythonic" logic (e.g., text analysis)
        char_count = len(input_text)
        word_count = len(input_text.split())
        is_pythonic = "import" in input_text.lower() or "def" in input_text.lower()

        # 3. Return a JSON response
        return {
            "statusCode": 200,
            "body": json.dumps({
                "message": "Analysis Complete",
                "stats": {
                    "characters": char_count,
                    "words": word_count,
                    "is_code": is_pythonic
                }
            }),
            "headers": {
                "Content-Type": "application/json"
            }
        }
    except Exception as e:
        return {"statusCode": 500, "body": str(e)}