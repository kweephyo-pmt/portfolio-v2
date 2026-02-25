import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, Mail, ShieldCheck, ArrowLeft } from 'lucide-react';
import { usePortfolioStore } from '../../store/portfolioStore';
import { useToast } from '../ui/Toast';

export const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { loginAdmin } = usePortfolioStore();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        await new Promise((r) => setTimeout(r, 700));
        const success = await loginAdmin(email, password);
        setLoading(false);
        if (!success) {
            setError('Invalid credentials. Please try again.');
            showToast('error', 'Access denied. Invalid credentials.');
        } else {
            showToast('success', 'Welcome back! 👋');
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: '#000000', fontFamily: 'var(--font-body)' }}>

            {/* ── Left panel (branding) ── */}
            <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-14 overflow-hidden">

                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <img src="/Developer.gif" alt="Background Element" className="w-full h-full object-cover opacity-80" />
                    {/* Dark overlay to ensure text readability */}
                    <div className="absolute inset-0 rounded-none bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 rounded-none bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
                </div>

                {/* Logo */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                            <ShieldCheck size={18} color="black" />
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">Portfolio Admin</span>
                    </div>
                </div>

                {/* Center text */}
                <div className="relative z-10 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="text-5xl font-black text-white leading-tight tracking-tight mb-4">
                            Your portfolio,<br />
                            <span className="text-gray-400">
                                your control.
                            </span>
                        </h2>
                        <p className="text-gray-400 text-base leading-relaxed max-w-sm">
                            Manage projects, skills, experience and all your content from one beautiful dashboard.
                        </p>
                    </motion.div>

                    {/* Feature pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-col gap-3"
                    >
                        {[
                            { label: 'Real-time content updates' },
                            { label: 'Secure Firebase authentication' },
                            { label: 'Full CRUD for all sections' },
                        ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                <span className="text-sm text-gray-400">{item.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom caption */}
                <div className="relative z-10">
                    <p className="text-xs text-gray-600">© {new Date().getFullYear()} Portfolio Admin. All rights reserved.</p>
                </div>
            </div>

            {/* Vertical divider */}
            <div className="hidden lg:block w-px self-stretch"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }}
            />

            {/* ── Right panel (form) ── */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                    className="w-full max-w-[400px]"
                >
                    {/* Mobile logo */}
                    <div className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                            <ShieldCheck size={18} color="black" />
                        </div>
                        <span className="text-white font-bold text-lg">Portfolio Admin</span>
                    </div>

                    {/* Back button */}
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm font-medium w-fit group"
                    >
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Back to Portfolio
                    </button>

                    {/* Heading */}
                    <div className="mb-10">
                        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Sign in</h1>
                        <p className="text-gray-500 text-sm">Enter your credentials to access the dashboard.</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <div className="space-y-2">
                            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="relative group">
                                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors duration-200" />
                                <input
                                    id="admin-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    required
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-gray-700 outline-none transition-all duration-200"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                    onFocus={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.06)';
                                    }}
                                    onBlur={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="relative group">
                                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-white transition-colors duration-200" />
                                <input
                                    id="admin-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••••"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                    required
                                    className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder-gray-700 outline-none transition-all duration-200"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                    onFocus={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.06)';
                                    }}
                                    onBlur={e => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm text-red-400"
                                    style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)' }}
                                >
                                    <AlertCircle size={14} className="shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.015 }}
                            whileTap={{ scale: loading ? 1 : 0.985 }}
                            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold text-black transition-opacity relative overflow-hidden"
                            style={{
                                background: '#ffffff',
                                boxShadow: '0 4px 20px rgba(255,255,255,0.15)',
                                opacity: loading ? 0.75 : 1,
                                cursor: loading ? 'not-allowed' : 'pointer',
                            }}
                        >
                            {loading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                                        className="w-4 h-4 border-2 border-black/25 border-t-black rounded-full"
                                    />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <Lock size={14} />
                                    Continue
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="mt-10 pt-8 flex items-center gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }} />
                        <p className="text-xs text-gray-600">Protected by Firebase · End-to-end secure</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
