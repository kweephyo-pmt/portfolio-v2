import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';

const navLinks = [
    { label: 'About', href: '#hero' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { siteConfig } = usePortfolioStore();
    const isNavigating = useRef(false);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Simple scroll listener just for the glass background toggle
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);

            // Re-enable Intersection Observer only when scrolling naturally stops
            if (isNavigating.current) {
                if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
                scrollTimeoutRef.current = setTimeout(() => {
                    isNavigating.current = false;
                }, 150);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // High-performance Intersection Observer for active section highlighting
        const observer = new IntersectionObserver(
            (entries) => {
                if (isNavigating.current) return; // Prevent layout thrashing during smooth scroll

                // Find the section that is currently intersecting the most
                const visibleSections = entries.filter((entry) => entry.isIntersecting);
                if (visibleSections.length > 0) {
                    // Sort by intersection ratio to find the most prominent one
                    visibleSections.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                    setActiveSection(visibleSections[0].target.id);
                }
            },
            {
                // Trigger when section hits the upper/lower center of the viewport
                rootMargin: '-20% 0px -40% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1]
            }
        );

        // Observe only the sections that have corresponding nav links
        const sections = navLinks.map(link => link.href.replace('#', ''));
        sections.forEach((section) => {
            const el = document.getElementById(section);
            if (el) observer.observe(el);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const id = href.replace('#', '');

        // Immediately set active and lock the observer
        setActiveSection(id);
        isNavigating.current = true;

        // Fallback unlock just in case
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
            isNavigating.current = false;
        }, 2000);

        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-6 left-0 right-0 z-[1000] flex justify-center px-4"
            >
                <div
                    className={`flex items-center gap-4 sm:gap-8 px-5 py-2.5 rounded-full border transition-colors duration-500 backdrop-blur-md ${scrolled ? 'bg-[#111113]/80 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'bg-white/[0.02] border-white/5 shadow-none'}`}
                >
                    {/* Logo (LEO) */}
                    <button
                        onClick={() => handleNavClick('#hero')}
                        className="font-black tracking-wider text-[1.1rem] px-2 uppercase relative group"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] transition-opacity duration-300 group-hover:opacity-80">
                            {siteConfig.navbarName || (siteConfig.name ? siteConfig.name.split(' ')[0] : 'LEO')}
                        </span>
                        <div className="absolute -bottom-1 left-2 right-2 h-[2px] bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`relative px-5 py-2 rounded-full text-[0.85rem] font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white/10 border border-white/5 rounded-full z-0 pointer-events-none"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`md:hidden p-2 rounded-full transition-colors ${mobileOpen ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed top-[88px] left-4 right-4 z-[999] bg-[#111113]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col gap-2 shadow-[0_20px_40px_rgba(0,0,0,0.6)] md:hidden"
                    >
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`px-5 py-4 rounded-2xl text-[1rem] font-bold text-left transition-all flex items-center gap-3 ${isActive ? 'bg-white/10 text-white border border-white/5' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}`}
                                >
                                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#00d8ff] shadow-[0_0_10px_rgba(0,216,255,0.8)]" />}
                                    {link.label}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
