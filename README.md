
# Food Analysis & Recipe Finder

A web application that analyzes food images, identifies the food, and provides nutritional information and recipes.

## Features

- Upload food images for analysis
- Identifies food using OpenAI GPT-4o
- Provides nutritional information
- Suggests recipes

## Project Structure

- `src/` - React frontend
- `backend/` - Flask backend API

## Setup Instructions

### Frontend (React)

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npm run dev
```

### Backend (Flask)

1. Navigate to the backend directory:
```
cd backend
```

2. Create a virtual environment:
```
python -m venv venv
```

3. Activate the virtual environment:
- On Windows:
```
venv\Scripts\activate
```
- On macOS/Linux:
```
source venv/bin/activate
```

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Create a `.env` file by copying `.env.example`:
```
cp .env.example .env
```

6. Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
```

7. Start the Flask server:
```
python app.py
```

The backend will run on `http://localhost:5000`.

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router

### Backend
- Flask
- OpenAI API (GPT-4o)
- Python

## Notes

- For production, you should update the API_URL in `src/lib/api.ts` to point to your deployed backend.
- This application uses the OpenAI GPT-4o model which requires an API key with access to this model.
