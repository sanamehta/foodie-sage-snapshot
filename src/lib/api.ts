
import { FoodAnalysisResult } from './types';
import { toast } from '@/components/ui/use-toast';

// Production URL (change this to your deployed backend URL when deploying)
const API_URL = 'http://localhost:5000/api';

export const analyzeFoodImage = async (imageFile: File): Promise<FoodAnalysisResult> => {
  try {
    toast({
      title: "Analyzing image...",
      description: "Please wait while we process your food image.",
    });

    // Create form data for sending the image
    const formData = new FormData();
    formData.append('image', imageFile);
    
    // Send request to the backend
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze image');
    }
    
    const result = await response.json();
    
    // Ensure we have all the required data
    if (!result.food || !result.nutrition || !result.recipe) {
      throw new Error('Incomplete analysis data received');
    }
    
    return result as FoodAnalysisResult;
  } catch (error) {
    console.error('Error analyzing food image:', error);
    toast({
      title: "Error analyzing image",
      description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};
