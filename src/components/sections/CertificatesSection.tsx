import { useState } from 'react';
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
                        className="bg-[#18181b] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#00d8ff]/30 hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(0,216,255,0.1)] transition-all duration-300 flex flex-col h-full"
                    >
                        <div className="w-full h-56 bg-[#09090b] relative overflow-hidden flex items-center justify-center border-b border-white/5 p-4 group-hover:bg-[#09090b]/80 transition-colors">
                            <img
                                src={cert.imageUrl}
                                alt={cert.title}
                                className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 rounded-md"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Certificate+Image'; }}
                            />
                            <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                                <button
                                    onClick={() => setSelectedImage(cert.imageUrl)}
                                    className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-700 hover:scale-105"
                                >
                                    <Maximize size={16} /> View
                                </button>
                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full font-semibold shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-blue-400 hover:scale-105"
                                    >
                                        Verify <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold text-gray-100 mb-2 group-hover:text-blue-400 transition-colors">{cert.title}</h3>
                            <p className="text-blue-400/80 font-medium mb-2">{cert.issuer}</p>
                            {cert.description && (
                                <p className="text-sm text-gray-400 mb-auto leading-relaxed">{cert.description}</p>
                            )}
                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-sm text-gray-500 mt-auto">
                                <span>Issued: {cert.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
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
            </AnimatePresence>
        </div>
    );
};
