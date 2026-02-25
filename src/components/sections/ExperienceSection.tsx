import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { SectionHeader } from '../ui/SectionHeader';

const TYPE_COLORS = {
    work: '#58a6ff',
    internship: '#d2a8ff',
    freelance: '#3fb950',
};

const TYPE_LABELS = {
    work: 'Full-time',
    internship: 'Internship',
    freelance: 'Freelance',
};

export const ExperienceSection = () => {
    const { experiences } = usePortfolioStore();

    return (
        <section id="experience" className="section">
            <div className="container">
                <SectionHeader
                    label="Journey"
                    title={`Work <span class="gradient-text">Experience</span>`}
                    description="My professional journey building real-world applications and solving complex challenges."
                />

                <div className="relative max-w-[800px] mx-auto">
                    {/* Timeline line */}
                    <div className="absolute left-[20px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-2)] to-transparent" />

                    <div className="flex flex-col gap-8 pl-[60px]">
                        {experiences.map((exp, i) => {
                            const color = TYPE_COLORS[exp.type];
                            return (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.15 }}
                                    className="relative group"
                                >
                                    {/* Timeline Dot */}
                                    <div
                                        className="absolute -left-[48px] top-6 w-4 h-4 rounded-full border-[3px] border-[var(--color-bg)] transition-transform duration-300 group-hover:scale-125"
                                        style={{ background: color, boxShadow: `0 0 12px ${color}66` }}
                                    />

                                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-7 transition-all duration-300 group-hover:border-[var(--color-border-hover)] group-hover:shadow-[0_0_0_1px_var(--color-border-hover),0_0_20px_var(--color-accent-glow)] group-hover:-translate-y-1">
                                        {/* Header */}
                                        <div className="flex justify-between items-start flex-wrap gap-3 mb-3">
                                            <div>
                                                <h3 className="text-[1.05rem] font-bold mb-1">
                                                    {exp.role}
                                                </h3>
                                                <div
                                                    className="flex items-center gap-2 text-[0.9rem] font-semibold"
                                                    style={{ color }}
                                                >
                                                    <Briefcase size={14} />
                                                    {exp.company}
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span
                                                    className="px-3 py-1 rounded-full text-[0.7rem] font-semibold border"
                                                    style={{ background: `${color}18`, color, borderColor: `${color}33` }}
                                                >
                                                    {TYPE_LABELS[exp.type]}
                                                </span>
                                                <div className="flex items-center gap-1.5 text-[0.78rem] text-[var(--color-text-dim)]">
                                                    <Calendar size={12} />
                                                    {exp.period}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[0.78rem] text-[var(--color-text-dim)]">
                                                    <MapPin size={12} />
                                                    {exp.location}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-[0.875rem] text-[var(--color-text-muted)] leading-[1.8] mb-4">
                                            {exp.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.technologies.map((tech) => (
                                                <span key={tech} className="badge text-[0.7rem] px-2 py-0.5">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
