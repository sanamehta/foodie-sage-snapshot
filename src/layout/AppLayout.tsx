
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
      <header className="fixed w-full top-0 z-10 glass-morphism px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/" className="text-xl font-semibold tracking-tight">
                FoodSage
              </a>
            </motion.div>
            <div className="hidden md:flex text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-3 mt-0.5">
              Food Recognition & Analysis
            </div>
          </motion.div>
        </div>
      </header>
      
      <main className="pt-20 pb-10 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      
      <footer className="pb-6 px-4 max-w-7xl mx-auto text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} FoodSage • Advanced Food Recognition Technology</p>
      </footer>
    </div>
  );
};

export default AppLayout;
