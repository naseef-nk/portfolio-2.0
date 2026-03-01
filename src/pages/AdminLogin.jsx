import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Lock, ArrowRight, ShieldAlert } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { loginAdmin } = useApp();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        // Minor delay for animation effect
        setTimeout(() => {
            const success = loginAdmin(password);
            if (success) {
                navigate('/admin/dashboard');
            } else {
                setError(true);
                setIsLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-600/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="glass-card p-8 sm:p-10 rounded-2xl border border-slate-700/50 shadow-2xl relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800/80 mb-4 border border-slate-700 shadow-inner">
                            <Lock className="w-8 h-8 text-primary-400 neon-glow-primary" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide text-glow">
                            Admin Access
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Please enter the security passkey to continue.
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError(false);
                                    }}
                                    className={`w-full px-5 py-4 bg-slate-800/50 border rounded-xl focus:outline-none transition-all text-white placeholder-slate-500 tracking-widest ${error ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-700 focus:border-primary-500 focus:ring-1 focus:ring-primary-500'
                                        }`}
                                    placeholder="••••••••"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-2 rounded-md border border-red-500/20"
                                >
                                    <ShieldAlert className="w-4 h-4" />
                                    Incorrect password. Access denied.
                                </motion.div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full flex items-center justify-center py-4 px-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Authenticate <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/')}
                            className="text-slate-500 hover:text-slate-300 transition-colors text-sm"
                        >
                            ← Return to Portfolio
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
