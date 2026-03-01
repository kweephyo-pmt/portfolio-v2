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
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] text-gray-300 hover:text-white transition-all mb-12 text-sm font-bold w-fit group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
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
                                <span className="px-4 py-1.5 text-xs font-bold bg-white/[0.04] border border-white/10 rounded-full capitalize text-white tracking-widest uppercase">
                                    {project.category}
                                </span>
                                {project.year && (
                                    <span className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold bg-white/[0.04] rounded-full text-gray-300 border border-white/10">
                                        <Calendar size={14} /> {project.year}
                                    </span>
                                )}
                                {project.featured && (
                                    <span className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-black bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.15)] uppercase tracking-wider">
                                        <Star size={14} fill="currentColor" /> Featured
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display, system-ui)' }}>
                                {project.title}
                            </h1>

                            <p className="text-base md:text-lg text-gray-400 max-w-3xl leading-relaxed">
                                {project.desc}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                {project.url && (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 transform outline-none"
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
                                        className="flex items-center gap-2 px-6 py-3 bg-white/[0.04] text-white font-semibold rounded-xl hover:bg-white/[0.08] transition-colors border border-white/10 hover:-translate-y-0.5 transform outline-none"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Github size={18} /> View Source
                                    </a>
                                )}
                            </div>
                        </header>

                        {/* Media Showcase */}
                        <div className="w-full rounded-3xl overflow-hidden bg-black/40 border border-white/10 relative shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col">
                            {/* Mac OS Window Header */}
                            <div className="flex items-center gap-2 px-6 py-4 bg-white/[0.02] border-b border-white/5 w-full shrink-0 relative z-20 backdrop-blur-md">
                                <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-[0_0_10px_rgba(248,113,113,0.3)]"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-[0_0_10px_rgba(251,191,36,0.3)]"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400/80 shadow-[0_0_10px_rgba(52,211,153,0.3)]"></div>
                                <div className="absolute left-1/2 -translate-x-1/2 text-xs font-bold text-gray-500 flex items-center gap-2">
                                    {project.videoUrl ? 'demo_video.mp4' : 'project_preview.png'}
                                </div>
                            </div>

                            <div className="relative flex-1 w-full bg-[#09090b]">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                                {project.videoUrl ? (
                                    project.videoUrl.includes('youtube.com') || project.videoUrl.includes('youtu.be') ? (
                                        <div className="aspect-video w-full relative z-10">
                                            <iframe
                                                src={
                                                    project.videoUrl.includes('watch?v=')
                                                        ? project.videoUrl.replace('watch?v=', 'embed/').split('&')[0]
                                                        : project.videoUrl.includes('youtu.be/')
                                                            ? project.videoUrl.replace('youtu.be/', 'youtube.com/embed/')
                                                            : project.videoUrl
                                                }
                                                className="w-full h-full block"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : (
                                        <video
                                            src={project.videoUrl}
                                            controls
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            className="w-full h-auto block relative z-10 filter drop-shadow-2xl"
                                        />
                                    )
                                ) : (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-auto block relative z-10 filter drop-shadow-2xl"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://via.placeholder.com/1200x600/12121e/58a6ff?text=${encodeURIComponent(project.title)}`;
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Technologies & Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Left Column: Tech Stack & Features */}
                            <div className="md:col-span-2 space-y-12">
                                {/* Tech Stack */}
                                <div className="space-y-6">
                                    <h2 className="text-xl font-bold border-b border-white/5 pb-4 flex items-center gap-3 text-white">
                                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                                            <FolderOpen size={18} className="text-blue-400" />
                                        </div>
                                        Technologies Used
                                    </h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-4 py-2 bg-white/[0.02] border border-white/5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.05] hover:border-white/10 transition-colors shadow-sm cursor-default"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                {project.features && project.features.length > 0 && (
                                    <div className="space-y-6">
                                        <h2 className="text-xl font-bold border-b border-white/5 pb-4 flex items-center gap-3 text-white">
                                            <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                                                <Star size={18} className="text-emerald-400" />
                                            </div>
                                            Key Features
                                        </h2>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {project.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-gray-300 bg-white/[0.02] p-5 rounded-2xl border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 group">
                                                    <div className="mt-0.5 flex items-center justify-center p-1.5 border border-white/10 bg-white/[0.05] rounded-full shrink-0 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-colors">
                                                        <Check size={12} className="text-white group-hover:text-blue-400 transition-colors" />
                                                    </div>
                                                    <span className="leading-relaxed font-medium text-sm group-hover:text-white transition-colors">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Info Sidebar */}
                            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 h-fit space-y-8 backdrop-blur-md relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none" />

                                <div className="relative z-10">
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Status</p>
                                    <p className="text-sm font-semibold text-emerald-400 flex items-center gap-3">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                        </span>
                                        {project.status || 'Completed / Live'}
                                    </p>
                                </div>
                                <div className="relative z-10">
                                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Role</p>
                                    <p className="text-sm font-semibold text-white">{project.role || 'Lead Developer'}</p>
                                </div>
                                <div className="pt-6 border-t border-white/5 relative z-10">
                                    <p className="text-sm text-gray-400 font-medium leading-relaxed">
                                        Designed and developed entirely by <strong className="text-white">{siteConfig.name || 'Phyo Min Thein'}</strong>.
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
