import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';
import { Mail, MapPin, User, FileText } from 'lucide-react';

export const AboutSection = () => {
    const { siteConfig } = usePortfolioStore();

    return (
        <section id="about" className="section relative overflow-hidden bg-transparent">
            <div className="container relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-[2.5rem] md:text-[3rem] font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">Me</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    {/* Left: Photo */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative flex justify-center"
                    >
                        <div className="relative w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden border-2 border-white/10 p-2 bg-gradient-to-b from-white/5 to-transparent">
                            <div className="w-full h-full rounded-xl overflow-hidden relative group">
                                <img
                                    src={siteConfig.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"}
                                    alt={siteConfig.name || "Profile"}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Phyo+Min+Thein&size=400&background=random'; }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#110526] via-[#110526]/40 to-transparent opacity-60" />
                            </div>
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-[#00d8ff]/20 to-[#8b5cf6]/20 blur-[60px] rounded-full pointer-events-none" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                            {(() => {
                                const title = siteConfig.aboutTitle;
                                if (!title) {
                                    return (
                                        <>
                                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">{siteConfig.name || 'Phyo Min Thein'}</span>
                                        </>
                                    );
                                }

                                const imIndex = title.indexOf("I'm ");
                                if (imIndex !== -1) {
                                    return (
                                        <>
                                            {title.substring(0, imIndex + 4)}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">{title.substring(imIndex + 4)}</span>
                                        </>
                                    );
                                }

                                const amIndex = title.indexOf("am ");
                                if (amIndex !== -1) {
                                    return (
                                        <>
                                            {title.substring(0, amIndex + 3)}<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">{title.substring(amIndex + 3)}</span>
                                        </>
                                    );
                                }

                                const words = title.split(' ');
                                if (words.length > 1) {
                                    const lastWord = words.pop();
                                    return (
                                        <>
                                            {words.join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">{lastWord}</span>
                                        </>
                                    );
                                }
                                return <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">{title}</span>;
                            })()}
                        </h3>
                        <p className="text-[1.05rem] text-gray-300 leading-relaxed mb-8">
                            {siteConfig.aboutMe || "I'm a passionate full-stack developer who loves building elegant, user-centered digital experiences. With expertise spanning web and mobile development, I craft solutions that combine technical excellence with beautiful design."}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                                <div className="w-12 h-12 rounded-lg bg-[#00d8ff]/10 text-[#00d8ff] flex items-center justify-center">
                                    <User size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm text-gray-400">Name</p>
                                    <p className="font-medium text-white truncate truncate w-full" title={siteConfig.name}>{siteConfig.name || "Phyo Min Thein"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                                <div className="w-12 h-12 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center">
                                    <MapPin size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm text-gray-400">Location</p>
                                    <p className="font-medium text-white truncate w-full" title={siteConfig.location}>{siteConfig.location || "Thailand 🇹🇭"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 sm:col-span-2 transition-colors hover:bg-white/10">
                                <div className="w-12 h-12 rounded-lg bg-[#f43f5e]/10 text-[#f43f5e] flex items-center justify-center">
                                    <Mail size={24} />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm text-gray-400">Email</p>
                                    <a href={`mailto:${siteConfig.email}`} className="font-medium text-white hover:text-[#00d8ff] transition-colors truncate w-full block" title={siteConfig.email}>{siteConfig.email || "phyominthein.dev@gmail.com"}</a>
                                </div>
                            </div>
                        </div>

                        {siteConfig.resumeUrl ? (
                            <a href={siteConfig.resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 btn bg-[#8b5cf6] text-white hover:bg-[#9d71f6] shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-all">
                                <FileText size={18} />
                                Download Resume
                            </a>
                        ) : (
                            <button className="inline-flex items-center gap-2 btn bg-[#8b5cf6] text-white hover:bg-[#9d71f6] shadow-[0_4px_20px_rgba(139,92,246,0.3)] transition-all cursor-not-allowed opacity-80" title="Resume not available">
                                <FileText size={18} />
                                Download Resume
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
