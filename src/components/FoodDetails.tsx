
import { motion } from 'framer-motion';
import { FoodData } from '@/lib/types';

interface FoodDetailsProps {
  food: FoodData;
  imageUrl: string;
}

const FoodDetails = ({ food, imageUrl }: FoodDetailsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-2xl overflow-hidden mb-8"
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={food.name} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <div className="flex items-end justify-between">
            <h2 className="text-white text-2xl font-semibold">{food.name}</h2>
            <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {(food.confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300">{food.description}</p>
      </div>
    </motion.div>
  );
};

export default FoodDetails;
