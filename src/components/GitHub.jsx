import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Github } from 'lucide-react';

const GitHubSection = () => {
    const { data } = useApp();

    // Extract username from github URL if possible, fallback to a placeholder user or skip image
    const githubUrl = data.contact.github;
    const username = githubUrl.split('/').pop() || 'github';

    return (
        <section id="github" className="py-20 relative bg-slate-900/40">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-block p-3 rounded-full bg-slate-800/80 mb-4 border border-slate-700 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        <Github className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-widest">
                        GitHub <span className="text-gradient">Activity</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-slate-500 to-slate-300 mx-auto rounded-full mb-6"></div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass-card p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center border-slate-700/50 hover:border-slate-600 transition-colors"
                >
                    <img
                        src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=8b5cf6&text_color=cbd5e1&icon_color=3b82f6&bg_color=00000000&hide_border=true&border_radius=10`}
                        alt="GitHub Stats"
                        className="w-full max-w-md mx-auto filter drop-shadow-md"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="mt-8">
                        <a
                            href={data.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-medium border border-slate-700 transition-colors flex items-center gap-2"
                        >
                            <Github className="w-4 h-4" /> Visit Profile
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GitHubSection;
