import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { AboutSection } from '../components/sections/AboutSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { usePortfolioStore } from '../store/portfolioStore';
import { LoadingScreen } from '../components/ui/LoadingScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MIN_LOADER_MS = 1500;

// Persists across navigations — loader only shows on first visit
let loaderShown = false;

export const PortfolioPage = () => {
    const { configLoaded, projectsLoaded, siteConfig } = usePortfolioStore();
    const location = useLocation();

    const [minTimeElapsed, setMinTimeElapsed] = useState(loaderShown);
    useEffect(() => {
        if (loaderShown) return;
        const t = setTimeout(() => {
            loaderShown = true;
            setMinTimeElapsed(true);
        }, MIN_LOADER_MS);
        return () => clearTimeout(t);
    }, []);

    const isLoaded = configLoaded && projectsLoaded && minTimeElapsed;

    useEffect(() => {
        if (isLoaded && location.hash) {
            const hashId = location.hash.replace('#', '');
            setTimeout(() => {
                const element = document.getElementById(hashId);
                if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'instant' });
                }
            }, 100);
        }
    }, [isLoaded, location.hash]);

    return (
        <AnimatePresence mode="wait">
            {!isLoaded ? (
                <LoadingScreen key="loader" name={siteConfig.name} minMs={MIN_LOADER_MS} />
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
