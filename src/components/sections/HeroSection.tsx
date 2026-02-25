import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

export const HeroSection = () => {
    const { siteConfig } = usePortfolioStore();
    const [typedText, setTypedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    // Convert heroTitle from admin panel into an array. E.g "DevOps, Full-Stack, Designer" -> ['DevOps', 'Full-Stack', 'Designer']
    const typingWords = useMemo(() => {
        if (!siteConfig.heroTitle) return ['Developer'];
        return siteConfig.heroTitle.split(',').map(w => w.trim()).filter(Boolean);
    }, [siteConfig.heroTitle]);

    // Typing effect
    useEffect(() => {
        const currentWord = typingWords[wordIndex % typingWords.length] || '';
        if (!currentWord) return;

        const delay = deleting ? 40 : 80;

        const timer = setTimeout(() => {
            if (!deleting) {
                setTypedText(currentWord.slice(0, charIndex + 1));
                if (charIndex + 1 === currentWord.length) {
                    setTimeout(() => setDeleting(true), 1800);
                } else {
                    setCharIndex((c) => c + 1);
                }
            } else {
                setTypedText(currentWord.slice(0, charIndex - 1));
                if (charIndex - 1 === 0) {
                    setDeleting(false);
                    setWordIndex((i) => (i + 1) % typingWords.length);
                    setCharIndex(0);
                } else {
                    setCharIndex((c) => c - 1);
                }
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [charIndex, deleting, wordIndex, typingWords]);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const nameParts = siteConfig.name ? siteConfig.name.split(' ') : [];
    const firstWord = nameParts[0] || 'PHYO';
    const restOfName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'MIN THEIN';

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center relative overflow-hidden pt-[80px]"
        >
            <div className="container relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center">

                        {/* Name with huge gradient and reflection */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="text-[clamp(3.5rem,8vw,6rem)] font-black leading-[1.05] tracking-tight mb-2 uppercase relative"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {siteConfig.name ? (
                                <>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] block">
                                        {firstWord}
                                    </span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f43f5e] to-[#f97316] block">
                                        {restOfName}
                                    </span>
                                    {/* Reflection */}
                                    <div className="absolute top-[80%] left-0 opacity-20 transform -scale-y-100 blur-[2px] pointer-events-none select-none">
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] block">
                                            {firstWord}
                                        </span>
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f43f5e] to-[#f97316] block">
                                            {restOfName}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <span className="text-transparent">Loading...</span>
                            )}
                        </motion.h1>

                        {/* Title (Typing Effect) */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                            className="text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-[#00d8ff] mb-6 mt-6 md:mt-10 min-h-[3rem]"
                        >
                            {typedText}<span className="animate-blink font-light text-white ml-[2px]">|</span>
                        </motion.h2>

                        {/* Bio Paragraph */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.45 }}
                            className="text-[1.05rem] text-gray-300 leading-[1.8] mb-10 max-w-[500px]"
                        >
                            {siteConfig.bio ? (
                                // Render formatted bio if the bio is exactly what's in the image natively, or just render the string
                                siteConfig.bio.includes('Software Engineering student') ? (
                                    <>
                                        Software Engineering student with expertise in <span className="text-[#00d8ff]">full-stack development</span>, and <span className="text-[#8b5cf6]">DevOps</span>.
                                        Delivering innovative solutions through modern technology stacks.
                                    </>
                                ) : (
                                    siteConfig.bio
                                )
                            ) : (
                                <>
                                    Software Engineering student with expertise in <span className="text-[#00d8ff]">full-stack development</span>, and <span className="text-[#8b5cf6]">DevOps</span>.
                                    Delivering innovative solutions through modern technology stacks.
                                </>
                            )}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                            className="flex gap-4 flex-wrap mb-10"
                        >
                            <button onClick={scrollToProjects} className="btn bg-[#00d8ff] text-[#110526] hover:bg-[#33e1ff] shadow-[0_4px_20px_rgba(0,216,255,0.3)]">
                                Explore My Work
                            </button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.65 }}
                            className="flex gap-4"
                        >
                            <a href={siteConfig.github || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-[14px] bg-[#161b22] text-white hover:bg-[#202630] transition-colors" title="GitHub">
                                <Github size={22} />
                            </a>
                            <a href={siteConfig.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-[14px] bg-[#0a66c2] text-white hover:bg-[#1176db] transition-colors" title="LinkedIn">
                                <Linkedin size={22} />
                            </a>
                            {siteConfig.instagram && (
                                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center rounded-[14px] bg-gradient-to-tr from-[#f97316] to-[#f43f5e] text-white hover:opacity-90 transition-opacity" title="Instagram">
                                    <Instagram size={22} />
                                </a>
                            )}
                        </motion.div>
                    </div>

                    {/* Right: Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="hidden md:flex flex-col items-center justify-center relative"
                    >
                        <img
                            src={siteConfig.heroGif || '/se.gif'}
                            alt="Software Engineering Illustration"
                            className="w-[90%] max-w-[500px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                        />
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 cursor-pointer"
                    onClick={scrollToProjects}
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                        className="w-[28px] h-[48px] border-2 border-[#00d8ff] rounded-full flex justify-center py-2"
                    >
                        <div className="w-[4px] h-[8px] bg-[#00d8ff] rounded-full" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
