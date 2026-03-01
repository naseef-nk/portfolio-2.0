import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { User, Code, Terminal, Target } from 'lucide-react';

const About = () => {
    const { data } = useApp();

    const highlights = [
        { icon: <User className="w-6 h-6 text-primary-400" />, title: "Who I Am", desc: "Passionate Developer" },
        { icon: <Code className="w-6 h-6 text-secondary-400" />, title: "Tech Stack", desc: "MERN Stack Focus" },
        { icon: <Terminal className="w-6 h-6 text-primary-400" />, title: "Learning", desc: "System Design" },
        { icon: <Target className="w-6 h-6 text-secondary-400" />, title: "Goal", desc: "Impactful Products" }
    ];

    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-widest">
                        <span className="text-gradient">About</span> Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-5 relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden glass-card p-2 group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <img
                                src={data.about.image || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800"}
                                alt="Workspace"
                                className="rounded-xl w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-7"
                    >
                        <div className="glass-card p-8 rounded-2xl border border-slate-700/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>

                            <p className="text-slate-300 text-lg leading-relaxed mb-8">
                                {data.about.content}
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                {highlights.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{item.title}</h4>
                                            <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
