import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Settings, Wifi } from 'lucide-react';

interface HeaderProps {
  onSettingsClick: () => void;
  onClearChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick, onClearChat }) => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-20 w-full"
    >
      <div className="backdrop-blur-sm bg-white/3 border border-white/10 rounded-2xl p-6 mx-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="p-3 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl"
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <p className="text-white/70 text-sm">Math & Logic Solver</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 rounded-full border border-green-400/30">
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm font-medium">Online</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClearChat}
              className="px-4 py-2 bg-white/10 text-white/80 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              Clear
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSettingsClick}
              className="p-3 bg-white/10 text-white/80 rounded-xl border border-white/20 hover:bg-white/20 transition-all"
            >
              <Settings className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;