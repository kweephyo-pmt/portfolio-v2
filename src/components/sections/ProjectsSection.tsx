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
            className="group h-full bg-white/[0.02] hover:bg-white/[0.04] rounded-3xl overflow-hidden cursor-pointer flex flex-col transition-all duration-500 border border-white/5 hover:border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:-translate-y-2 relative"
        >
            {/* Image Container */}
            <div className="relative h-[220px] overflow-hidden bg-black/40 rounded-t-3xl border-b border-white/5" style={{ isolation: 'isolate', WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}>
                {/* Inset shadow 'mask' to hide sub-pixel leaks */}
                <div className="absolute inset-0 z-20 rounded-t-3xl pointer-events-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]" />

                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
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
                            <div className="relative bg-black/60 border border-amber-500/40 text-amber-500 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(245,158,11,0.15)]">
                                <Star size={14} fill="currentColor" className="drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[1.1rem] font-bold mb-2 leading-tight group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[2.1rem] text-white">
                    {project.title}
                </h3>
                <p className="text-[0.85rem] text-gray-400 font-medium leading-relaxed mb-5 line-clamp-2">
                    {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap items-center content-start gap-1.5 mb-5 min-h-[2.5rem]">
                    {project.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-lg text-[0.7rem] font-bold border border-white/5 bg-white/[0.03] text-gray-300">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="text-[0.7rem] font-bold text-gray-400 ml-1">
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
                        className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-gray-200 transition-colors relative z-20 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        <ExternalLink size={14} />
                        Live Demo
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl text-xs font-bold bg-white/[0.04] text-gray-300 border border-white/10 hover:bg-white/[0.08] hover:text-white transition-colors relative z-20"
                    >
                        <Github size={14} />
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
                <div className="text-center mb-12 relative z-10">
                    <h2 className="text-[2.5rem] md:text-[3rem] font-black text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        Portfolio <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Showcase</span>
                    </h2>
                    <p className="text-gray-400 font-medium max-w-2xl mx-auto text-sm md:text-base">
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
                                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl z-0 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
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
                                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-xl z-0 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
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
                                                ? 'text-white border-white/20 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] scale-105'
                                                : 'text-gray-500 hover:text-white bg-white/[0.02] border-white/5 hover:border-white/10'
                                                }`}
                                        >
                                            {isActive && <div className="absolute inset-0 bg-white/5 z-0" />}
                                            <span className="relative z-10">{cat}</span>
                                            <span className={`relative z-10 flex items-center justify-center min-w-[20px] h-[20px] text-[10px] font-black rounded-full px-1 transition-all duration-300 ${isActive ? 'bg-white text-black' : 'bg-black/40 text-gray-400 group-hover:bg-white/20 group-hover:text-white'
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
                                    id="projects-grid"
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
                                            onClick={() => {
                                                if (showAllProjects) {
                                                    const grid = document.getElementById('projects-grid');
                                                    if (grid) {
                                                        const y = grid.getBoundingClientRect().top + window.scrollY - 100;
                                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                                    }
                                                }
                                                setShowAllProjects(!showAllProjects);
                                            }}
                                            className="flex items-center gap-2 px-6 py-3 bg-white/[0.04] border border-white/10 rounded-full text-sm font-bold text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all outline-none"
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
