
import os
import base64
import json
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import openai

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Initialize OpenAI API
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/api/analyze', methods=['POST'])
def analyze_food():
    try:
        # Get the image from the request
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400
        
        file = request.files['image']
        img = Image.open(file.stream)
        
        # Convert image to base64 for OpenAI API
        buffered = BytesIO()
        img.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        # Use OpenAI to identify the food
        food_name, confidence = identify_food_with_openai(img_str)
        
        # Get nutrition information and recipe
        nutrition_data = get_nutrition_data(food_name)
        recipe_data = get_recipe_data(food_name)
        
        # Create URL for image
        # In a production app, you would save the image and return a proper URL
        # For demo purposes, we'll return the base64 string
        image_url = f"data:image/jpeg;base64,{img_str}"
        
        return jsonify({
            "food": {
                "name": food_name,
                "confidence": confidence,
                "description": f"This appears to be {food_name}, a popular dish."
            },
            "nutrition": nutrition_data,
            "recipe": recipe_data,
            "imageUrl": image_url
        })
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def identify_food_with_openai(base64_image):
    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a food identification expert. Identify the food in the image and return ONLY a JSON object with two fields: 'name' (the name of the food) and 'confidence' (a number between 0 and 1 indicating your confidence)."
                },
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "What food is this?"},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=150
        )
        
        result = response.choices[0].message.content
        # Parse the JSON response
        food_data = json.loads(result)
        return food_data["name"], food_data["confidence"]
    
    except Exception as e:
        print(f"OpenAI API error: {str(e)}")
        return "Unknown Food", 0.5

def get_nutrition_data(food_name):
    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a nutrition expert. Provide detailed nutritional information for the given food. Return ONLY a JSON object with the following fields: calories (number), protein (number in g), carbs (number in g), fat (number in g), fiber (number in g), sugar (number in g), and servingSize (string)."
                },
                {
                    "role": "user",
                    "content": f"Provide nutritional information for {food_name}."
                }
            ],
            max_tokens=200
        )
        
        result = response.choices[0].message.content
        nutrition_data = json.loads(result)
        return nutrition_data
    
    except Exception as e:
        print(f"Error getting nutrition data: {str(e)}")
        # Return default nutrition data
        return {
            "calories": 250,
            "protein": 8,
            "carbs": 30,
            "fat": 12,
            "fiber": 3,
            "sugar": 5,
            "servingSize": "1 serving (100g)"
        }

def get_recipe_data(food_name):
    try:
        response = openai.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "system",
                    "content": "You are a culinary expert. Provide a recipe for the given food. Return ONLY a JSON object with the following fields: title (string), ingredients (array of strings), instructions (array of strings), prepTime (string), cookTime (string), and healthyScore (number from 1-10)."
                },
                {
                    "role": "user",
                    "content": f"Provide a recipe for {food_name}."
                }
            ],
            max_tokens=500
        )
        
        result = response.choices[0].message.content
        recipe_data = json.loads(result)
        return recipe_data
    
    except Exception as e:
        print(f"Error getting recipe data: {str(e)}")
        # Return default recipe data
        return {
            "title": f"{food_name} Recipe",
            "ingredients": [
                "Main ingredient (200g)",
                "Secondary ingredient (100g)",
                "Seasonings to taste",
                "Olive oil (1 tbsp)"
            ],
            "instructions": [
                "Prepare all ingredients as directed.",
                "Combine ingredients in a suitable cooking vessel.",
                "Cook according to typical preparation method.",
                "Serve and enjoy."
            ],
            "prepTime": "15 min",
            "cookTime": "20 min",
            "healthyScore": 7
        }

if __name__ == '__main__':
    app.run(debug=True, port=5000)
