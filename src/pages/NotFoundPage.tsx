import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans selection:bg-blue-500/30">

            <main className="flex-grow flex items-center justify-center relative overflow-hidden px-6 pt-24 pb-12">
                {/* Background Details */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-blue-500/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="relative z-10 text-center max-w-lg mx-auto w-full"
                >
                    <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-8 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative backdrop-blur-md">
                        <div className="absolute inset-0 bg-blue-400/20 blur-[20px] rounded-3xl animate-pulse"></div>
                        <Compass className="w-10 h-10 md:w-12 md:h-12 text-blue-400 relative z-10 animate-[spin_10s_linear_infinite]" />
                    </div>

                    <h1 className="text-[5rem] md:text-[8rem] font-black leading-none mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600 drop-shadow-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                        404
                    </h1>

                    <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-200">
                        Lost in cyberspace?
                    </h2>

                    <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-10 font-medium max-w-[280px] md:max-w-none mx-auto leading-relaxed">
                        The page you are looking for doesn't exist or has been moved. Let's navigate you back to safety.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-3.5 bg-white text-black font-bold text-sm md:text-base rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-0.5 group outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#09090b]"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </button>
                </motion.div>
            </main>
        </div>
    );
};
