import { useState } from 'react';
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

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <div className="bg-[#18181b] border border-white/10 rounded-2xl p-8 w-full max-w-sm max-h-[90vh] overflow-y-auto text-gray-100 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{isNew ? 'Add Tech' : 'Edit Tech'}</h2>
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tech Name *</label>
                        <input className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="React" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Icon URL *</label>
                        <input type="url" className="w-full bg-[#09090b] border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 transition-colors" required value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} placeholder="https://cdn.jsdelivr.net/gh/devicons/..." />
                        <p className="text-[10px] text-gray-500 mt-1">We recommend using DevIcon SVGs.</p>
                    </div>
                    <div className="flex justify-end gap-3 mt-4 border-t border-white/10 pt-6">
                        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg"><Save size={16} />{isNew ? 'Add' : 'Save'}</button>
                    </div>
                </form>
            </div>
        </motion.div>
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
            <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <div className="space-y-2"><div className="h-7 w-28 bg-white/10 rounded-lg" /><div className="h-4 w-40 bg-white/5 rounded" /></div>
                    <div className="h-10 w-28 bg-white/10 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => <div key={i} className="h-28 bg-white/5 rounded-2xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto text-gray-100 space-y-8">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Tech Stack</h1>
                    <p className="text-sm text-gray-400">{skills.length} scrolling technologies</p>
                </div>
                <button onClick={() => setAddingNew(true)} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md">
                    <Plus size={18} /> New Tech
                </button>
            </div>

            <div className="flex flex-wrap gap-4">
                {skills.map(skill => (
                    <motion.div
                        key={skill.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#18181b] border border-white/5 hover:border-white/10 rounded-xl p-4 flex items-center justify-between w-full sm:w-[calc(50%-0.5rem)] gap-4 group transition-colors"
                    >
                        <div className="flex items-center gap-4 min-w-0">
                            <div className="w-12 h-12 shrink-0 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center p-2">
                                <img src={skill.icon} alt={skill.name} className={`w-full h-full object-contain ${skill.name?.toLowerCase().includes('next') ? 'invert opacity-80' : ''}`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                            </div>
                            <span className="font-semibold text-sm truncate">{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                            <button onClick={() => setEditing(skill)} className="p-1.5 text-gray-500 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors"><Pencil size={14} /></button>
                            {confirmDelete === skill.id ? (
                                <div className="flex items-center gap-2 bg-red-500/10 px-2 h-8 rounded-lg border border-red-500/20 ml-1">
                                    <button onClick={() => { deleteSkill(skill.id); showToast('success', 'Tech deleted.'); setConfirmDelete(null); }} className="text-xs font-semibold text-red-400 hover:text-red-300">Del</button>
                                    <div className="w-px h-3 bg-red-500/30"></div>
                                    <button onClick={() => setConfirmDelete(null)} className="text-xs font-semibold text-gray-400 hover:text-gray-300">×</button>
                                </div>
                            ) : (
                                <button onClick={() => setConfirmDelete(skill.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    </motion.div>
                ))}

                {skills.length === 0 && (
                    <div className="w-full py-16 text-center text-gray-500 border border-dashed border-white/10 rounded-xl bg-[#18181b]">
                        <p className="text-sm">No technologies added yet.</p>
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
