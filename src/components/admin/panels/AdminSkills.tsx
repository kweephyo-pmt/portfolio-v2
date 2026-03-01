import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { useToast } from '../../ui/Toast';
import type { Skill } from '../../../types';

const SkillForm = ({
    skill, onSave, onCancel, isNew,
}: { skill: Partial<Skill>; onSave: (s: Skill) => void; onCancel: () => void; isNew: boolean }) => {
    const [form, setForm] = useState({ name: '', icon: '', ...skill });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...form, id: (form as any).id || `skill-${Date.now()}` } as Skill);
    };

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-[#111113] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto overflow-x-hidden text-gray-100 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
            >
                {/* Decorative glowing orb */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{isNew ? 'Add Technology' : 'Edit Technology'}</h2>
                        <p className="text-sm text-gray-400">Configure tech stack details</p>
                    </div>
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all self-start flex-shrink-0">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Tech Name</label>
                        <input
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            placeholder="e.g. React, Next.js, Node"
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between ml-1">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Icon URL</label>
                            <a href="https://devicon.dev/" target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:text-blue-300 transition-colors uppercase font-bold tracking-wider">Browse DevIcons</a>
                        </div>
                        <input
                            type="url"
                            required
                            value={form.icon}
                            onChange={e => setForm({ ...form, icon: e.target.value })}
                            placeholder="https://cdn.jsdelivr.net/gh/devicons/..."
                            className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-white font-mono text-sm"
                        />
                        {/* Icon Preview */}
                        {form.icon && (
                            <div className="mt-4 p-4 border border-white/5 bg-black/40 rounded-xl flex items-center justify-center">
                                <img key={form.icon} src={form.icon} alt="Preview" className={`w-12 h-12 object-contain ${form.name?.toLowerCase().includes('next') ? 'invert opacity-80' : ''}`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 mt-4 border-t border-white/5 pt-6 sticky bottom-0 bg-[#111113]/90 backdrop-blur-md py-4 -mx-2 px-2 -mb-2">
                        <button type="button" onClick={onCancel} className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-black bg-white hover:bg-gray-200 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5">
                            <Save size={18} />
                            {isNew ? 'Add Tech' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>,
        document.body
    );
};

export const AdminSkills = () => {
    const { skills, addSkill, updateSkill, deleteSkill, configLoaded } = usePortfolioStore();
    const { showToast } = useToast();
    const [editing, setEditing] = useState<Skill | null>(null);
    const [addingNew, setAddingNew] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const handleSave = (skill: Skill) => {
        if (addingNew) {
            addSkill(skill);
            showToast('success', `"${skill.name}" added!`);
            setAddingNew(false);
        } else {
            updateSkill(skill.id, skill);
            showToast('success', `"${skill.name}" updated!`);
            setEditing(null);
        }
    };

    if (!configLoaded) {
        return (
            <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <div className="space-y-2"><div className="h-7 w-28 bg-white/10 rounded-lg" /><div className="h-4 w-40 bg-white/5 rounded" /></div>
                    <div className="h-10 w-28 bg-white/10 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto text-gray-100 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 relative">
                {/* Decorative underline */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Tech Stack</h1>
                    <p className="text-sm text-gray-400 font-medium">{skills.length} scrolling technologies</p>
                </div>
                <button
                    onClick={() => setAddingNew(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black bg-white hover:bg-gray-200 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] shrink-0 hover:-translate-y-0.5"
                >
                    <Plus size={18} /> New Tech
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
                {skills.map(skill => (
                    <motion.div
                        key={skill.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-2xl flex items-center justify-between p-4 group transition-colors duration-300 relative"
                    >
                        <div className="flex items-center gap-4 min-w-0 flex-1 pr-4">
                            <div className="w-12 h-12 shrink-0 bg-black/40 border border-white/5 rounded-[12px] flex items-center justify-center p-2.5 group-hover:bg-white/5 transition-colors">
                                <img src={skill.icon} alt={skill.name} className={`w-full h-full object-contain ${skill.name?.toLowerCase().includes('next') ? 'invert opacity-80' : ''}`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            </div>
                            <h3 className="font-bold text-gray-200 text-lg truncate group-hover:text-white transition-colors">{skill.name}</h3>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            <button onClick={() => setEditing(skill)} className="p-2 sm:p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Edit">
                                <Pencil size={16} />
                            </button>
                            {confirmDelete === skill.id ? (
                                <div className="flex items-center gap-2 bg-red-500/10 px-3 h-9 rounded-lg border border-red-500/20 ml-1">
                                    <button onClick={() => { deleteSkill(skill.id); showToast('success', 'Tech deleted.'); setConfirmDelete(null); }} className="text-xs font-bold text-red-400 hover:text-red-300">Del</button>
                                    <div className="w-px h-3 bg-red-500/30"></div>
                                    <button onClick={() => setConfirmDelete(null)} className="text-xs font-semibold text-gray-400 hover:text-gray-300">Cancel</button>
                                </div>
                            ) : (
                                <button onClick={() => setConfirmDelete(skill.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 rounded-lg transition-all" title="Delete">
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}

                {skills.length === 0 && (
                    <div className="col-span-1 border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col items-center justify-center p-12 text-center text-gray-400">
                        <Plus size={32} className="mb-4 text-gray-600" />
                        <h3 className="text-lg font-bold text-white mb-2">No technologies yet</h3>
                        <p className="text-sm max-w-[300px]">Add technologies and frameworks you use to showcase your expertise.</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {addingNew && <SkillForm key="new" skill={{}} isNew onSave={handleSave} onCancel={() => setAddingNew(false)} />}
                {editing && <SkillForm key={editing.id} skill={editing} isNew={false} onSave={handleSave} onCancel={() => setEditing(null)} />}
            </AnimatePresence>
        </div>
    );
};
