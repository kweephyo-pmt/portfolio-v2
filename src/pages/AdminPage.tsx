import { usePortfolioStore } from '../store/portfolioStore';
import { AdminLogin } from '../components/admin/AdminLogin';
import { AdminPanel } from '../components/admin/AdminPanel';
import { motion } from 'framer-motion';

export const AdminPage = () => {
    const { isAdminLoggedIn, authInitialized } = usePortfolioStore();

    if (!authInitialized) {
        return (
            <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 border-4 border-white/10 border-t-blue-500 rounded-full"
                />
            </div>
        );
    }

    return isAdminLoggedIn ? <AdminPanel /> : <AdminLogin />;
};
