import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import type { Project } from '../../types';
import { CertificatesSection } from './CertificatesSection';


const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <Link
            to={`/project/${project.id}`}
            className="group h-full bg-[#09090b] rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-500 border border-white/5 hover:border-[#00d8ff]/30 hover:shadow-[0_20px_50px_rgba(0,216,255,0.1)] hover:-translate-y-2"
        >
            {/* Image Container */}
            <div className="relative h-[220px] overflow-hidden bg-black rounded-t-2xl" style={{ isolation: 'isolate', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                {/* Inset shadow 'mask' to hide sub-pixel leaks */}
                <div className="absolute inset-0 z-20 rounded-t-2xl pointer-events-none shadow-[inset_0_0_0_1px_#09090b]" />

                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 scale-[1.01] group-hover:scale-110"
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                    }}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x400/12121e/58a6ff?text=${encodeURIComponent(project.title)}`;
                    }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/90 z-10" />

                {/* Featured Star */}
                {project.featured && (
                    <div className="absolute top-4 right-4 z-20">
                        <div className="relative">
                            <div className="absolute inset-0 bg-amber-500/20 blur-[8px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="relative bg-[#09090b]/80 border border-amber-500/40 text-amber-500 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(245,158,11,0.15)]">
                                <Star size={14} fill="currentColor" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[1.05rem] font-bold mb-2 leading-tight group-hover:text-[#00d8ff] transition-colors line-clamp-2 min-h-[2.1rem]">
                    {project.title}
                </h3>
                <p className="text-[0.85rem] text-[var(--color-text-muted)] leading-relaxed mb-5 line-clamp-2">
                    {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5 min-h-[2.5rem]">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-0.5 rounded-md text-[0.7rem] font-medium bg-[rgba(88,166,255,0.08)] text-[var(--color-text-muted)] border border-[rgba(88,166,255,0.12)]">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2.5 py-0.5 rounded-md text-[0.7rem] text-[var(--color-accent)]">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto pt-2">
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-primary btn-sm flex-1 justify-center relative z-20"
                    >
                        <ExternalLink size={13} />
                        Live Demo
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-ghost btn-sm flex-1 justify-center relative z-20"
                    >
                        <Github size={13} />
                        GitHub
                    </a>
                </div>
            </div>
        </Link>
    );
};

export const ProjectsSection = () => {
    const { projects, projectsLoaded, siteConfig } = usePortfolioStore();
    const [activeTab, setActiveTab] = useState<'projects' | 'certificates'>('projects');

    // Dynamic categories from siteConfig + 'all'
    const CATEGORIES = ['all', ...(siteConfig.projectCategories || [])];
    const [activeCategory, setActiveCategory] = useState('all');
    const [showAllProjects, setShowAllProjects] = useState(false);

    const filtered = activeCategory === 'all'
        ? projects
        : projects.filter((p: Project) => p.category === activeCategory);

    const sorted = [...filtered].sort((a, b) => (a.order || 99) - (b.order || 99));

    return (
        <section id="projects" className="section overflow-x-hidden">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-[2.5rem] font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        Portfolio <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">Showcase</span>
                    </h2>
                    <p className="text-[var(--color-text-dim)] max-w-2xl mx-auto">
                        Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
                    </p>
                </div>

                {/* Unified Controls Bar */}
                <div className="flex flex-col items-center gap-8 mb-12">
                    {/* Main Tab Toggle */}
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-xl shadow-2xl relative">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`relative px-8 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300 overflow-hidden ${activeTab === 'projects'
                                ? 'text-white'
                                : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {activeTab === 'projects' && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] z-0 shadow-[0_0_20px_rgba(0,216,255,0.3)]"
                                />
                            )}
                            <span className="relative z-10">Projects</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('certificates')}
                            className={`relative px-8 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-colors duration-300 overflow-hidden ${activeTab === 'certificates'
                                ? 'text-white'
                                : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {activeTab === 'certificates' && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    className="absolute inset-0 bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] z-0 shadow-[0_0_20px_rgba(0,216,255,0.3)]"
                                />
                            )}
                            <span className="relative z-10">Certifications</span>
                        </button>
                    </div>

                    {/* Category filters - only show on Projects tab */}
                    <AnimatePresence>
                        {activeTab === 'projects' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="flex gap-3 flex-wrap justify-center"
                            >
                                {CATEGORIES.map((cat) => {
                                    const count = cat === 'all' ? projects.length : projects.filter(p => p.category === cat).length;
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => { setActiveCategory(cat); setShowAllProjects(false); }}
                                            className={`relative flex items-center gap-3 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 overflow-hidden group border ${isActive
                                                ? 'text-white border-transparent shadow-[0_0_20px_rgba(0,216,255,0.2)] scale-105'
                                                : 'text-gray-500 hover:text-white bg-white/5 border-white/5 hover:border-white/10'
                                                }`}
                                        >
                                            {isActive && <div className="absolute inset-0 bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] z-0" />}
                                            <span className="relative z-10">{cat}</span>
                                            <span className={`relative z-10 flex items-center justify-center min-w-[20px] h-[20px] text-[10px] font-black rounded-full px-1 transition-all duration-300 ${isActive ? 'bg-white text-[#00d8ff]' : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'
                                                }`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative min-h-[800px] overflow-hidden">
                    <AnimatePresence mode="wait" initial={false}>
                        {activeTab === 'projects' && (
                            <motion.div
                                key="projects-tab"
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            >

                                {/* Project Grid */}
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {(showAllProjects ? sorted : sorted.slice(0, 6)).map((project) => (
                                            <motion.div
                                                key={project.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: [0.23, 1, 0.32, 1]
                                                }}
                                            >
                                                <ProjectCard project={project} />
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {/* View More Button */}
                                {sorted.length > 6 && (
                                    <div className="mt-12 flex justify-center">
                                        <button
                                            onClick={() => setShowAllProjects(!showAllProjects)}
                                            className="flex items-center gap-2 px-6 py-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full text-sm font-semibold text-white/80 hover:text-white hover:border-[var(--color-border-hover)] hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2 focus:ring-offset-[#09090b]"
                                        >
                                            {showAllProjects ? 'View Less' : 'View More Projects'}
                                            {showAllProjects ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                        </button>
                                    </div>
                                )}

                                {(projectsLoaded && sorted.length === 0) && (
                                    <div className="text-center p-16 text-[var(--color-text-muted)]">
                                        <Code2 size={48} className="mx-auto mb-4 opacity-30" />
                                        <p>No projects in this category yet.</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'certificates' && (
                            <motion.div
                                key="certificates-tab"
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: -10 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            >
                                <CertificatesSection />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
