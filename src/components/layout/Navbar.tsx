import { useState, useEffect } from 'react';
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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);

            // Determine active section
            const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];
            for (const section of sections.reverse()) {
                const el = document.getElementById(section);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActiveSection(section);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const id = href.replace('#', '');
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
                    className="flex items-center gap-6 px-4 py-2 rounded-full border border-white/10"
                    style={{
                        background: scrolled ? 'rgba(30, 15, 60, 0.85)' : 'rgba(59, 27, 109, 0.4)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.4s ease',
                    }}
                >
                    {/* Logo (LEO) */}
                    <button
                        onClick={() => handleNavClick('#hero')}
                        className="font-black text-[#00d8ff] tracking-wider text-[1.1rem] px-2 uppercase"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        {siteConfig.navbarName || (siteConfig.name ? siteConfig.name.split(' ')[0] : 'LEO')}
                    </button>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`px-4 py-1.5 rounded-full text-[0.85rem] font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    {link.label}
                                </button>
                            );
                        })}
                    </div>


                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-white bg-white/10 rounded-full"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
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
                        transition={{ duration: 0.2 }}
                        className="fixed top-[90px] left-4 right-4 z-[999] bg-[#271249]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 flex flex-col gap-2 shadow-2xl md:hidden"
                    >
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="px-4 py-3 rounded-xl text-[1rem] font-medium text-white text-left hover:bg-white/10 transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
