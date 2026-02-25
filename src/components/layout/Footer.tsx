import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Mail, ArrowUp } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { motion } from 'framer-motion';

export const Footer = () => {
    const { siteConfig } = usePortfolioStore();

    const socials = [
        { icon: Github, href: siteConfig.github, label: 'GitHub' },
        { icon: Linkedin, href: siteConfig.linkedin, label: 'LinkedIn' },
        { icon: Twitter, href: siteConfig.twitter, label: 'Twitter' },
        { icon: Instagram, href: siteConfig.instagram, label: 'Instagram' },
        { icon: Mail, href: siteConfig.email ? `mailto:${siteConfig.email}` : '', label: 'Email' },
    ].filter(s => s.href) as { icon: React.ElementType; href: string; label: string }[];

    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <footer className="border-t border-white/5 mt-16">
            <div className="container">
                {/* Main footer body */}
                <div className="py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
                    {/* Left: Brand & tagline */}
                    <div>
                        <div
                            className="text-2xl font-black tracking-tight mb-2 gradient-text"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            {siteConfig.name || 'Portfolio'}
                        </div>
                        <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                            {siteConfig.heroTitle || 'Full-Stack Developer'} based in{' '}
                            {siteConfig.location || 'the world'}.
                        </p>
                    </div>

                    {/* Right: Socials */}
                    <div className="flex flex-col gap-3 items-start md:items-end">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
                            Find me on
                        </p>
                        <div className="flex items-center gap-2">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target={href.startsWith('mailto') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    title={label}
                                    whileHover={{ y: -3 }}
                                    className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/8 bg-white/4 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors"
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

                {/* Bottom bar */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-600">
                        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                    </p>
                    <button
                        onClick={scrollTop}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors group"
                    >
                        <ArrowUp size={13} className="group-hover:-translate-y-0.5 transition-transform" />
                        Back to top
                    </button>
                </div>
            </div>
        </footer>
    );
};
