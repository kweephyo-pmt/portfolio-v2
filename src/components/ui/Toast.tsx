import React, { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ToastMessage } from '../../types';

// ─── Toast Context ────────────────────────────────────────────────────────────
interface ToastContextType {
    showToast: (type: ToastMessage['type'], message: string) => void;
}

export const ToastContext = React.createContext<ToastContextType>({
    showToast: () => { },
});

export const useToast = () => React.useContext(ToastContext);

// ─── Toast Provider ───────────────────────────────────────────────────────────
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = (type: ToastMessage['type'], message: string) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, type, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const icons = {
        success: <CheckCircle size={20} className="text-green-400 shrink-0" />,
        error: <XCircle size={20} className="text-red-400 shrink-0" />,
        warning: <AlertCircle size={20} className="text-yellow-400 shrink-0" />,
        info: <Info size={20} className="text-blue-400 shrink-0" />,
    };

    const borderColors = {
        success: 'border-green-500/20 bg-[#18181b]/90',
        error: 'border-red-500/20 bg-[#18181b]/90',
        warning: 'border-yellow-500/20 bg-[#18181b]/90',
        info: 'border-blue-500/20 bg-[#18181b]/90',
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-[9999] flex flex-col gap-3 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: 24, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            layout
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 min-w-[280px] max-w-sm border rounded-2xl shadow-2xl backdrop-blur-xl ${borderColors[toast.type] || borderColors.info}`}
                        >
                            {icons[toast.type]}
                            <span className="flex-1 text-sm font-semibold text-gray-100">{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-white/10 ml-2 shrink-0"
                            >
                                <X size={16} />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
