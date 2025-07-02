import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-start space-x-3"
    >
      {/* AI Avatar */}
      <div className="p-2 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600">
        <Brain className="w-5 h-5 text-white" />
      </div>

      {/* Typing Animation */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4">
        <div className="flex items-center space-x-2">
          <span className="text-white/70 text-sm">AI is thinking</span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-cyan-400 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;