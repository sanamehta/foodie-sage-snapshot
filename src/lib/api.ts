
import { FoodAnalysisResult } from './types';
import { toast } from '@/components/ui/use-toast';

// This is a mock API service for frontend development
// In a real application, you would connect to your Flask backend here

// Simulated API delay to mimic server processing time
const SIMULATED_DELAY = 2000;

// OpenAI API would be handled on the backend for security purposes
export const analyzeFoodImage = async (imageFile: File): Promise<FoodAnalysisResult> => {
  try {
    // In a real app, you'd upload the image to your backend here
    // const formData = new FormData();
    // formData.append('image', imageFile);
    // const response = await fetch('your-backend-url/analyze', {
    //   method: 'POST',
    //   body: formData,
    // });
    // return await response.json();

    // Create a URL for the image preview
    const imageUrl = URL.createObjectURL(imageFile);
    
    // For demo purposes, we'll simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, SIMULATED_DELAY));
    
    // Mock response based on the filename to simulate different results
    const filename = imageFile.name.toLowerCase();
    
    // Return mock data for demo purposes - in a real app this would come from the backend
    if (filename.includes("pizza")) {
      return {
        food: {
          name: "Margherita Pizza",
          confidence: 0.98,
          description: "A classic Italian pizza with tomato sauce, mozzarella cheese, and fresh basil."
        },
        nutrition: {
          calories: 285,
          protein: 12,
          carbs: 36,
          fat: 10.5,
          fiber: 2.3,
          sugar: 3.8,
          servingSize: "1 slice (107g)"
        },
        recipe: {
          title: "Homemade Margherita Pizza",
          ingredients: [
            "Pizza dough (1 ball)",
            "San Marzano tomatoes (200g)",
            "Fresh mozzarella (125g)",
            "Fresh basil leaves",
            "Extra virgin olive oil",
            "Salt to taste"
          ],
          instructions: [
            "Preheat oven to 500°F (260°C) with a pizza stone if available.",
            "Stretch the dough into a 12-inch circle on a floured surface.",
            "Crush tomatoes by hand and spread over dough leaving a 1-inch border.",
            "Tear mozzarella into pieces and distribute evenly.",
            "Bake for 8-10 minutes until crust is golden and cheese is bubbling.",
            "Top with fresh basil leaves and a drizzle of olive oil before serving."
          ],
          prepTime: "20 min",
          cookTime: "10 min",
          healthyScore: 6
        },
        imageUrl
      };
    } else if (filename.includes("salad")) {
      return {
        food: {
          name: "Mediterranean Salad",
          confidence: 0.94,
          description: "A fresh salad with mixed greens, tomatoes, cucumbers, olives, and feta cheese."
        },
        nutrition: {
          calories: 180,
          protein: 5,
          carbs: 10,
          fat: 15,
          fiber: 4,
          sugar: 3,
          servingSize: "1 bowl (150g)"
        },
        recipe: {
          title: "Fresh Mediterranean Salad",
          ingredients: [
            "Mixed greens (100g)",
            "Cherry tomatoes (10, halved)",
            "Cucumber (1/2, diced)",
            "Kalamata olives (10, pitted)",
            "Feta cheese (50g, crumbled)",
            "Red onion (1/4, thinly sliced)",
            "Extra virgin olive oil (2 tbsp)",
            "Lemon juice (1 tbsp)",
            "Dried oregano (1/2 tsp)"
          ],
          instructions: [
            "Wash and dry all produce thoroughly.",
            "Combine greens, tomatoes, cucumber, olives, and red onion in a large bowl.",
            "Whisk together olive oil, lemon juice, oregano, salt and pepper.",
            "Drizzle dressing over salad and toss gently to coat.",
            "Top with crumbled feta cheese and serve immediately."
          ],
          prepTime: "15 min",
          cookTime: "0 min",
          healthyScore: 9
        },
        imageUrl
      };
    } else {
      // Default mock response
      return {
        food: {
          name: "Food Item",
          confidence: 0.85,
          description: "This appears to be a prepared food dish. For more accurate results, try uploading a clearer image."
        },
        nutrition: {
          calories: 250,
          protein: 8,
          carbs: 30,
          fat: 12,
          fiber: 3,
          sugar: 5,
          servingSize: "1 serving (100g)"
        },
        recipe: {
          title: "Simple Healthy Recipe",
          ingredients: [
            "Main ingredient (200g)",
            "Secondary ingredient (100g)",
            "Seasonings to taste",
            "Olive oil (1 tbsp)"
          ],
          instructions: [
            "Prepare all ingredients as directed.",
            "Combine ingredients in a suitable cooking vessel.",
            "Cook according to typical preparation method.",
            "Serve and enjoy."
          ],
          prepTime: "15 min",
          cookTime: "20 min",
          healthyScore: 7
        },
        imageUrl
      };
    }
  } catch (error) {
    toast({
      title: "Error analyzing image",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};
