import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    LayoutDashboard, FolderOpen, Settings,
    LogOut, Menu, Eye,
    Layers, Award, ExternalLink
} from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useToast } from '../ui/Toast';

import { AdminDashboard } from './panels/AdminDashboard';
import { AdminProjects } from './panels/AdminProjects';
import { AdminSkills } from './panels/AdminSkills';
import { AdminSettings } from './panels/AdminSettings';
import { AdminCertificates } from './panels/AdminCertificates';

const NAV_GROUPS = [
    {
        label: 'Overview',
        items: [
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ],
    },
    {
        label: 'Content',
        items: [
            { id: 'projects', label: 'Projects', icon: FolderOpen },
            { id: 'skills', label: 'Tech Stack', icon: Layers },
            { id: 'certificates', label: 'Certificates', icon: Award },
        ],
    },
    {
        label: 'System',
        items: [
            { id: 'settings', label: 'Settings', icon: Settings },
        ],
    },
];

const ALL_NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items);

export const AdminPanel = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activePanel = searchParams.get('tab') || 'dashboard';
    const setActivePanel = (tab: string) => setSearchParams({ tab });

    const [collapsed, setCollapsed] = useState(false);
    const { logoutAdmin, siteConfig } = usePortfolioStore();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutAdmin();
        showToast('info', 'Logged out successfully.');
        navigate('/admin', { replace: true });
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

    const activeItem = ALL_NAV_ITEMS.find(n => n.id === activePanel);
    const SIDEBAR_W = collapsed ? 80 : 240;

    const initials = siteConfig.name
        ? siteConfig.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
        : 'AD';

    return (
        <div className="flex min-h-screen text-gray-100" style={{ background: '#000000', fontFamily: 'var(--font-body, system-ui)' }}>

            {/* ── Sidebar ── */}
            <motion.aside
                animate={{ width: SIDEBAR_W }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-hidden"
                style={{
                    background: '#09090b',
                    borderRight: '1px solid rgba(255,255,255,0.05)',
                    boxShadow: '4px 0 24px rgba(0,0,0,0.5)',
                }}
            >
                {/* Header (Hamburger stays fixed in 80px space) */}
                <div className="flex items-center shrink-0 h-14" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="w-[80px] shrink-0 flex items-center justify-center">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                        >
                            <Menu size={18} />
                        </button>
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="font-bold text-gray-200 whitespace-nowrap overflow-hidden text-sm tracking-wide"
                            >
                                Admin Panel
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
                    {NAV_GROUPS.map(group => (
                        <div key={group.label} className="mb-4">
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="px-4 mb-1.5"
                                    >
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                            {group.label}
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            {group.items.map(item => {
                                const isActive = activePanel === item.id;
                                const Icon = item.icon;
                                return (
                                    <div key={item.id} className="px-3 mb-0.5">
                                        <button
                                            onClick={() => setActivePanel(item.id)}
                                            title={collapsed ? item.label : undefined}
                                            className={`flex items-center w-full rounded-lg transition-all duration-150 relative text-sm font-medium
                                                ${collapsed ? 'justify-center px-0 py-3' : 'gap-3 px-3 py-2.5'}`}
                                            style={{
                                                color: isActive ? '#ffffff' : '#9ca3af',
                                                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                fontWeight: isActive ? 600 : 400,
                                            }}
                                            onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#f3f4f6'; } }}
                                            onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#9ca3af'; } }}
                                        >
                                            {isActive && !collapsed && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                                                    style={{ background: '#ffffff' }} />
                                            )}
                                            <Icon size={collapsed ? 20 : 17} className="shrink-0" />
                                            <AnimatePresence>
                                                {!collapsed && (
                                                    <motion.span
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                                                        className="whitespace-nowrap"
                                                    >
                                                        {item.label}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="shrink-0 p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {/* View site */}
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={collapsed ? 'View Site' : undefined}
                        className={`flex items-center w-full rounded-lg py-2.5 text-sm transition-colors mb-1 ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'}`}
                        style={{ color: '#9ca3af' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = '#f3f4f6'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#9ca3af'; }}
                    >
                        <ExternalLink size={collapsed ? 20 : 16} className="shrink-0" />
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="whitespace-nowrap text-sm font-medium">
                                    View Site
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </a>

                    {/* User / sign out */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 10, marginTop: 4 }}>
                        <div
                            className={`flex items-center w-full rounded-lg py-2 ${collapsed ? 'justify-center px-0' : 'gap-3 px-3'}`}
                        >
                            <div
                                title={collapsed ? 'Admin' : undefined}
                                className="rounded-full shrink-0 flex items-center justify-center font-bold text-white relative overflow-hidden group"
                                style={{
                                    width: collapsed ? 34 : 28,
                                    height: collapsed ? 34 : 28,
                                    fontSize: collapsed ? 13 : 11,
                                    background: '#ffffff',
                                    color: '#000000'
                                }}
                            >
                                {siteConfig.profileImage ? (
                                    <img src={siteConfig.profileImage} alt={siteConfig.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                ) : (
                                    initials
                                )}
                                {/* When collapsed, you can logout by clicking the overlay on the initials */}
                                {collapsed && (
                                    <button
                                        onClick={handleLogout}
                                        title="Sign Out"
                                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                    >
                                        <LogOut size={14} className="text-white -ml-0.5" />
                                    </button>
                                )}
                            </div>
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0 text-left">
                                        <div className="text-sm font-semibold text-gray-300 truncate">{siteConfig.name || 'Admin'}</div>
                                        <div className="text-xs text-gray-500">Administrator</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.button
                                        onClick={handleLogout}
                                        title="Sign Out"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="p-2 -mr-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors shrink-0"
                                    >
                                        <LogOut size={15} />
                                    </motion.button>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* ── Main ── */}
            <motion.main
                animate={{ marginLeft: SIDEBAR_W }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 flex flex-col min-w-0 min-h-screen"
            >
                {/* Topbar */}
                <header
                    className="h-14 shrink-0 flex items-center justify-between px-6 sticky top-0 z-40"
                    style={{
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(12px)',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                >
                    {/* Left: breadcrumb */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm pl-2">
                            <span className="text-gray-600">Admin</span>
                            <span className="text-gray-700">/</span>
                            <span className="text-gray-200 font-medium">{activeItem?.label}</span>
                        </div>
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                            style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', color: '#34d399' }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live
                        </div>
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-400 hover:text-white transition-colors"
                            style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <Eye size={13} />
                            Preview
                        </a>
                    </div>
                </header>

                {/* Content */}
                <div className="flex-1 p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePanel}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderPanel()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.main>
        </div>
    );
};
