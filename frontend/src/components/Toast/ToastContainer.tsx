import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Toast } from '../../types';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  const getToastIcon = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getToastColors = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-400/30';
      case 'error':
        return 'bg-red-500/20 border-red-400/30';
      default:
        return 'bg-blue-500/20 border-blue-400/30';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`backdrop-blur-xl border rounded-xl p-4 min-w-[300px] max-w-md ${getToastColors(toast.type)}`}
          >
            <div className="flex items-start space-x-3">
              {getToastIcon(toast.type)}
              <div className="flex-1">
                <p className="text-white text-sm">{toast.message}</p>
              </div>
              <button
                onClick={() => onRemove(toast.id)}
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;