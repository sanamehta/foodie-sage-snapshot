
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AppLayout from '@/layout/AppLayout';
import FoodDetails from '@/components/FoodDetails';
import NutritionInfo from '@/components/NutritionInfo';
import RecipeCard from '@/components/RecipeCard';
import { FoodAnalysisResult } from '@/lib/types';
import { Button } from '@/components/ui/button';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state as { result: FoodAnalysisResult } || {};
  
  // If no result is passed, redirect to home
  if (!result) {
    navigate('/');
    return null;
  }
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto pt-4 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex justify-between items-center"
        >
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Upload
          </Button>
        </motion.div>
        
        <div className="space-y-8">
          <FoodDetails food={result.food} imageUrl={result.imageUrl} />
          
          <div className="grid md:grid-cols-2 gap-8">
            <NutritionInfo nutrition={result.nutrition} />
            <div className="flex items-center justify-center p-6 glass-card rounded-2xl">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative w-full h-full"
              >
                <div className="aspect-square max-w-[200px] mx-auto">
                  <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-4xl font-bold text-primary">
                        {result.nutrition.calories}
                      </span>
                      <span className="text-sm text-gray-500">calories</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-30">
                  <div className="w-full h-full border-8 border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                </div>
              </motion.div>
            </div>
          </div>
          
          <RecipeCard recipe={result.recipe} />
        </div>
      </div>
    </AppLayout>
  );
};

export default ResultsPage;
