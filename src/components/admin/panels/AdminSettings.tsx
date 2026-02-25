import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, User, Globe, Mail, AlertTriangle, MapPin } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { useToast } from '../../ui/Toast';
import { ImageUpload } from '../../ui/ImageUpload';

export const AdminSettings = () => {
    const { siteConfig, updateSiteConfig, resetToDefaults, configLoaded } = usePortfolioStore();
    const { showToast } = useToast();
    const [form, setForm] = useState({ ...siteConfig });
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    useEffect(() => {
        if (configLoaded) {
            setForm({ ...siteConfig });
        }
    }, [siteConfig, configLoaded]);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateSiteConfig(form);
        showToast('success', 'Settings saved successfully!');
    };

    const handleReset = () => {
        resetToDefaults();
        showToast('info', 'All data reset to defaults.');
        setShowResetConfirm(false);
    };

    const sections = [
        {
            title: 'Personal Info',
            icon: <User size={18} />,
            fields: [
                { key: 'name', label: 'Full Name', placeholder: 'Phyo Min Thein', type: 'text' },
                { key: 'tagline', label: 'Nickname / Handle', placeholder: 'Leo', type: 'text' },
                { key: 'heroTitle', label: 'Hero Title', placeholder: 'Full-Stack Developer', type: 'text' },
            ],
        },
        {
            title: 'Bio',
            icon: <Globe size={18} />,
            fields: [
                { key: 'bio', label: 'Short Bio (Hero Section)', placeholder: 'A short sentence about you...', type: 'textarea' },
                { key: 'aboutTitle', label: 'About Section Heading', placeholder: "Hi, I'm Phyo Min Thein", type: 'text' },
                { key: 'aboutMe', label: 'About Me (About Section)', placeholder: 'Tell your story...', type: 'textarea' },
                { key: 'profileImage', label: 'Profile Image', placeholder: '', type: 'image' },
            ],
        },
        {
            title: 'Contact',
            icon: <Mail size={18} />,
            fields: [
                { key: 'email', label: 'Email', placeholder: 'you@example.com', type: 'email' },
                { key: 'phone', label: 'Phone', placeholder: '+66 XX XXX XXXX', type: 'text' },
                { key: 'location', label: 'Location', placeholder: 'Thailand 🇹🇭', type: 'text' },
            ],
        },
        {
            title: 'Social Links',
            icon: <Globe size={18} />,
            fields: [
                { key: 'github', label: 'GitHub URL', placeholder: 'https://github.com/...', type: 'url' },
                { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/in/...', type: 'url' },
                { key: 'twitter', label: 'Twitter/X URL', placeholder: 'https://twitter.com/...', type: 'url' },
                { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...', type: 'url' },
                { key: 'resumeUrl', label: 'Resume URL', placeholder: 'https://drive.google.com/... or any PDF link', type: 'url' },
            ],
        },
    ];

    if (!configLoaded) {
        return (
            <div className="max-w-5xl mx-auto space-y-6 animate-pulse">
                <div className="border-b border-white/5 pb-6">
                    <div className="h-7 w-32 bg-white/10 rounded-lg mb-2" />
                    <div className="h-4 w-64 bg-white/5 rounded-lg" />
                </div>
                <div className="h-40 w-full bg-white/5 rounded-2xl" />
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="bg-white/5 rounded-2xl p-6 space-y-4">
                        <div className="h-5 w-32 bg-white/10 rounded" />
                        <div className="h-10 w-full bg-white/5 rounded-xl" />
                        <div className="h-10 w-full bg-white/5 rounded-xl" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto text-gray-100 space-y-6">
            <div className="border-b border-white/5 pb-6">
                <h1 className="text-2xl font-bold mb-1">Settings</h1>
                <p className="text-sm text-gray-400">Configure your portfolio content and appearance</p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* Profile Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shrink-0 shadow-[0_0_30px_rgba(59,130,246,0.5)] border-4 border-white/5 overflow-hidden z-10">
                        {form.profileImage ? (
                            <img src={form.profileImage} alt="" className="w-full h-full object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        ) : form.name?.[0] || 'L'}
                    </div>
                    <div className="text-center sm:text-left z-10 flex-1">
                        <div className="text-2xl font-bold mb-1">{form.name || 'Your Name'}</div>
                        <div className="text-blue-400 text-sm font-mono mb-2">
                            {form.heroTitle || 'Developer'}
                        </div>
                        <div className="text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-1">
                            <MapPin size={14} /> {form.location || 'Location'}
                        </div>
                    </div>
                    <div className="z-10 w-full sm:w-auto mt-4 sm:mt-0">
                        <label className={`flex flex-col sm:flex-row items-center justify-center gap-3 cursor-pointer rounded-xl px-5 py-3 transition-colors border ${form.availableForWork
                            ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20'
                            : 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                            }`}>
                            <input
                                type="checkbox"
                                checked={form.availableForWork}
                                onChange={e => setForm({ ...form, availableForWork: e.target.checked })}
                                className="w-5 h-5 rounded border-white/20 bg-[#09090b] text-green-500 focus:ring-green-500 focus:ring-offset-gray-900"
                            />
                            <span className={`text-sm font-bold ${form.availableForWork ? 'text-green-400' : 'text-red-400'}`}>
                                {form.availableForWork ? 'Available for Work' : 'Not Available'}
                            </span>
                        </label>
                    </div>
                </motion.div>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {sections.map((section, si) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: si * 0.07 }}
                            className="bg-[#18181b] border border-white/5 rounded-2xl p-6 sm:p-8"
                        >
                            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-blue-400">
                                {section.icon}
                                {section.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.fields.map(field => (
                                    <div
                                        key={field.key}
                                        className={`space-y-1.5 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
                                    >
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{field.label}</label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors min-h-[120px] resize-y"
                                                value={(form as any)[field.key] || ''}
                                                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                                placeholder={field.placeholder}
                                            />
                                        ) : field.type === 'image' ? (
                                            <ImageUpload
                                                value={(form as any)[field.key] || ''}
                                                onChange={(url) => setForm({ ...form, [field.key]: url })}
                                                uploadPreset="profiles"
                                            />
                                        ) : field.type === 'file' ? (
                                            <ImageUpload
                                                value={(form as any)[field.key] || ''}
                                                onChange={(url) => setForm({ ...form, [field.key]: url })}
                                                uploadPreset="documents"
                                            />
                                        ) : (
                                            <input
                                                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                                                type={field.type}
                                                value={(form as any)[field.key] || ''}
                                                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                                placeholder={field.placeholder}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Save Row */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 bg-[#18181b] border border-white/5 rounded-2xl p-4 sm:px-6 sticky bottom-6 shadow-2xl z-40">
                    <div className="w-full sm:w-auto">
                        {!showResetConfirm ? (
                            <button
                                type="button"
                                onClick={() => setShowResetConfirm(true)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-colors"
                            >
                                <RotateCcw size={16} />
                                Reset Defaults
                            </button>
                        ) : (
                            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 text-sm">
                                <span className="flex items-center gap-2 text-red-400 font-semibold">
                                    <AlertTriangle size={18} /> Resets ALL data!
                                </span>
                                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                    <button type="button" onClick={handleReset} className="flex-1 sm:flex-none px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-bold rounded-lg transition-colors border border-red-500/20">Yes</button>
                                    <button type="button" onClick={() => setShowResetConfirm(false)} className="flex-1 sm:flex-none px-4 py-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg shadow-blue-500/20">
                        <Save size={18} />
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};
