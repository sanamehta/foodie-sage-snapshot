
import { motion } from 'framer-motion';
import { RecipeData } from '@/lib/types';

interface RecipeCardProps {
  recipe: RecipeData;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-semibold">{recipe.title}</h3>
          <HealthScore score={recipe.healthyScore} />
        </div>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <TimeBadge icon="clock" label="Prep" time={recipe.prepTime} />
          <TimeBadge icon="fire" label="Cook" time={recipe.cookTime} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Ingredients</h4>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">Instructions</h4>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-medium mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">{instruction}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface HealthScoreProps {
  score: number;
}

const HealthScore = ({ score }: HealthScoreProps) => {
  let color = "bg-red-500";
  
  if (score >= 8) {
    color = "bg-green-500";
  } else if (score >= 5) {
    color = "bg-yellow-500";
  }
  
  return (
    <div className="flex flex-col items-center">
      <div className={`h-10 w-10 rounded-full ${color} flex items-center justify-center text-white font-bold`}>
        {score}
      </div>
      <span className="text-xs text-gray-500 mt-1">Health Score</span>
    </div>
  );
};

interface TimeBadgeProps {
  icon: "clock" | "fire";
  label: string;
  time: string;
}

const TimeBadge = ({ icon, label, time }: TimeBadgeProps) => {
  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg">
      <span className="mr-1.5">
        {icon === "clock" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9.5 9C9.5 8.44772 9.05228 8 8.5 8C7.94772 8 7.5 8.44772 7.5 9C7.5 9.55228 7.94772 10 8.5 10C9.05228 10 9.5 9.55228 9.5 9Z" fill="currentColor" />
            <path d="M16.5 9C16.5 8.44772 16.0523 8 15.5 8C14.9477 8 14.5 8.44772 14.5 9C14.5 9.55228 14.9477 10 15.5 10C16.0523 10 16.5 9.55228 16.5 9Z" fill="currentColor" />
            <path d="M8 14C8.5 15.5 10 17 12 17C14 17 15.5 15.5 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <div className="flex flex-col">
        <span className="text-xs text-gray-500">{label}</span>
        <span className="text-sm font-medium">{time}</span>
      </div>
    </div>
  );
};

export default RecipeCard;
