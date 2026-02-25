import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight, Settings, Plus, Layers, Award } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';

interface Props { onNavigate: (panel: string) => void; }

export const AdminDashboard = ({ onNavigate }: Props) => {
    const { projects, skills, siteConfig, certificates, configLoaded, projectsLoaded } = usePortfolioStore();

    if (!configLoaded || !projectsLoaded) {
        return (
            <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
                <div className="border-b border-white/10 pb-6 space-y-2">
                    <div className="h-9 w-64 bg-white/10 rounded-xl" />
                    <div className="h-4 w-80 bg-white/5 rounded" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-64 bg-white/5 rounded-2xl" />
                    <div className="h-64 bg-white/5 rounded-2xl" />
                </div>
            </div>
        );
    }

    const stats = [
        { label: 'Total Projects', value: projects.length, icon: FolderOpen, color: 'text-blue-400', panel: 'projects', desc: 'Total portfolio projects' },
        { label: 'Tech Stack', value: skills.length, icon: Layers, color: 'text-indigo-400', panel: 'skills', desc: 'Technologies listed' },
        { label: 'Certificates', value: certificates.length, icon: Award, color: 'text-emerald-400', panel: 'certificates', desc: 'Earned certifications' },
    ];

    const recentProjects = [...projects].sort((a, b) => (a.order || 99) - (b.order || 99)).slice(0, 4);

    return (
        <div className="max-w-6xl mx-auto space-y-8 text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{siteConfig.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-gray-400 text-sm">Here's what's happening with your portfolio today.</p>
                </div>
                <button
                    onClick={() => onNavigate('projects')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg"
                >
                    <Plus size={18} /> New Project
                </button>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => onNavigate(stat.panel)}
                        className="bg-[#18181b] border border-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 group shadow-sm"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-all duration-300 text-gray-300">
                                <stat.icon size={22} />
                            </div>
                            <ArrowRight size={18} className="text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </div>
                        <h3 className="text-3xl font-bold mb-1 tracking-tight">{stat.value}</h3>
                        <p className="text-sm font-semibold text-gray-300">{stat.label}</p>
                        <p className="text-xs text-gray-500 mt-2">{stat.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Projects */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-[#18181b] border border-white/5 rounded-2xl p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold">Recent Projects</h3>
                        <button onClick={() => onNavigate('projects')} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">View All</button>
                    </div>
                    {recentProjects.length > 0 ? (
                        <div className="space-y-3">
                            {recentProjects.map((project) => (
                                <div key={project.id} className="flex items-center gap-4 bg-white/5 border border-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors">
                                    <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover bg-black/50" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">{project.title}</h4>
                                        <p className="text-xs text-gray-400 truncate">{project.desc}</p>
                                    </div>
                                    <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium capitalize text-gray-300 border border-white/5">
                                        {project.category}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">
                            <FolderOpen size={32} className="mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No projects added yet.</p>
                        </div>
                    )}
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-[#18181b] border border-white/5 rounded-2xl p-6"
                >
                    <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
                    <div className="flex flex-col gap-3">
                        <button onClick={() => onNavigate('projects')} className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all text-sm font-semibold text-left">
                            <FolderOpen size={18} className="text-blue-400" /> Manage Projects
                        </button>
                        <button onClick={() => onNavigate('skills')} className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all text-sm font-semibold text-left">
                            <Layers size={18} className="text-purple-400" /> Update Tech Stack
                        </button>
                        <button onClick={() => onNavigate('certificates')} className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all text-sm font-semibold text-left">
                            <Award size={18} className="text-amber-400" /> Manage Certificates
                        </button>
                        <button onClick={() => onNavigate('settings')} className="flex items-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-all text-sm font-semibold text-left">
                            <Settings size={18} className="text-gray-400" /> Site Settings
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
