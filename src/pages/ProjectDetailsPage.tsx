import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Calendar, FolderOpen, Star, Check } from 'lucide-react';
import { usePortfolioStore } from '../store/portfolioStore';
import { Footer } from '../components/layout/Footer';
import { useEffect, useState } from 'react';

export const ProjectDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { projects, projectsLoaded, siteConfig } = usePortfolioStore();
    const [project, setProject] = useState(projects.find(p => p.id === id));

    useEffect(() => {
        if (projectsLoaded) {
            const found = projects.find(p => p.id === id);
            if (found) {
                setProject(found);
            } else {
                navigate('/');
            }
        }
    }, [id, projects, projectsLoaded, navigate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!projectsLoaded || !project) {
        return (
            <div className="min-h-screen bg-[#000000] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-t-white border-white/20 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-[#000000] text-gray-200" style={{ fontFamily: 'var(--font-body, system-ui)' }}>

            <main className="flex-1 pt-12 pb-16">
                <div className="container max-w-5xl mx-auto px-6">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate('/#projects')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm font-medium w-fit group"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Portfolio
                    </button>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-12"
                    >
                        {/* Header Section */}
                        <header className="space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="px-3 py-1 text-xs font-semibold bg-white/10 rounded-full capitalize text-white tracking-wide">
                                    {project.category}
                                </span>
                                {project.year && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-white/5 rounded-full text-gray-300 border border-white/5">
                                        <Calendar size={12} /> {project.year}
                                    </span>
                                )}
                                {project.featured && (
                                    <span className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                                        <Star size={12} fill="currentColor" /> Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'var(--font-display, system-ui)' }}>
                                {project.title}
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink size={18} /> Visit Project
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github size={18} /> View Source
                                    </a>
                                )}
                            </div>
                        </header>

                        {/* Image Showcase */}
                        <div className="w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative shadow-2xl">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-auto block"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/1200x600/12121e/58a6ff?text=${encodeURIComponent(project.title)}`;
                                }}
                            />
                        </div>

                        {/* Technologies & Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Left Column: Tech Stack & Features */}
                            <div className="md:col-span-2 space-y-12">
                                {/* Tech Stack */}
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold border-b border-white/10 pb-4 flex items-center gap-2 text-white">
                                        <FolderOpen size={20} className="text-gray-400" />
                                        Technologies Used
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                {project.features && project.features.length > 0 && (
                                    <div className="space-y-6">
                                        <h2 className="text-2xl font-bold border-b border-white/10 pb-4 flex items-center gap-2 text-white">
                                            <Star size={20} className="text-gray-400" />
                                            Key Features
                                        </h2>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-gray-300 bg-gradient-to-br from-white/5 to-transparent p-5 rounded-2xl border border-white/5 hover:border-[#00d8ff]/30 hover:shadow-[0_4px_20px_rgba(0,216,255,0.05)] transition-all group">
                                                    <div className="mt-0.5 flex items-center justify-center p-1.5 bg-[#00d8ff]/10 rounded-full shrink-0 group-hover:bg-[#00d8ff]/20 transition-colors">
                                                        <Check size={14} className="text-[#00d8ff]" />
                                                    </div>
                                                    <span className="leading-relaxed font-medium text-[0.95rem] group-hover:text-white transition-colors">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Info Sidebar */}
                            <div className="bg-[#09090b] border border-white/5 rounded-2xl p-6 h-fit space-y-6">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</p>
                                    <p className="text-sm font-medium text-emerald-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        {project.status || 'Completed / Live'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Role</p>
                                    <p className="text-sm font-medium text-white">{project.role || 'Lead Developer'}</p>
                                </div>
                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Designed and developed entirely by {siteConfig.name || 'Phyo Min Thein'}.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
