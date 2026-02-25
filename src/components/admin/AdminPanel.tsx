import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    LayoutDashboard, FolderOpen, Settings,
    LogOut, Menu, X, Eye, ShieldAlert, Layers, Award
} from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useToast } from '../ui/Toast';

// Sub-panels
import { AdminDashboard } from './panels/AdminDashboard';
import { AdminProjects } from './panels/AdminProjects';
import { AdminSkills } from './panels/AdminSkills';

import { AdminSettings } from './panels/AdminSettings';
import { AdminCertificates } from './panels/AdminCertificates';

const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Tech Stack', icon: Layers },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export const AdminPanel = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activePanel = searchParams.get('tab') || 'dashboard';

    const setActivePanel = (tab: string) => {
        setSearchParams({ tab });
    };

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { logoutAdmin, siteConfig } = usePortfolioStore();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAdmin();
        showToast('info', 'Logged out successfully.');
        navigate('/', { replace: true });
    };

    const renderPanel = () => {
        switch (activePanel) {
            case 'dashboard': return <AdminDashboard onNavigate={setActivePanel} />;
            case 'projects': return <AdminProjects />;
            case 'skills': return <AdminSkills />;

            case 'certificates': return <AdminCertificates />;
            case 'settings': return <AdminSettings />;
            default: return <AdminDashboard onNavigate={setActivePanel} />;
        }
    };

    const activeItem = NAV_ITEMS.find((n) => n.id === activePanel);

    return (
        <div className="flex min-h-screen bg-[#09090b] font-sans text-gray-100 z-50 relative">
            {/* Sidebar */}
            <motion.aside
                animate={{ width: sidebarOpen ? '260px' : '72px' }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-hidden bg-[#18181b] outline outline-1 outline-white/5 shadow-2xl"
            >
                {/* Sidebar Header */}
                <div className="flex items-center gap-3 p-4 h-[70px] border-b border-white/10 shrink-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
                        <ShieldAlert size={20} />
                    </div>
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 overflow-hidden"
                            >
                                <div className="font-bold text-sm leading-tight truncate">Admin Block</div>
                                <div className="text-xs text-gray-400 truncate">{siteConfig.name}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="ml-auto p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                    >
                        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-6 flex flex-col gap-1 overflow-y-auto">
                    {NAV_ITEMS.map((item) => {
                        const isActive = activePanel === item.id;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActivePanel(item.id)}
                                title={!sidebarOpen ? item.label : undefined}
                                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 w-full text-left font-medium text-sm whitespace-nowrap overflow-hidden
                                    ${isActive
                                        ? 'bg-blue-500/20 text-blue-400 font-semibold'
                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={20} className="shrink-0" />
                                <AnimatePresence>
                                    {sidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-3 border-t border-white/10 flex flex-col gap-1">
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={!sidebarOpen ? 'View Portfolio' : undefined}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 text-gray-400 hover:text-white hover:bg-white/5 font-medium text-sm whitespace-nowrap overflow-hidden"
                    >
                        <Eye size={20} className="shrink-0" />
                        <AnimatePresence>
                            {sidebarOpen && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                    View Live Site
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </a>
                    <button
                        onClick={handleLogout}
                        title={!sidebarOpen ? 'Logout' : undefined}
                        className="flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-200 text-red-400 hover:bg-red-500/10 hover:text-red-300 font-medium text-sm whitespace-nowrap overflow-hidden w-full text-left"
                    >
                        <LogOut size={20} className="shrink-0" />
                        <AnimatePresence>
                            {sidebarOpen && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                    Sign Out
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main
                className="flex-1 flex flex-col min-w-0 transition-all duration-300 min-h-screen"
                style={{ marginLeft: sidebarOpen ? '260px' : '72px' }}
            >
                {/* Top Bar */}
                <header className="h-[70px] shrink-0 border-b border-white/5 bg-[#18181b] flex items-center px-8 gap-3 sticky top-0 z-40 shadow-sm">
                    <h2 className="font-bold text-lg text-white">
                        {activeItem?.label}
                    </h2>
                </header>

                {/* Panel Content */}
                <div className="flex-1 p-8 overflow-x-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePanel}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                        >
                            {renderPanel()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
