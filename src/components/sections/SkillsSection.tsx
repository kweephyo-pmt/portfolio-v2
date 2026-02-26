import { motion } from 'framer-motion';
import { usePortfolioStore } from '../../store/portfolioStore';

export const SkillsSection = () => {
    const { skills } = usePortfolioStore();

    // If there are no skills, don't render the marquee (or render an empty section)
    if (!skills || skills.length === 0) return null;

    // We duplicate the array to create a seamless infinite loop
    const SCROLLING_STACK = [...skills, ...skills];

    return (
        <section id="skills" className="section relative overflow-hidden bg-transparent">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-[2.5rem] font-bold text-white tracking-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d8ff] to-[#8b5cf6]">Stack</span>
                    </h2>
                </div>
            </div>

            {/* Scrolling Marquee Container with Masked Edges */}
            <div
                className="relative flex overflow-x-hidden group py-4"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                }}
            >
                <motion.div
                    className="flex gap-6 whitespace-nowrap pl-6 w-max"
                    animate={{ x: [0, "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 25 // Adjust speed here
                    }}
                >
                    {SCROLLING_STACK.map((tech, index) => (
                        <div
                            key={`${tech.id}-${index}`}
                            className="group w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-[#00d8ff]/50 hover:shadow-[0_0_30px_rgba(0,216,255,0.2)] hover:-translate-y-2"
                            title={tech.name}
                        >
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className={`w-12 h-12 md:w-16 md:h-16 object-contain transition-all duration-300 opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:opacity-100 group-hover:scale-110 ${tech.name?.toLowerCase().includes('next') ? 'invert opacity-60' : ''}`}
                                loading="lazy"
                                decoding="async"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
