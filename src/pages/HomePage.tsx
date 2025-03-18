
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '@/layout/AppLayout';
import ImageUpload from '@/components/ImageUpload';
import LoadingIndicator from '@/components/LoadingIndicator';
import { analyzeFoodImage } from '@/lib/api';
import { FoodAnalysisResult } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';

const HomePage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleImageSelected = async (file: File) => {
    try {
      setIsAnalyzing(true);
      const result = await analyzeFoodImage(file);
      
      // In a real app, you might store this in a global state management solution
      // For simplicity, we're passing the result via navigation state
      navigate('/results', { state: { result } });
    } catch (error) {
      console.error('Error analyzing food image:', error);
      toast({
        title: "Error analyzing image",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AppLayout>
      {isAnalyzing && <LoadingIndicator />}
      <div className="max-w-4xl mx-auto pt-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-3">Food Analysis & Recipe Finder</h1>
          </motion.div>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Upload a photo of any food to identify it, get nutritional information, and discover recipes.
          </p>
        </motion.div>
        
        <div className="mb-8">
          <h2 className="text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
            Upload your food photo
          </h2>
          <ImageUpload onImageSelected={handleImageSelected} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>For testing: Upload an image with "pizza" or "salad" in the filename for sample responses</p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
