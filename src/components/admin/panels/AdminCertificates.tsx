import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, GripVertical, ExternalLink } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { useToast } from '../../ui/Toast';
import { ImageUpload } from '../../ui/ImageUpload';
import type { Certificate } from '../../../types';

const CertForm = ({
    cert, onSave, onCancel, isNew,
}: { cert: Partial<Certificate>; onSave: (c: Certificate) => void; onCancel: () => void; isNew: boolean }) => {
    const [form, setForm] = useState({ title: '', issuer: '', date: '', imageUrl: '', description: '', link: '', order: 0, ...cert });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...form, id: (form as any).id || `cert-${Date.now()}` } as Certificate);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <div className="bg-[#18181b] border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto text-gray-100 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">{isNew ? 'Add Certificate' : 'Edit Certificate'}</h2>
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Course/Certificate Title *</label>
                        <input className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="AWS Certified Solutions Architect" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Issuer *</label>
                        <input className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" required value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} placeholder="Amazon Web Services" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Date/Year *</label>
                        <input className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Oct 2024" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Certificate Image *</label>
                        <ImageUpload
                            value={form.imageUrl}
                            onChange={(url) => setForm({ ...form, imageUrl: url })}
                            uploadPreset="certificates"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Description</label>
                        <textarea className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors min-h-[80px]" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description..." />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verification Link (Optional)</label>
                        <input type="url" className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="flex justify-end gap-3 mt-4 border-t border-white/10 pt-6">
                        <button type="button" onClick={onCancel} className="px-5 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">Cancel</button>
                        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-lg shadow-blue-500/20"><Save size={16} />{isNew ? 'Add Certificate' : 'Save Changes'}</button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export const AdminCertificates = () => {
    const { certificates, addCertificate, updateCertificate, deleteCertificate, reorderCertificates, configLoaded } = usePortfolioStore();
    const { showToast } = useToast();
    const [editing, setEditing] = useState<Certificate | null>(null);
    const [addingNew, setAddingNew] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const handleSave = (c: Certificate) => {
        if (addingNew) {
            c.order = certificates.length + 1;
            addCertificate(c);
            showToast('success', 'Certificate added!');
            setAddingNew(false);
        } else {
            updateCertificate(c.id, c);
            showToast('success', 'Certificate updated!');
            setEditing(null);
        }
    };

    const sortedCerts = [...certificates].sort((a, b) => (a.order || 0) - (b.order || 0));

    const moveCert = async (index: number, direction: -1 | 1) => {
        if (index + direction < 0 || index + direction >= sortedCerts.length) return;
        const newCerts = [...sortedCerts];
        const temp = newCerts[index].order;
        newCerts[index].order = newCerts[index + direction].order;
        newCerts[index + direction].order = temp;
        await reorderCertificates(newCerts);
        showToast('success', 'Order updated');
    };

    if (!configLoaded) {
        return (
            <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                    <div className="space-y-2"><div className="h-7 w-36 bg-white/10 rounded-lg" /><div className="h-4 w-52 bg-white/5 rounded" /></div>
                    <div className="h-10 w-36 bg-white/10 rounded-lg" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-56 bg-white/5 rounded-2xl" />)}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto text-gray-100 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-1">Certificates</h1>
                    <p className="text-sm text-gray-400">Manage your certifications and achievements</p>
                </div>
                <button onClick={() => setAddingNew(true)} className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                    <Plus size={18} /> New Certificate
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                    {sortedCerts.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden group hover:border-white/10 transition-colors flex flex-col sm:flex-row"
                        >
                            <div className="w-full sm:w-40 h-40 shrink-0 bg-[#09090b] border-b sm:border-b-0 sm:border-r border-white/5 relative overflow-hidden flex items-center justify-center p-4">
                                <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }} />
                            </div>
                            <div className="p-5 flex-1 flex flex-col min-w-0">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <h3 className="font-bold text-base truncate" title={cert.title}>{cert.title}</h3>
                                </div>
                                <p className="text-sm text-blue-400 mb-1 truncate">{cert.issuer}</p>
                                <p className="text-xs text-gray-500 mb-auto">{cert.date}</p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-1 bg-[#09090b] rounded-lg p-1 border border-white/5">
                                        <button onClick={() => moveCert(index, -1)} disabled={index === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30 transition-colors"><GripVertical size={14} className="rotate-90" /></button>
                                        <button onClick={() => moveCert(index, 1)} disabled={index === sortedCerts.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30 transition-colors"><GripVertical size={14} className="rotate-90" /></button>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                        <button onClick={() => setEditing(cert)} className="p-2 text-gray-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors"><Pencil size={16} /></button>
                                        {confirmDelete === cert.id ? (
                                            <div className="flex items-center gap-2 bg-red-500/10 px-2 h-9 rounded-lg border border-red-500/20 ml-1">
                                                <button onClick={() => { deleteCertificate(cert.id); showToast('success', 'Deleted'); setConfirmDelete(null); }} className="text-xs font-semibold text-red-400 hover:text-red-300">Confirm Del</button>
                                                <div className="w-px h-3 bg-red-500/30"></div>
                                                <button onClick={() => setConfirmDelete(null)} className="text-xs font-semibold text-gray-400 hover:text-gray-300"><X size={14} /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setConfirmDelete(cert.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {sortedCerts.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-500 border border-dashed border-white/10 rounded-2xl bg-[#18181b]">
                        <p className="text-base font-medium">No certificates added yet.</p>
                        <p className="text-sm mt-1">Click the "New Certificate" button to get started.</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {addingNew && <CertForm key="new" cert={{}} isNew onSave={handleSave} onCancel={() => setAddingNew(false)} />}
                {editing && <CertForm key={editing.id} cert={editing} isNew={false} onSave={handleSave} onCancel={() => setEditing(null)} />}
            </AnimatePresence>
        </div>
    );
};
