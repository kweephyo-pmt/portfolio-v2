import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Save, RotateCcw, User, Globe, Mail, AlertTriangle, MapPin, Camera, Loader2 } from 'lucide-react';
import { usePortfolioStore } from '../../../store/portfolioStore';
import { useToast } from '../../ui/Toast';
import { ImageUpload } from '../../ui/ImageUpload';

export const AdminSettings = () => {
    const { siteConfig, updateSiteConfig, resetToDefaults, configLoaded } = usePortfolioStore();
    const { showToast } = useToast();
    const [form, setForm] = useState({ ...siteConfig });
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [isUploadingProfile, setIsUploadingProfile] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;

        if (!cloudName) {
            showToast('error', 'Cloudinary config missing.');
            return;
        }

        setIsUploadingProfile(true);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'profiles');
        if (apiKey) formData.append('api_key', apiKey);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error?.message || 'Failed to upload');

            setForm({ ...form, profileImage: data.secure_url });
            showToast('success', 'Profile image uploaded!');
        } catch (err: any) {
            showToast('error', err.message || 'Error uploading profile image');
        } finally {
            setIsUploadingProfile(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

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
                { key: 'navbarName', label: 'Navbar Display Name', placeholder: 'e.g. Phyo, PMT, Leo...', type: 'text' },
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
                { key: 'heroGif', label: 'Hero GIF / Illustration URL', placeholder: 'https://... or leave blank for default', type: 'url' },
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
        <div className="max-w-5xl mx-auto text-gray-100 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 relative border-b border-white/5">
                {/* Decorative underline */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent"></div>
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Platform Settings</h1>
                    <p className="text-sm text-gray-400 font-medium">Configure your personal brand, portfolio content, and platform appearance</p>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Profile Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden transition-all duration-500 backdrop-blur-sm"
                >
                    <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    {/* Hidden file input for profile image */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProfileUpload}
                        className="hidden"
                    />

                    <div
                        className="relative group cursor-pointer"
                        onClick={() => !isUploadingProfile && fileInputRef.current?.click()}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500"></div>
                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#0a0a0b] flex items-center justify-center text-3xl font-bold text-white shrink-0 border-2 border-white/10 overflow-hidden z-10">
                            {isUploadingProfile ? (
                                <Loader2 size={32} className="animate-spin text-blue-400" />
                            ) : (
                                <>
                                    {form.profileImage ? (
                                        <img src={form.profileImage} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                                    ) : (
                                        form.name?.[0] || 'L'
                                    )}
                                    {/* Camera Icon Overlay */}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                                        <Camera size={24} className="text-white drop-shadow-md" />
                                        <span className="text-[10px] font-bold tracking-wider uppercase text-white drop-shadow-md">Change</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="text-center sm:text-left z-10 flex-1">
                        <h2 className="text-2xl font-bold mb-1.5 text-white">{form.name || 'Your Name'}</h2>
                        <h3 className="text-blue-400 font-medium text-sm mb-3">
                            {form.heroTitle || 'Developer'}
                        </h3>
                        <div className="text-gray-400 text-sm flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                            <MapPin size={16} className="text-gray-500" /> {form.location || 'Location'}
                        </div>
                    </div>

                    <div className="z-10 w-full sm:w-auto mt-4 sm:mt-0">
                        <label className="flex items-center justify-center gap-3 cursor-pointer rounded-2xl px-6 py-4 transition-all duration-300 border border-white/5 bg-black/40 hover:bg-white/5 group">
                            {/* Toggle switch */}
                            <div className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 ease-in-out border border-white/10 ${form.availableForWork ? 'bg-green-500/20' : 'bg-white/5'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full transition-all duration-300 ease-in-out shadow-sm ${form.availableForWork ? 'translate-x-[22px] bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'translate-x-[4px] bg-gray-400'}`} />
                            </div>

                            <input
                                type="checkbox"
                                checked={form.availableForWork}
                                onChange={e => setForm({ ...form, availableForWork: e.target.checked })}
                                className="sr-only"
                            />

                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-bold transition-colors duration-300 ${form.availableForWork ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                    {form.availableForWork ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                        </label>
                    </div>
                </motion.div>

                {/* Settings Sections */}
                <div className="space-y-8">
                    {sections.map((section, si) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: si * 0.07 }}
                            className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8"
                        >
                            <h2 className="text-lg font-bold mb-6 flex items-center gap-3 text-white">
                                <span className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400">
                                    {section.icon}
                                </span>
                                {section.title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.fields.map(field => (
                                    <div
                                        key={field.key}
                                        className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}
                                    >
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">{field.label}</label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                className="w-full bg-[#09090b]/50 border border-white/10 hover:border-white/20 focus:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 min-h-[120px] resize-y text-white placeholder:text-gray-600 shadow-inner"
                                                value={(form as any)[field.key] || ''}
                                                onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                                placeholder={field.placeholder}
                                            />
                                        ) : field.type === 'image' || field.type === 'file' ? (
                                            <ImageUpload
                                                value={(form as any)[field.key] || ''}
                                                onChange={(url) => setForm({ ...form, [field.key]: url })}
                                                uploadPreset={field.type === 'image' ? "profiles" : "documents"}
                                            />
                                        ) : (
                                            <input
                                                className="w-full bg-[#09090b]/50 border border-white/10 hover:border-white/20 focus:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 text-white placeholder:text-gray-600 shadow-inner"
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

                    {/* Project Categories Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/[0.02] border border-white/5 backdrop-blur-sm rounded-3xl p-6 sm:p-8"
                    >
                        <h2 className="text-lg font-bold mb-2 flex items-center gap-3 text-white">
                            <span className="p-2 bg-white/5 rounded-lg border border-white/10 text-gray-400">
                                <Globe size={18} />
                            </span>
                            Project Categories
                        </h2>
                        <p className="text-sm font-medium text-gray-500 mb-8 ml-[44px]">Manage the tabs shown in your project showcase (e.g. Web, Mobile, UI/UX)</p>

                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2.5">
                                {(form.projectCategories || []).map((cat, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-bold uppercase tracking-wider text-blue-400 group hover:border-blue-500/40 transition-colors"
                                    >
                                        {cat}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newCats = (form.projectCategories || []).filter((_, i) => i !== idx);
                                                setForm({ ...form, projectCategories: newCats });
                                            }}
                                            className="w-6 h-6 flex items-center justify-center rounded-full text-blue-400 hover:text-white hover:bg-red-500 transition-colors"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add new category (e.g. Design)"
                                    className="flex-1 bg-[#09090b]/50 border border-white/10 hover:border-white/20 focus:border-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none transition-all duration-300 text-white placeholder:text-gray-600 shadow-inner"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = e.currentTarget.value.trim().toLowerCase();
                                            if (val && !(form.projectCategories || []).includes(val)) {
                                                setForm({ ...form, projectCategories: [...(form.projectCategories || []), val] });
                                                e.currentTarget.value = '';
                                            }
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        const input = e.currentTarget.previousSibling as HTMLInputElement;
                                        const val = input.value.trim().toLowerCase();
                                        if (val && !(form.projectCategories || []).includes(val)) {
                                            setForm({ ...form, projectCategories: [...(form.projectCategories || []), val] });
                                            input.value = '';
                                        }
                                    }}
                                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-white transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Save Row (Sticky) */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 rounded-3xl p-4 sm:px-6 sticky bottom-6 shadow-[0_0_50px_rgba(0,0,0,0.6)] z-40 bg-[#111113]/80 backdrop-blur-md border border-white/10">
                    <div className="w-full sm:w-auto">
                        {!showResetConfirm ? (
                            <button
                                type="button"
                                onClick={() => setShowResetConfirm(true)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-red-400 hover:text-white hover:bg-red-500 rounded-2xl transition-all"
                            >
                                <RotateCcw size={16} />
                                Reset Defaults
                            </button>
                        ) : (
                            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-2.5 text-sm">
                                <span className="flex items-center gap-2 text-red-400 font-bold">
                                    <AlertTriangle size={18} /> Resets ALL data!
                                </span>
                                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                    <button type="button" onClick={handleReset} className="flex-1 sm:flex-none px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors shadow-md">Yes, reset</button>
                                    <button type="button" onClick={() => setShowResetConfirm(false)} className="flex-1 sm:flex-none px-5 py-2 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-semibold">Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-3.5 text-sm font-black text-black rounded-2xl transition-all bg-white hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5">
                        <Save size={18} />
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
};
