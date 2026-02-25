import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import type { Project } from '../../types';
import { CertificatesSection } from './CertificatesSection';

const CATEGORIES = ['all', 'web', 'mobile'];

const ProjectCard = ({ project }: { project: Project }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            to={`/project/${project.id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`bg-[#09090b] rounded-2xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300 border ${hovered
                ? 'border-white/20 shadow-[0_8px_30px_rgba(255,255,255,0.04)] -translate-y-1'
                : 'border-white/5'
                }`}
        >
            {/* Image */}
            <div className="relative h-[220px] overflow-hidden bg-[#09090b] transform-gpu">
                <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://via.placeholder.com/800x400/12121e/58a6ff?text=${encodeURIComponent(project.title)}`;
                    }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-black/90" />

                {/* Category + Year Badge */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-md rounded-full capitalize text-white/90 border border-white/10 shadow-sm">
                        {project.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium bg-black/60 backdrop-blur-md rounded-full text-white/90 border border-white/10 shadow-sm">
                        {project.year}
                    </span>
                </div>

                {/* Featured Star */}
                {project.featured && (
                    <div className="absolute top-4 right-4">
                        <span className="bg-amber-500/20 border border-amber-500/30 text-amber-500 rounded-md px-2.5 py-1 text-[0.7rem] font-semibold flex items-center gap-1.5 backdrop-blur-sm">
                            <Star size={10} fill="currentColor" /> Featured
                        </span>
                    </div>
                )}

                {/* Hover overlay removed */}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-[1.05rem] font-bold mb-2 leading-tight">
                    {project.title}
                </h3>
                <p className="text-[0.85rem] text-[var(--color-text-muted)] leading-relaxed mb-5 line-clamp-2">
                    {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
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
                        className="btn btn-primary btn-sm flex-1 justify-center"
                    >
                        <ExternalLink size={13} />
                        Live Demo
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm flex-1 justify-center"
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
    const { projects, projectsLoaded } = usePortfolioStore();
    const [activeTab, setActiveTab] = useState<'projects' | 'certificates'>('projects');
    const [activeCategory, setActiveCategory] = useState('all');
    const [showAllProjects, setShowAllProjects] = useState(false);

    const filtered = activeCategory === 'all'
        ? projects
        : projects.filter((p: Project) => p.category === activeCategory);

    const sorted = [...filtered].sort((a, b) => (a.order || 99) - (b.order || 99));

    return (
        <section id="projects" className="section">
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
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                    {/* Main Tab Toggle */}
                    <div className="flex bg-[#18181b] p-1 rounded-xl border border-white/5">
                        <button
                            onClick={() => setActiveTab('projects')}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'projects'
                                ? 'bg-[#00d8ff]/10 text-[#00d8ff]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => setActiveTab('certificates')}
                            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'certificates'
                                ? 'bg-[#00d8ff]/10 text-[#00d8ff]'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            Certifications
                        </button>
                    </div>

                    {/* Category filters - only show on Projects tab */}
                    <AnimatePresence>
                        {activeTab === 'projects' && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                transition={{ duration: 0.2 }}
                                className="flex gap-2 flex-wrap justify-center sm:justify-end"
                            >
                                {CATEGORIES.map((cat) => {
                                    const count = cat === 'all' ? projects.length : projects.filter(p => p.category === cat).length;
                                    const isActive = activeCategory === cat;
                                    return (
                                        <button
                                            key={cat}
                                            onClick={() => { setActiveCategory(cat); setShowAllProjects(false); }}
                                            className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 capitalize overflow-hidden group ${isActive
                                                ? 'text-white shadow-[0_0_16px_rgba(0,216,255,0.2)]'
                                                : 'text-gray-400 hover:text-white bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10'
                                                }`}
                                        >
                                            {isActive && <div className="absolute inset-0 bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] z-0" />}
                                            <span className="relative z-10">{cat}</span>
                                            <span className={`relative z-10 flex items-center justify-center min-w-[18px] h-[18px] text-[10px] font-bold rounded-full px-1 transition-colors ${isActive ? 'bg-white text-[#8b5cf6]' : 'bg-black/40 text-gray-300 group-hover:bg-black/60'
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

                <AnimatePresence mode="wait">
                    {activeTab === 'projects' && (
                        <motion.div
                            key="projects-tab"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >

                            {/* Project Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                                {(showAllProjects ? sorted : sorted.slice(0, 6)).map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>

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
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CertificatesSection />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
