import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Hero = () => {
    const { data } = useApp();

    return (
        <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 flex items-center min-h-screen relative">
            {/* Background animated elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-secondary-400 font-medium tracking-wide mb-4 text-glow">
                            Welcome to my portfolio
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold font-sans text-white mb-6 uppercase tracking-tight">
                            I'm <span className="text-gradient drop-shadow-lg">{data.hero.name}</span>
                        </h1>
                        <h3 className="text-2xl md:text-3xl text-slate-300 font-light mb-6">
                            {data.hero.role}
                        </h3>
                        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl">
                            {data.hero.intro}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-medium transition-all shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_25px_rgba(139,92,246,0.7)] group"
                            >
                                Contact Me
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href={data.hero.resumeUrl || "/resume.pdf"}
                                target="_blank"
                                download
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 hover:border-slate-500 transition-all group"
                            >
                                <Download className="mr-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
