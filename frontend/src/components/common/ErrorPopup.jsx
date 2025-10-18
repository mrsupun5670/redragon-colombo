import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, AlertTriangle } from 'lucide-react';

const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-5 right-5 z-50"
      >
        <div className="bg-red-500 text-white rounded-xl shadow-2xl shadow-red-500/30 border-2 border-red-600 overflow-hidden">
          <div className="flex items-center gap-4 p-4">
            <AlertTriangle className="w-8 h-8 flex-shrink-0" />
            <div className="flex-grow">
              <h3 className="font-black text-lg">Error</h3>
              <p className="text-sm">{message}</p>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
              <XCircle className="w-6 h-6" />
            </button>
          </div>
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: 0 }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-1 bg-red-300"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ErrorPopup;
