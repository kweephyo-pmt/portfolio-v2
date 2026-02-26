import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LINES = [
    { text: 'phyominthein@macbook-pro ~ % init_workspace', delay: 0.1, type: 'cmd' },
    { text: 'loading core layout modules...', delay: 0.3, type: 'info' },
    { text: 'fetching portfolio database [200 OK]', delay: 0.6, type: 'success' },
    { text: 'establishing secure handshake...', delay: 0.9, type: 'info' },
    { text: 'session authenticated. [root access granted]', delay: 1.2, type: 'success' },
    { text: 'launching phyo.dev environment_v2.0...', delay: 1.5, type: 'highlight' }
];

interface Props {
    name: string;
    minMs?: number;
}

export function LoadingScreen({ name, minMs = 1500 }: Props) {
    const displayName = name || 'Phyo Min Thein';
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const id = setInterval(() => setBlink(b => !b), 500);
        return () => clearInterval(id);
    }, []);

    return (
        <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a]"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none delay-500" />

            {/* Terminal Window & Header Wrapper */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-[90%] sm:w-[85%] max-w-2xl relative z-10 flex flex-col items-center"
            >
                {/* Header: Name and Title */}
                <div className="mb-6 sm:mb-8 text-center flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-[0.4em] text-cyan-500/80 font-mono mb-2 block"
                    >
                        Terminal Session
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.1em] uppercase text-white"
                        style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
                    >
                        {displayName}
                    </motion.h1>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-[0.6rem] sm:text-[0.7rem] uppercase tracking-[0.25em] mt-2 text-gray-400 font-mono block"
                    >
                        Full-Stack Developer Space
                    </motion.span>
                </div>

                {/* macOS Window Chrome */}
                <div className="bg-[#1a1a1a] w-full rounded-t-xl border border-[#333333] border-b-0 flex items-center px-3 sm:px-4 py-2 sm:py-3 shadow-lg">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-400 font-mono tracking-wider uppercase">
                            Terminal
                        </span>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="bg-[#0c0c0c] w-full border border-[#333333] rounded-b-xl p-4 sm:p-6 min-h-[260px] sm:min-h-[320px] font-mono text-[0.7rem] sm:text-[0.85rem] leading-relaxed relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col gap-2 sm:gap-2.5">
                        {LINES.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: line.delay, duration: 0.3 }}
                                className="flex items-start gap-2 sm:gap-3"
                            >
                                {line.type === 'cmd' ? (
                                    <span className="text-[#3b82f6] shrink-0 font-bold">❯</span>
                                ) : (
                                    <span className="text-[#333333] shrink-0">│</span>
                                )}

                                <span className={
                                    line.type === 'cmd' ? 'text-[#e5e7eb] font-semibold break-all sm:break-normal' :
                                        line.type === 'success' ? 'text-[#10b981]' :
                                            line.type === 'highlight' ? 'text-[#cba6f7]' :
                                                'text-[#8b949e]'
                                }>
                                    {line.text}
                                </span>
                            </motion.div>
                        ))}

                        {/* Blinking Cursor */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="flex items-center gap-2 sm:gap-3 mt-1"
                        >
                            <span className="text-[#3b82f6] font-bold">❯</span>
                            <span
                                className="w-2 h-[1em] sm:w-2.5 bg-indigo-400 rounded-[1px]"
                                style={{ opacity: blink ? 1 : 0 }}
                            />
                        </motion.div>
                    </div>

                    {/* Progress Bar inside terminal */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1a1a1a]">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: minMs / 1000, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
