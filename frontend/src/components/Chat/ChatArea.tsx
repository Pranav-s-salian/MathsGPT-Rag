import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Message } from '../../types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

interface ChatAreaProps {
  messages: Message[];
  isLoading: boolean;
  onCopy: (content: string) => void;
}

const ChatArea: React.FC<ChatAreaProps> = ({ messages, isLoading, onCopy }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = React.useState(false);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    }
  };

  const welcomeMessage = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent mb-4">
          Welcome to AI Assistant
        </h2>
        <p className="text-white/70 mb-6">
          I'm here to help you with math problems and logic questions. Ask me anything!
        </p>
        
        <div className="space-y-3">
          <p className="text-white/50 text-sm font-medium">Try asking:</p>
          <div className="space-y-2">
            {[
              "Solve x² + 5x - 6 = 0",
              "What's the derivative of sin(x)?",
              "Explain the Pythagorean theorem"
            ].map((example, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-lg p-3 text-white/60 text-sm hover:bg-white/10 transition-all cursor-pointer"
              >
                {example}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative flex-1 overflow-hidden">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto scroll-smooth p-6 space-y-6"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.3) transparent' }}
      >
        {messages.length === 0 ? (
          welcomeMessage
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={onCopy}
              />
            ))}
            
            <AnimatePresence>
              {isLoading && <TypingIndicator />}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Scroll to Bottom Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToBottom}
            className="absolute bottom-6 right-6 p-3 bg-indigo-500/80 backdrop-blur-xl text-white rounded-full border border-indigo-400/50 hover:bg-indigo-500 transition-all shadow-lg"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatArea;