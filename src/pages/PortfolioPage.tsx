import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { AboutSection } from '../components/sections/AboutSection';

import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';

import { usePortfolioStore } from '../store/portfolioStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const PortfolioPage = () => {
    const { configLoaded, projectsLoaded, siteConfig } = usePortfolioStore();
    const location = useLocation();

    const isLoaded = configLoaded && projectsLoaded;

    useEffect(() => {
        if (isLoaded && location.hash) {
            const hashId = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(hashId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'instant'
                    });
                }
            }, 100);
        }
    }, [isLoaded, location.hash]);

    return (
        <AnimatePresence mode="wait">
            {!isLoaded ? (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: -100,
                    }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[100] bg-[#030014] flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00d8ff]/10 blur-[120px] rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#8b5cf6]/10 blur-[100px] rounded-full delay-700" />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative mb-12"
                        >
                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                            <motion.div
                                animate={{
                                    boxShadow: ["0 0 0px rgba(0, 216, 255, 0)", "0 0 40px rgba(0, 216, 255, 0.3)", "0 0 0px rgba(0, 216, 255, 0)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00d8ff] to-[#8b5cf6] p-[1px] flex items-center justify-center shadow-2xl"
                            >
                                <div className="w-full h-full rounded-[15px] bg-[#030014] flex items-center justify-center">
                                    <Code2 size={36} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Name/Title */}
                        <div className="space-y-4 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase text-white"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {siteConfig.name || "Phyo Min Thein"}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="text-[0.65rem] md:text-[0.75rem] font-medium tracking-[0.4em] uppercase text-gray-500"
                            >
                                Portfolio Experience
                            </motion.p>
                        </div>

                        {/* Professional Progress Bar */}
                        <div className="mt-12 w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#00d8ff] to-transparent"
                            />
                        </div>
                    </div>

                    {/* Footer text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="absolute bottom-12 text-[0.6rem] uppercase tracking-[0.3em] text-gray-600"
                    >
                        © {new Date().getFullYear()} All Rights Reserved
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Navbar />
                    <main>
                        <HeroSection />
                        <AboutSection />
                        <ProjectsSection />
                        <SkillsSection />
                        <ContactSection />
                    </main>
                    <Footer />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
