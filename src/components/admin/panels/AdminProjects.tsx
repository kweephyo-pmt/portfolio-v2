import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Reorder, useDragControls } from 'framer-motion';
import { Plus, Pencil, Trash2, ExternalLink, Star, X, Save, GripVertical } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { useToast } from '../../ui/Toast';
import { ImageUpload } from '../../ui/ImageUpload';
import type { Project } from '../../../types';

const EMPTY_PROJECT: Omit<Project, 'id'> = {
    title: '',
    tech: '',
    technologies: [],
    desc: '',
    url: '',
    githubUrl: '',
    category: 'web',
    year: new Date().getFullYear().toString(),
    image: '',
    features: [],
    featured: false,
    order: 999,
};

const ProjectForm = ({
    project,
    onSave,
    onCancel,
    isNew,
}: {
    project: Partial<Project>;
    onSave: (p: Project) => void;
    onCancel: () => void;
    isNew: boolean;
}) => {
    const [form, setForm] = useState<any>({
        ...EMPTY_PROJECT,
        ...project,
        technologiesStr: (project.technologies || []).join(', '),
        featuresStr: (project.features || []).join('\n'),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const saved: Project = {
            ...form,
            id: form.id || `project-${Date.now()}`,
            technologies: form.technologiesStr.split(',').map((t: string) => t.trim()).filter(Boolean),
            features: form.featuresStr.split('\n').map((f: string) => f.trim()).filter(Boolean),
        };
        onSave(saved);
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                className="bg-[#18181b] border border-white/10 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-gray-100 shadow-2xl"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        {isNew ? 'Add New Project' : 'Edit Project'}
                    </h2>
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Title *</label>
                            <input className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="My Awesome Project" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Category *</label>
                            <select className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                <option value="web">Web</option>
                                <option value="mobile">Mobile</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Year</label>
                            <input className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} placeholder="2025" />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tech Summary (shown as subtitle)</label>
                            <input className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors" value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} placeholder="React, TypeScript, Firebase" />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description *</label>
                            <textarea className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors min-h-[100px]" required value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Describe your project..." />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Technologies (comma separated)</label>
                            <input className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors" value={form.technologiesStr} onChange={e => setForm({ ...form, technologiesStr: e.target.value })} placeholder="React, TypeScript, Supabase" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live URL</label>
                            <input className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors" type="url" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} placeholder="https://myproject.vercel.app" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">GitHub URL</label>
                            <input className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-white transition-colors" type="url" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/user/repo" />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Image *</label>
                            <ImageUpload
                                value={form.image}
                                onChange={(url) => setForm({ ...form, image: url })}
                                uploadPreset="projects"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Features (one per line)</label>
                            <textarea className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors min-h-[120px]" value={form.featuresStr} onChange={e => setForm({ ...form, featuresStr: e.target.value })} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
                        </div>
                        <div className="col-span-1 md:col-span-2 flex items-center gap-3 pt-2">
                            <input
                                id="featured-toggle"
                                type="checkbox"
                                checked={form.featured}
                                onChange={e => setForm({ ...form, featured: e.target.checked })}
                                className="w-5 h-5 rounded border-white/20 bg-[#09090b] text-white focus:ring-white focus:ring-offset-gray-900"
                            />
                            <label htmlFor="featured-toggle" className="text-sm font-medium text-gray-300 cursor-pointer select-none">
                                Mark as Featured Project
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4 border-t border-white/10 pt-6">
                        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-black bg-white hover:bg-gray-200 rounded-lg transition-colors shadow-lg">
                            <Save size={16} />
                            {isNew ? 'Save Project' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>,
        document.body
    );
};


const ProjectItemAdmin = ({
    project,
    onEdit,
    onDelete,
    confirmDelete,
    setConfirmDelete,
    onDragEnd
}: {
    project: Project;
    onEdit: (p: Project) => void;
    onDelete: (id: string) => void;
    confirmDelete: string | null;
    setConfirmDelete: (id: string | null) => void;
    onDragEnd: () => void;
}) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={project}
            id={project.id}
            dragListener={false}
            dragControls={controls}
            onDragEnd={onDragEnd}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
            whileDrag={{ scale: 1.02, zIndex: 50, cursor: "grabbing" }}
            className="group flex flex-col sm:flex-row sm:items-center gap-4 bg-[#18181b] border border-white/5 hover:border-white/10 rounded-xl p-4 transition-all relative z-0 select-none"
        >
            {/* Drag Handle */}
            <div
                className="hidden sm:flex items-center justify-center p-2 text-gray-500 hover:text-white cursor-grab active:cursor-grabbing transition-colors shrink-0"
                onPointerDown={(e) => controls.start(e)}
                style={{ touchAction: "none" }}
            >
                <GripVertical size={20} />
            </div>

            {/* Image */}
            <div className="w-full sm:w-20 h-32 sm:h-14 rounded-lg overflow-hidden shrink-0 bg-[#09090b] border border-white/5">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-base truncate">{project.title}</h3>
                    {project.featured && <Star size={14} className="text-amber-500 fill-amber-500 drop-shadow-md" />}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 font-medium text-gray-400 capitalize border border-white/5">{project.category}</span>
                    <span>{project.year}</span>
                    <span className="text-gray-600">•</span>
                    <span className="truncate max-w-[200px] lg:max-w-sm">{project.technologies.slice(0, 3).join(', ')}{project.technologies.length > 3 ? '...' : ''}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:shrink-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-none mt-2 sm:mt-0">
                {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Visit Live Site">
                        <ExternalLink size={16} />
                    </a>
                )}
                <button onClick={() => onEdit(project)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Edit">
                    <Pencil size={16} />
                </button>
                {confirmDelete === project.id ? (
                    <div className="flex items-center gap-2 bg-red-500/10 px-2 py-1 rounded-lg border border-red-500/20">
                        <button onClick={() => onDelete(project.id)} className="text-xs font-semibold text-red-400 hover:text-red-300 px-2">Delete</button>
                        <div className="w-px h-3 bg-red-500/30"></div>
                        <button onClick={() => setConfirmDelete(null)} className="text-xs font-semibold text-gray-400 hover:text-gray-300 px-2">Cancel</button>
                    </div>
                ) : (
                    <button onClick={() => setConfirmDelete(project.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete">
                        <Trash2 size={16} />
                    </button>
                )}
            </div>
        </Reorder.Item>
    );
};

export const AdminProjects = () => {
    const { projects, addProject, updateProject, deleteProject, reorderProjects, projectsLoaded } = usePortfolioStore();
    const { showToast } = useToast();
    const [editing, setEditing] = useState<Project | null>(null);
    const [addingNew, setAddingNew] = useState(false);
    const [filterCat, setFilterCat] = useState('all');
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const filtered = filterCat === 'all' ? projects : projects.filter(p => p.category === filterCat);
    const sorted = [...filtered].sort((a, b) => (a.order || 99) - (b.order || 99));

    const [localProjects, setLocalProjects] = useState(sorted);

    // Sync local order when global changes
    useEffect(() => {
        setLocalProjects([...filtered].sort((a, b) => (a.order || 99) - (b.order || 99)));
    }, [projects, filterCat]);

    const handleDragEnd = async () => {
        const hasChanged = localProjects.some((p, i) => p.id !== sorted[i]?.id);
        if (hasChanged) {
            const updated = localProjects.map((p, index) => ({ ...p, order: index + 1 }));
            await reorderProjects(updated);
            showToast('success', 'Order updated');
        }
    };

    const handleSave = (project: Project) => {
        if (addingNew) {
            addProject(project);
            showToast('success', `"${project.title}" added successfully!`);
            setAddingNew(false);
        } else {
            updateProject(project.id, project);
            showToast('success', `"${project.title}" updated!`);
            setEditing(null);
        }
    };

    const handleDelete = (id: string) => {
        const p = projects.find(x => x.id === id);
        deleteProject(id);
        showToast('success', `"${p?.title}" deleted.`);
        setConfirmDelete(null);
    };

    if (!projectsLoaded) {
        return (
            <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <div className="space-y-2"><div className="h-7 w-28 bg-white/10 rounded-lg" /><div className="h-4 w-48 bg-white/5 rounded" /></div>
                    <div className="h-10 w-32 bg-white/10 rounded-lg" />
                </div>
                <div className="flex gap-2">{[1, 2, 3].map(i => <div key={i} className="h-7 w-16 bg-white/5 rounded-full" />)}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-white/5 rounded-2xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto text-gray-100 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Projects</h1>
                    <p className="text-sm text-gray-400">{projects.length} total projects in your portfolio</p>
                </div>
                <button
                    onClick={() => setAddingNew(true)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-black bg-white hover:bg-gray-200 rounded-lg transition-colors shadow-md shrink-0"
                >
                    <Plus size={18} /> New Project
                </button>
            </div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2">
                {['all', 'web', 'mobile'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilterCat(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize border transition-colors ${filterCat === cat
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20 hover:text-gray-300'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Project List */}
            <div className="flex flex-col gap-3">
                <Reorder.Group axis="y" values={localProjects} onReorder={setLocalProjects} className="flex flex-col gap-3 pb-8">
                    <AnimatePresence>
                        {localProjects.map((project) => (
                            <ProjectItemAdmin
                                key={project.id}
                                project={project}
                                onEdit={setEditing}
                                onDelete={handleDelete}
                                confirmDelete={confirmDelete}
                                setConfirmDelete={setConfirmDelete}
                                onDragEnd={handleDragEnd}
                            />
                        ))}
                    </AnimatePresence>
                </Reorder.Group>

                {sorted.length === 0 && (
                    <div className="py-16 text-center text-gray-500 border border-dashed border-white/10 rounded-xl bg-[#18181b]">
                        <p className="text-sm">No projects found in this category.</p>
                    </div>
                )}
            </div>

            {/* Forms */}
            <AnimatePresence>
                {addingNew && (
                    <ProjectForm
                        key="new"
                        project={{}}
                        isNew
                        onSave={handleSave}
                        onCancel={() => setAddingNew(false)}
                    />
                )}
                {editing && (
                    <ProjectForm
                        key={editing.id}
                        project={editing}
                        isNew={false}
                        onSave={handleSave}
                        onCancel={() => setEditing(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
