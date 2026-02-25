import { motion } from 'framer-motion';
import { FolderOpen, ArrowUpRight, Settings, Plus, Layers, Award, Star, TrendingUp } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';

interface Props { onNavigate: (panel: string) => void; }

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 16 },
    show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const } }),
};

export const AdminDashboard = ({ onNavigate }: Props) => {
    const { projects, skills, siteConfig, certificates, configLoaded, projectsLoaded } = usePortfolioStore();

    if (!configLoaded || !projectsLoaded) {
        return (
            <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
                <div className="h-36 rounded-2xl bg-white/5" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => <div key={i} className="h-28 rounded-xl bg-white/5" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 h-72 rounded-2xl bg-white/5" />
                    <div className="h-72 rounded-2xl bg-white/5" />
                </div>
            </div>
        );
    }

    const featuredCount = projects.filter(p => p.featured).length;
    const firstName = siteConfig.tagline || siteConfig.name?.split(' ')[0] || 'Admin';

    const stats = [
        {
            label: 'Projects', value: projects.length, sub: `${featuredCount} featured`,
            icon: FolderOpen, panel: 'projects',
            gradient: 'from-gray-500/10 to-gray-500/0',
            iconBg: 'rgba(255,255,255,0.05)', iconColor: '#e2e8f0',
            border: 'rgba(255,255,255,0.08)',
        },
        {
            label: 'Technologies', value: skills.length, sub: 'in your stack',
            icon: Layers, panel: 'skills',
            gradient: 'from-gray-500/10 to-gray-500/0',
            iconBg: 'rgba(255,255,255,0.05)', iconColor: '#e2e8f0',
            border: 'rgba(255,255,255,0.08)',
        },
        {
            label: 'Certificates', value: certificates.length, sub: 'earned',
            icon: Award, panel: 'certificates',
            gradient: 'from-gray-500/10 to-gray-500/0',
            iconBg: 'rgba(255,255,255,0.05)', iconColor: '#e2e8f0',
            border: 'rgba(255,255,255,0.08)',
        },
    ];

    const recentProjects = [...projects]
        .sort((a, b) => (a.order || 99) - (b.order || 99))
        .slice(0, 5);

    const quickActions = [
        { label: 'Add Project', icon: Plus, panel: 'projects', color: '#e2e8f0', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
        { label: 'Manage Tech Stack', icon: Layers, panel: 'skills', color: '#e2e8f0', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
        { label: 'Add Certificate', icon: Award, panel: 'certificates', color: '#e2e8f0', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
        { label: 'Site Settings', icon: Settings, panel: 'settings', color: '#e2e8f0', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.1)' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 text-white">

            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                }}
            >
                {/* Background glow */}
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', transform: 'translate(-30%, -40%)' }} />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Portfolio Live</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                        Good {getTimeOfDay()},{' '}
                        <span className="text-white">
                            {firstName}
                        </span>
                    </h1>
                    <p className="text-gray-300">
                        Your portfolio has <strong className="text-white">{projects.length} projects</strong> and <strong className="text-white">{skills.length} technologies</strong> listed.
                    </p>
                </div>

                <div className="relative z-10 flex gap-3 shrink-0">
                    <button
                        onClick={() => onNavigate('projects')}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-black transition-all"
                        style={{ background: '#ffffff', boxShadow: '0 4px 20px rgba(255,255,255,0.1)' }}
                    >
                        <Plus size={15} /> New Project
                    </button>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 transition-all hover:text-white"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <ArrowUpRight size={15} /> View Site
                    </a>
                </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                    <motion.button
                        key={stat.label}
                        custom={i}
                        variants={CARD_VARIANTS}
                        initial="hidden"
                        animate="show"
                        onClick={() => onNavigate(stat.panel)}
                        className={`text-left rounded-xl p-5 bg-gradient-to-br ${stat.gradient} transition-all duration-200 group`}
                        style={{ border: `1px solid ${stat.border}` }}
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                                style={{ background: stat.iconBg }}>
                                <stat.icon size={16} style={{ color: stat.iconColor }} />
                            </div>
                            <ArrowUpRight size={14} className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>
                        <div className="text-3xl font-black tracking-tight mb-1">{stat.value}</div>
                        <div className="text-base font-semibold text-gray-100">{stat.label}</div>
                        <div className="text-sm text-gray-400 mt-1">{stat.sub}</div>
                    </motion.button>
                ))}
            </div>

            {/* Bottom grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Projects */}
                <motion.div
                    custom={3} variants={CARD_VARIANTS} initial="hidden" animate="show"
                    className="lg:col-span-2 rounded-2xl p-6"
                    style={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-base font-bold text-white">Recent Projects</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Your top portfolio items</p>
                        </div>
                        <button
                            onClick={() => onNavigate('projects')}
                            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10"
                        >
                            View all →
                        </button>
                    </div>

                    {recentProjects.length > 0 ? (
                        <div className="space-y-2">
                            {recentProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.06 }}
                                    className="flex items-center gap-3 p-3 rounded-xl transition-colors group cursor-default"
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
                                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'}
                                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
                                >
                                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white/5">
                                        <img src={project.image} alt={project.title}
                                            className="w-full h-full object-cover"
                                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-semibold text-white truncate">{project.title}</span>
                                            {project.featured && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                                        </div>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">{project.tech || project.technologies?.slice(0, 3).join(', ')}</p>
                                    </div>
                                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full capitalize shrink-0"
                                        style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
                                        {project.category}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-14 text-center rounded-xl" style={{ border: '1px dashed rgba(255,255,255,0.08)' }}>
                            <FolderOpen size={28} className="mx-auto mb-2 text-gray-700" />
                            <p className="text-sm text-gray-600">No projects yet.</p>
                            <button onClick={() => onNavigate('projects')} className="mt-3 text-xs text-indigo-400 hover:text-indigo-300">
                                Add your first project →
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    custom={4} variants={CARD_VARIANTS} initial="hidden" animate="show"
                    className="rounded-2xl p-6"
                    style={{ background: '#09090b', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                    <div className="mb-5">
                        <h3 className="text-base font-bold text-white">Quick Actions</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Common tasks</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        {quickActions.map((action, i) => (
                            <motion.button
                                key={action.label}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.07 }}
                                onClick={() => onNavigate(action.panel)}
                                className="flex items-center gap-3 w-full p-4 rounded-xl text-sm font-semibold text-left transition-all group"
                                style={{ background: action.bg, border: `1px solid ${action.border}` }}
                                whileHover={{ x: 2 }}
                            >
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: action.bg }}>
                                    <action.icon size={14} style={{ color: action.color }} />
                                </div>
                                <span style={{ color: action.color }}>{action.label}</span>
                                <ArrowUpRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: action.color }} />
                            </motion.button>
                        ))}
                    </div>

                    {/* Portfolio health */}
                    <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                                <TrendingUp size={12} /> Portfolio Health
                            </span>
                            <span className="text-xs font-bold text-emerald-400">
                                {Math.min(100, Math.round((projects.length / 5) * 40 + (skills.length / 10) * 30 + (certificates.length / 3) * 30))}%
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, Math.round((projects.length / 5) * 40 + (skills.length / 10) * 30 + (certificates.length / 3) * 30))}%` }}
                                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                                className="h-full rounded-full"
                                style={{ background: 'linear-gradient(90deg, #6366f1, #34d399)' }}
                            />
                        </div>
                        <p className="text-[10px] text-gray-700 mt-2">Based on projects, skills & certificates</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

function getTimeOfDay(): string {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 18) return 'afternoon';
    return 'evening';
}
