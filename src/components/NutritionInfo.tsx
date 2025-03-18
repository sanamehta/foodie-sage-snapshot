
import { motion } from 'framer-motion';
import { NutritionData } from '@/lib/types';

interface NutritionInfoProps {
  nutrition: NutritionData;
}

const NutritionInfo = ({ nutrition }: NutritionInfoProps) => {
  // Calculate percentage for progress bars (based on general daily values)
  const getPercentage = (value: number, nutrient: keyof NutritionData) => {
    const dailyValues: Record<string, number> = {
      calories: 2000,
      protein: 50,
      carbs: 275,
      fat: 78,
      fiber: 28,
      sugar: 50
    };
    
    if (dailyValues[nutrient]) {
      return Math.min(100, Math.round((value / dailyValues[nutrient]) * 100));
    }
    return 0;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card rounded-2xl p-6 mb-8"
    >
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold">Nutrition Information</h3>
        <span className="text-sm text-gray-500">Per {nutrition.servingSize}</span>
      </div>
      
      <div className="space-y-4">
        <NutritionBar 
          label="Calories" 
          value={nutrition.calories} 
          unit="kcal" 
          percentage={getPercentage(nutrition.calories, 'calories')} 
          color="bg-amber-500"
        />
        
        <NutritionBar 
          label="Protein" 
          value={nutrition.protein} 
          unit="g" 
          percentage={getPercentage(nutrition.protein, 'protein')} 
          color="bg-blue-500"
        />
        
        <NutritionBar 
          label="Carbohydrates" 
          value={nutrition.carbs} 
          unit="g" 
          percentage={getPercentage(nutrition.carbs, 'carbs')} 
          color="bg-orange-500"
        />
        
        <NutritionBar 
          label="Fat" 
          value={nutrition.fat} 
          unit="g" 
          percentage={getPercentage(nutrition.fat, 'fat')} 
          color="bg-red-500"
        />
        
        <NutritionBar 
          label="Fiber" 
          value={nutrition.fiber} 
          unit="g" 
          percentage={getPercentage(nutrition.fiber, 'fiber')} 
          color="bg-green-500"
        />
        
        <NutritionBar 
          label="Sugar" 
          value={nutrition.sugar} 
          unit="g" 
          percentage={getPercentage(nutrition.sugar, 'sugar')} 
          color="bg-purple-500"
        />
      </div>
    </motion.div>
  );
};

interface NutritionBarProps {
  label: string;
  value: number;
  unit: string;
  percentage: number;
  color: string;
}

const NutritionBar = ({ label, value, unit, percentage, color }: NutritionBarProps) => {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm">
        <span>{label}</span>
        <span className="font-medium">{value} {unit}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div 
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
      <div className="text-right text-xs text-gray-500 mt-1">{percentage}% daily value</div>
    </div>
  );
};

export default NutritionInfo;
