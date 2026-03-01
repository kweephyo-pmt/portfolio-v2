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
            iconColor: '#38bdf8', iconBg: 'rgba(56,189,248,0.1)'
        },
        {
            label: 'Technologies', value: skills.length, sub: 'in your stack',
            icon: Layers, panel: 'skills',
            iconColor: '#a78bfa', iconBg: 'rgba(167,139,250,0.1)'
        },
        {
            label: 'Certificates', value: certificates.length, sub: 'earned',
            icon: Award, panel: 'certificates',
            iconColor: '#34d399', iconBg: 'rgba(52,211,153,0.1)'
        },
    ];

    const recentProjects = [...projects]
        .sort((a, b) => (a.order || 99) - (b.order || 99))
        .slice(0, 5);

    const quickActions = [
        { label: 'Add Project', icon: Plus, panel: 'projects' },
        { label: 'Manage Tech Stack', icon: Layers, panel: 'skills' },
        { label: 'Add Certificate', icon: Award, panel: 'certificates' },
        { label: 'Site Settings', icon: Settings, panel: 'settings' },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 text-white">

            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-3xl overflow-hidden p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Portfolio Live</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
                        Good {getTimeOfDay()},{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                            {firstName}
                        </span>
                    </h1>
                    <p className="text-sm text-gray-300 font-medium md:text-base">
                        Your portfolio has <strong className="text-white">{projects.length} projects</strong> and <strong className="text-white">{skills.length} technologies</strong> active.
                    </p>
                </div>

                <div className="relative z-10 flex gap-3 shrink-0">
                    <button
                        onClick={() => onNavigate('projects')}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5"
                    >
                        <Plus size={16} /> New Project
                    </button>
                    <a
                        href="/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-300 transition-all hover:text-white bg-white/[0.04] border border-white/10 hover:bg-white/[0.08]"
                    >
                        <ArrowUpRight size={16} /> View Site
                    </a>
                </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <motion.button
                        key={stat.label}
                        custom={i}
                        variants={CARD_VARIANTS}
                        initial="hidden"
                        animate="show"
                        onClick={() => onNavigate(stat.panel)}
                        className={`text-left rounded-3xl p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-colors duration-300 group`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                                style={{ background: stat.iconBg }}>
                                <stat.icon size={20} style={{ color: stat.iconColor }} />
                            </div>
                            <ArrowUpRight size={16} className="text-gray-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                        <div className="text-3xl font-bold tracking-tight mb-1 text-white">{stat.value}</div>
                        <div className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{stat.label}</div>
                        <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
                    </motion.button>
                ))}
            </div>

            {/* Bottom grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">

                {/* Recent Projects */}
                <motion.div
                    custom={3} variants={CARD_VARIANTS} initial="hidden" animate="show"
                    className="lg:col-span-2 rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="flex items-center justify-between mb-6 relative z-10">
                        <div>
                            <h3 className="text-lg font-bold text-white">Recent Projects</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Your top portfolio items</p>
                        </div>
                        <button
                            onClick={() => onNavigate('projects')}
                            className="text-sm font-bold px-4 py-2 rounded-xl transition-colors text-blue-400 hover:text-white hover:bg-white/5 bg-blue-500/10"
                        >
                            View all
                        </button>
                    </div>

                    {recentProjects.length > 0 ? (
                        <div className="space-y-3 relative z-10">
                            {recentProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.06 }}
                                    className="flex items-center gap-4 p-3 pr-4 rounded-2xl transition-all duration-300 group cursor-pointer bg-white/[0.01] hover:bg-white/[0.04] border border-transparent hover:border-white/10"
                                    onClick={() => onNavigate('projects')}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 bg-black/40 border border-white/5">
                                        <img src={project.image} alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{project.title}</span>
                                            {project.featured && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                                        </div>
                                        <p className="text-xs text-gray-400 truncate mt-0.5">{project.tech || project.technologies?.slice(0, 3).join(', ')}</p>
                                    </div>
                                    <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg capitalize shrink-0 bg-white/5 text-gray-300 border border-white/5 group-hover:border-white/10 transition-colors">
                                        {project.category}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-14 text-center rounded-2xl bg-white/[0.02] border border-dashed border-white/10 mt-4 relative z-10">
                            <FolderOpen size={32} className="mx-auto mb-3 text-gray-600" />
                            <p className="text-base font-bold text-white">No projects yet</p>
                            <button onClick={() => onNavigate('projects')} className="mt-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                                Add your first project →
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    custom={4} variants={CARD_VARIANTS} initial="hidden" animate="show"
                    className="rounded-3xl p-6 sm:p-8 bg-white/[0.02] border border-white/5 flex flex-col"
                >
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-white">Quick Actions</h3>
                        <p className="text-xs text-gray-400 mt-0.5">Common tasks</p>
                    </div>
                    <div className="flex flex-col gap-3 flex-1">
                        {quickActions.map((action, i) => (
                            <motion.button
                                key={action.label}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.07 }}
                                onClick={() => onNavigate(action.panel)}
                                className="flex items-center gap-4 w-full p-4 rounded-2xl text-sm font-bold text-left transition-all duration-300 group bg-black/20 hover:bg-white/[0.04] border border-white/5 hover:border-white/10"
                                whileHover={{ x: 2 }}
                            >
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-white/5 group-hover:bg-blue-500/10 transition-colors">
                                    <action.icon size={16} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                                </div>
                                <span className="text-gray-300 group-hover:text-white transition-colors">{action.label}</span>
                                <ArrowUpRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 text-gray-500 transition-all transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </motion.button>
                        ))}
                    </div>

                    {/* Portfolio health */}
                    <div className="mt-6 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-bold text-gray-400 flex items-center gap-2">
                                <TrendingUp size={14} /> Portfolio Health
                            </span>
                            <span className="text-sm font-black text-emerald-400">
                                {Math.min(100, Math.round((projects.length / 5) * 40 + (skills.length / 10) * 30 + (certificates.length / 3) * 30))}%
                            </span>
                        </div>
                        <div className="h-2 rounded-full overflow-hidden bg-black/40 border border-white/5">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(100, Math.round((projects.length / 5) * 40 + (skills.length / 10) * 30 + (certificates.length / 3) * 30))}%` }}
                                transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400"
                            />
                        </div>
                        <p className="text-xs text-gray-500 font-medium mt-3">Based on projects, skills & certificates</p>
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
