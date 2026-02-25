import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Shield, AlertCircle, Mail } from 'lucide-react';
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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        await new Promise((r) => setTimeout(r, 600));
        const success = await loginAdmin(email, password);
        setLoading(false);
        if (!success) {
            setError('Invalid password. Please try again.');
            showToast('error', 'Access denied. Invalid credentials.');
        } else {
            showToast('success', 'Welcome back, Leo! 👋');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-bg)',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Background */}
            <div style={{
                position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
                width: '600px', height: '600px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '3rem 2.5rem',
                    width: '100%',
                    maxWidth: '420px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Top gradient */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                    background: 'linear-gradient(90deg, var(--color-accent), var(--color-accent-2))',
                }} />

                {/* Icon */}
                <div style={{
                    width: '64px', height: '64px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, var(--color-accent), var(--color-accent-2))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.75rem',
                    boxShadow: '0 8px 32px var(--color-accent-glow)',
                }}>
                    <Shield size={28} color="white" />
                </div>

                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                    Admin Panel
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                    Enter your password to manage portfolio content.
                </p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="form-group">
                        <label className="label" htmlFor="admin-email">
                            <Mail size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />
                            Email
                        </label>
                        <input
                            id="admin-email"
                            type="email"
                            className="input"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setError(''); }}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label" htmlFor="admin-password">
                            <Lock size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                id="admin-password"
                                type={showPassword ? 'text' : 'password'}
                                className="input"
                                placeholder="Enter admin password"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                required
                                style={{ paddingRight: '3rem' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute', right: '0.875rem', top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none', border: 'none',
                                    cursor: 'pointer', color: 'var(--color-text-muted)',
                                    display: 'flex', alignItems: 'center',
                                    padding: 0,
                                }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.75rem 1rem',
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.25)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-error)',
                                fontSize: '0.85rem',
                            }}
                        >
                            <AlertCircle size={15} />
                            {error}
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{ justifyContent: 'center', opacity: loading ? 0.8 : 1 }}
                    >
                        {loading ? (
                            <div style={{
                                width: '16px', height: '16px', border: '2px solid white',
                                borderTopColor: 'transparent', borderRadius: '50%',
                                animation: 'spin-slow 0.8s linear infinite',
                            }} />
                        ) : (
                            <>
                                <Lock size={15} />
                                Access Panel
                            </>
                        )}
                    </button>
                </form>

                <p style={{
                    marginTop: '2rem', textAlign: 'center',
                    fontSize: '0.75rem', color: 'var(--color-text-dim)',
                }}>
                    🔒 Secured admin access only
                </p>
            </motion.div>
        </div>
    );
};
