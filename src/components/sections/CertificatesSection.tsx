import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink, Maximize, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';

export const CertificatesSection = () => {
    const { certificates } = usePortfolioStore();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!certificates || certificates.length === 0) return null;

    const sortedCerts = [...certificates].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {sortedCerts.map((cert) => (
                    <div
                        key={cert.id}
                        className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-3xl overflow-hidden group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col h-full"
                    >
                        <div className="w-full h-56 bg-black/40 relative overflow-hidden flex items-center justify-center border-b border-white/5 p-4 group-hover:bg-black/60 transition-colors">
                            <img
                                src={cert.imageUrl}
                                alt={cert.title}
                                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 rounded-md"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Certificate+Image'; }}
                            />
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                                <button
                                    onClick={() => setSelectedImage(cert.imageUrl)}
                                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                                >
                                    <Maximize size={16} /> View
                                </button>
                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)] transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-200 hover:scale-105"
                                    >
                                        Verify <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-[1.1rem] font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">{cert.title}</h3>
                            <p className="text-gray-300 font-bold text-sm mb-3">{cert.issuer}</p>
                            {cert.description && (
                                <p className="text-[0.85rem] text-gray-400 font-medium mb-auto leading-relaxed line-clamp-3">{cert.description}</p>
                            )}
                            <div className="mt-5 pt-4 border-t border-white/5 flex items-center text-xs font-bold text-gray-500 mt-auto uppercase tracking-wider">
                                <span>Issued: {cert.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fullscreen Image Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            key="fullscreen-cert-image"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
                            onClick={() => setSelectedImage(null)}
                        >
                            <button
                                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                                title="Close"
                            >
                                <X size={24} />
                            </button>
                            <motion.img
                                initial={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.95 }}
                                src={selectedImage}
                                alt="Certificate Fullscreen"
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
