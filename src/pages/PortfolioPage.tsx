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
    const { configLoaded, projectsLoaded } = usePortfolioStore();
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
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-[#09090b] flex flex-col items-center justify-center"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-16 h-16 text-blue-500 mb-8 flex justify-center items-center"
                    >
                        <Code2 size={48} />
                    </motion.div>

                    <div className="flex flex-col items-center gap-2">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Loading Portfolio
                        </motion.div>
                        <div className="flex gap-1.5 mt-2">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full bg-blue-500"
                                    animate={{
                                        y: ["0%", "-50%", "0%"],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.15,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
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
