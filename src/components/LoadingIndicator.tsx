
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator = ({ message = "Analyzing your food..." }: LoadingIndicatorProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-2xl max-w-md w-full mx-4 flex flex-col items-center"
      >
        <div className="relative w-20 h-20 mb-6">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-primary/10 rounded-full"
          />
          <svg
            className="w-20 h-20 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M12 4V8M16 8L18 6M8 8L6 6M4 12H8M16 12H20M18 18L16 16M6 18L8 16M12 16V20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium mb-2 text-center">{message}</h3>
        <p className="text-sm text-gray-500 text-center">
          Our AI is carefully studying your image for accurate results
        </p>
      </motion.div>
    </div>
  );
};

export default LoadingIndicator;
