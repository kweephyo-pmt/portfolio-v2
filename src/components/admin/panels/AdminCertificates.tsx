import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, GripVertical, ExternalLink, Maximize } from 'lucide-react';
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

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="bg-[#111113] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto overflow-x-hidden text-gray-100 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
            >
                {/* Decorative glowing orb */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="flex justify-between items-center mb-8 relative z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">{isNew ? 'Add Certificate' : 'Edit Certificate'}</h2>
                        <p className="text-sm text-gray-400">Configure certificate details</p>
                    </div>
                    <button onClick={onCancel} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all self-start flex-shrink-0">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Course/Certificate Title *</label>
                        <input className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-white" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="AWS Certified Solutions Architect" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Issuer *</label>
                            <input className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-white" required value={form.issuer} onChange={e => setForm({ ...form, issuer: e.target.value })} placeholder="Amazon Web Services" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Date/Year *</label>
                            <input className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-white" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="Oct 2024" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Certificate Image *</label>
                        <ImageUpload
                            value={form.imageUrl}
                            onChange={(url) => setForm({ ...form, imageUrl: url })}
                            uploadPreset="certificates"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Description</label>
                        <textarea className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-white min-h-[80px]" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Verification Link (Optional)</label>
                        <input type="url" className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.04] transition-all duration-300 text-white" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="flex justify-end gap-3 mt-4 border-t border-white/5 pt-6 sticky bottom-0 bg-[#111113]/90 backdrop-blur-md py-4 -mx-2 px-2 -mb-2">
                        <button type="button" onClick={onCancel} className="px-6 py-2.5 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                            Cancel
                        </button>
                        <button type="submit" className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-black bg-white hover:bg-gray-200 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-0.5">
                            <Save size={18} />
                            {isNew ? 'Add Certificate' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>,
        document.body
    );
};

export const AdminCertificates = () => {
    const { certificates, addCertificate, updateCertificate, deleteCertificate, reorderCertificates, configLoaded } = usePortfolioStore();
    const { showToast } = useToast();
    const [editing, setEditing] = useState<Certificate | null>(null);
    const [addingNew, setAddingNew] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
    const [viewImage, setViewImage] = useState<string | null>(null);

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
            <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
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
        <div className="max-w-6xl mx-auto text-gray-100 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 relative">
                {/* Decorative underline */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Certificates</h1>
                    <p className="text-sm text-gray-400 font-medium">{certificates.length} certifications and achievements</p>
                </div>
                <button
                    onClick={() => setAddingNew(true)}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-black bg-white hover:bg-gray-200 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] shrink-0 hover:-translate-y-0.5"
                >
                    <Plus size={18} /> New Certificate
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 pb-8">
                <AnimatePresence>
                    {sortedCerts.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden group transition-colors duration-300 flex flex-col sm:flex-row relative z-0"
                        >
                            <div
                                className="w-full sm:w-56 h-48 shrink-0 bg-black/40 border-b sm:border-b-0 sm:border-r border-white/5 relative overflow-hidden flex items-center justify-center p-4 group/img cursor-pointer"
                                onClick={() => setViewImage(cert.imageUrl)}
                            >
                                <img src={cert.imageUrl} alt={cert.title} className="w-full h-full object-contain group-hover/img:scale-105 transition-transform duration-500" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'; }} />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <div className="bg-black/60 p-2.5 rounded-xl text-white backdrop-blur-sm border border-white/10 shadow-lg">
                                        <Maximize size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col min-w-0">
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <h3 className="font-bold text-lg text-white truncate group-hover:text-blue-400 transition-colors" title={cert.title}>{cert.title}</h3>
                                </div>
                                <p className="text-sm text-gray-400 mb-1 truncate font-medium">{cert.issuer}</p>
                                <p className="text-xs text-gray-500 mb-auto font-medium">{cert.date}</p>

                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/5">
                                        <button onClick={() => moveCert(index, -1)} disabled={index === 0} className="p-1 text-gray-500 hover:text-white disabled:opacity-30 hover:bg-white/5 rounded transition-colors"><GripVertical size={16} className="rotate-90" /></button>
                                        <button onClick={() => moveCert(index, 1)} disabled={index === sortedCerts.length - 1} className="p-1 text-gray-500 hover:text-white disabled:opacity-30 hover:bg-white/5 rounded transition-colors"><GripVertical size={16} className="rotate-90" /></button>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        {cert.link && (
                                            <a href={cert.link} target="_blank" rel="noreferrer" className="p-2 sm:p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Verify Certificate">
                                                <ExternalLink size={16} />
                                            </a>
                                        )}
                                        <button onClick={() => setEditing(cert)} className="p-2 sm:p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Edit">
                                            <Pencil size={16} />
                                        </button>
                                        {confirmDelete === cert.id ? (
                                            <div className="flex items-center gap-2 bg-red-500/10 px-3 h-9 rounded-lg border border-red-500/20 ml-1">
                                                <button onClick={() => { deleteCertificate(cert.id); showToast('success', 'Deleted'); setConfirmDelete(null); }} className="text-xs font-bold text-red-400 hover:text-red-300">Del</button>
                                                <div className="w-px h-3 bg-red-500/30"></div>
                                                <button onClick={() => setConfirmDelete(null)} className="text-xs font-semibold text-gray-400 hover:text-gray-300">Cancel</button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setConfirmDelete(cert.id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 rounded-lg transition-all" title="Delete">
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
                    <div className="col-span-full border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col items-center justify-center p-16 text-center text-gray-400">
                        <Plus size={40} className="mb-4 text-gray-600" />
                        <h3 className="text-xl font-bold text-white mb-2">No certificates yet</h3>
                        <p className="text-sm max-w-[300px]">Add your professional certifications and course achievements.</p>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {addingNew && <CertForm key="new" cert={{}} isNew onSave={handleSave} onCancel={() => setAddingNew(false)} />}
                {editing && <CertForm key={editing.id} cert={editing} isNew={false} onSave={handleSave} onCancel={() => setEditing(null)} />}
            </AnimatePresence>

            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {viewImage && (
                        <motion.div
                            key="fullscreen-image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                            onClick={() => setViewImage(null)}
                        >
                            <button
                                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setViewImage(null); }}
                                title="Close"
                            >
                                <X size={24} />
                            </button>
                            <img
                                src={viewImage}
                                alt="Full screen preview"
                                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] cursor-default"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};
