import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const maxLength = 500;
  const characterCount = message.length;
  const isNearLimit = characterCount > maxLength * 0.8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Focus input with Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const suggestedPrompts = [
    "Calculate the integral",
    "Solve this equation",
    "Explain the concept",
    "Find the derivative"
  ];

  return (
    <div className="relative z-20 p-6">
      {/* Suggested Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap gap-2 mb-4 justify-center"
      >
        {suggestedPrompts.map((prompt, index) => (
          <motion.button
            key={prompt}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setMessage(prompt + ': ')}
            className="px-3 py-1.5 bg-white/8 text-white/70 text-sm rounded-full border border-white/20 hover:bg-white/15 hover:text-white/90 transition-all backdrop-blur-sm"
          >
            {prompt}
          </motion.button>
        ))}
      </motion.div>

      {/* Input Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className={`backdrop-blur-sm bg-white/8 border rounded-2xl transition-all duration-300 ${
          isFocused ? 'border-indigo-400/50 shadow-lg shadow-indigo-500/20' : 'border-white/20'
        }`}>
          <div className="flex items-end p-4 space-x-4">
            {/* Voice Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0 p-3 bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-xl hover:from-violet-600 hover:to-purple-700 transition-all"
            >
              <Mic className="w-5 h-5" />
            </motion.button>

            {/* Text Input */}
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask me anything about math or logic... (Ctrl+K to focus)"
                className="w-full bg-transparent text-white placeholder-white/50 border-none outline-none resize-none min-h-[2.5rem] max-h-32 py-2"
                rows={1}
                style={{
                  height: 'auto',
                  minHeight: '2.5rem',
                  maxHeight: '8rem',
                  overflowY: message.split('\n').length > 3 ? 'scroll' : 'hidden'
                }}
                disabled={isLoading}
              />
              
              {/* Character Count */}
              {characterCount > 0 && (
                <div className={`absolute -bottom-6 right-0 text-xs transition-colors ${
                  isNearLimit ? 'text-orange-400' : 'text-white/40'
                }`}>
                  {characterCount}/{maxLength}
                </div>
              )}
            </div>

            {/* Send Button */}
            <motion.button
              type="submit"
              disabled={!message.trim() || isLoading}
              whileHover={{ scale: message.trim() && !isLoading ? 1.1 : 1 }}
              whileTap={{ scale: message.trim() && !isLoading ? 0.9 : 1 }}
              className={`flex-shrink-0 p-3 rounded-xl transition-all ${
                message.trim() && !isLoading
                  ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white hover:from-indigo-600 hover:to-violet-700 shadow-lg'
                  : 'bg-white/10 text-white/40 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.form>

      {/* Keyboard Shortcut Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-white/30 text-xs mt-3"
      >
        Press Enter to send • Shift + Enter for new line • Ctrl + K to focus
      </motion.p>
    </div>
  );
};

export default ChatInput;