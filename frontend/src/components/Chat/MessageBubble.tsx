import React from 'react';
import { motion } from 'framer-motion';
import { Copy, User, Brain } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  onCopy: (content: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onCopy }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start space-x-3 ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`p-2 rounded-full ${
        message.isUser 
          ? 'bg-gradient-to-br from-indigo-500 to-violet-600' 
          : 'bg-gradient-to-br from-cyan-500 to-teal-600'
      }`}>
        {message.isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Brain className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${message.isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative group backdrop-blur-xl border rounded-2xl p-4 ${
            message.isUser
              ? 'bg-gradient-to-br from-indigo-500/20 to-violet-600/20 border-indigo-400/30 ml-auto'
              : 'bg-white/10 border-white/20'
          }`}
        >
          {/* Copy Button */}
          <motion.button
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onCopy(message.content)}
            className="absolute top-2 right-2 p-1.5 bg-white/10 text-white/60 rounded-lg border border-white/20 hover:bg-white/20 hover:text-white/80 transition-all opacity-0 group-hover:opacity-100"
          >
            <Copy className="w-3 h-3" />
          </motion.button>

          {/* Message Text */}
          <div className="text-white/90 text-sm leading-relaxed pr-8">
            {message.isUser ? (
              message.content
            ) : (
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  code: ({ children }) => (
                    <code className="bg-black/30 px-2 py-1 rounded text-cyan-300">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-black/40 p-3 rounded-lg mt-2 mb-2 overflow-x-auto">
                      {children}
                    </pre>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Timestamp */}
          <div className={`text-xs text-white/50 mt-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;