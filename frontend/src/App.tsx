import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import SplineBackground from './components/Background/SplineBackground';
import Header from './components/Header/Header';
import ChatArea from './components/Chat/ChatArea';
import ChatInput from './components/Input/ChatInput';
import ToastContainer from './components/Toast/ToastContainer';
import { useChat } from './hooks/useChat';
import { useToast } from './hooks/useToast';

function App() {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const { toasts, addToast, removeToast } = useToast();

  const handleCopy = useCallback(async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      addToast('Message copied to clipboard!', 'success');
    } catch (err) {
      addToast('Failed to copy message', 'error');
    }
  }, [addToast]);

  const handleSettings = useCallback(() => {
    addToast('Settings panel coming soon!', 'info');
  }, [addToast]);

  const handleClearChat = useCallback(() => {
    clearChat();
    addToast('Chat history cleared', 'success');
  }, [clearChat, addToast]);

  return (
    <div className="app-container min-h-screen relative overflow-hidden">
      {/* Spline Background */}
      <SplineBackground />
      
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Header */}
        <Header 
          onSettingsClick={handleSettings}
          onClearChat={handleClearChat}
        />
        
        {/* Chat Container */}
        <div className="flex-1 flex flex-col mx-4 mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 backdrop-blur-sm bg-white/3 border border-white/10 rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Chat Area */}
            <ChatArea 
              messages={messages}
              isLoading={isLoading}
              onCopy={handleCopy}
            />
            
            {/* Input Area */}
            <ChatInput 
              onSendMessage={sendMessage}
              isLoading={isLoading}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer 
        toasts={toasts}
        onRemove={removeToast}
      />

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default App;