import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Github, Linkedin, MessageSquare } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { SectionHeader } from '../ui/SectionHeader';
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
    const { siteConfig } = usePortfolioStore();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    title: `New message from ${formData.name}`,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );
            setSent(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 5000);
        } catch (err) {
            console.error('EmailJS error:', err);
            alert('Failed to send message. Please try again or contact me directly.');
        } finally {
            setSending(false);
        }
    };

    const contactInfo = [
        { icon: <Mail size={20} />, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
        { icon: <Phone size={20} />, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
        { icon: <MapPin size={20} />, label: 'Location', value: siteConfig.location },
    ];

    return (
        <section id="contact" className="section bg-transparent">
            <div className="container">
                <SectionHeader
                    label="Get In Touch"
                    title={`Let's <span class="gradient-text">Connect</span>`}
                    description="Have a project in mind or want to collaborate? I'd love to hear from you."
                    center
                />

                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 max-w-[1000px] mx-auto">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6"
                    >
                        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-8">
                            <div className="w-12 h-12 rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-2)] flex items-center justify-center mb-5 shadow-[0_8px_24px_var(--color-accent-glow)]">
                                <MessageSquare size={22} color="white" />
                            </div>
                            <h3 className="text-[1.1rem] font-bold mb-2">
                                Open to Opportunities
                            </h3>
                            <p className="text-[0.875rem] text-[var(--color-text-muted)] leading-[1.7]">
                                I'm currently {siteConfig.availableForWork ? 'available for' : 'not actively looking for'} new opportunities. Whether it's a full-time role, freelance project, or just a chat — reach out!
                            </p>
                        </div>

                        {/* Contact Info */}
                        <div className="flex flex-col gap-3">
                            {contactInfo.map((item) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-4 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4 no-underline transition-colors duration-200 hover:border-[var(--color-border-hover)]"
                                >
                                    <div className="text-[var(--color-accent)] bg-[rgba(88,166,255,0.1)] rounded-[var(--radius-sm)] p-2 flex">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="text-[0.72rem] text-[var(--color-text-dim)] mb-0.5 uppercase tracking-wide">
                                            {item.label}
                                        </div>
                                        <div className="text-[0.875rem] font-medium text-[var(--color-text)]">
                                            {item.value}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Social */}
                        <div className="flex gap-3">
                            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 justify-center">
                                <Github size={16} /> GitHub
                            </a>
                            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 justify-center">
                                <Linkedin size={16} /> LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[var(--radius-xl)] p-10">
                            <h3 className="text-[1.1rem] font-bold mb-8">
                                Send a Message
                            </h3>

                            {sent ? (
                                <div className="p-8 text-center bg-green-500/10 border border-green-500/20 rounded-[var(--radius-lg)]">
                                    <div className="text-[2rem] mb-2">🎉</div>
                                    <div className="font-semibold text-green-500 mb-1">
                                        Message Sent!
                                    </div>
                                    <div className="text-[0.875rem] text-[var(--color-text-muted)]">
                                        Thanks! I'll get back to you soon.
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div className="form-group">
                                        <label className="label" htmlFor="contact-name">Your Name</label>
                                        <input
                                            id="contact-name"
                                            type="text"
                                            required
                                            className="input"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="contact-email">Email Address</label>
                                        <input
                                            id="contact-email"
                                            type="email"
                                            required
                                            className="input"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="contact-message">Message</label>
                                        <textarea
                                            id="contact-message"
                                            required
                                            className="input textarea"
                                            placeholder="Tell me about your project..."
                                            value={formData.message}
                                            onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                                            rows={5}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary justify-center"
                                        disabled={sending}
                                        style={{ opacity: sending ? 0.75 : 1 }}
                                    >
                                        {sending ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
