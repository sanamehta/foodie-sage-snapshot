
export interface FoodData {
  name: string;
  confidence: number;
  description?: string;
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  servingSize: string;
}

export interface RecipeData {
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  healthyScore: number; // 1-10 rating
}

export interface FoodAnalysisResult {
  food: FoodData;
  nutrition: NutritionData;
  recipe: RecipeData;
  imageUrl: string;
}
