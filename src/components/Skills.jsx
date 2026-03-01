import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Cpu, Server, Database, Wrench } from 'lucide-react';

const Skills = () => {
    const { data } = useApp();

    const categories = [
        {
            id: 'frontend',
            title: 'Frontend',
            icon: <Cpu className="w-5 h-5 text-primary-400" />,
            skills: data.skills.frontend,
            delay: 0.1
        },
        {
            id: 'backend',
            title: 'Backend',
            icon: <Server className="w-5 h-5 text-secondary-400" />,
            skills: data.skills.backend,
            delay: 0.2
        },
        {
            id: 'database',
            title: 'Database',
            icon: <Database className="w-5 h-5 text-primary-400" />,
            skills: data.skills.database,
            delay: 0.3
        },
        {
            id: 'tools',
            title: 'Tools',
            icon: <Wrench className="w-5 h-5 text-secondary-400" />,
            skills: data.skills.tools,
            delay: 0.4
        }
    ];

    return (
        <section id="skills" className="py-20 relative bg-slate-900/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-widest">
                        My <span className="text-gradient">Skills</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: cat.delay }}
                            className="glass-card p-6 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white">{cat.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-3 py-1 text-sm bg-slate-800/80 text-slate-300 rounded-full border border-slate-700 hover:border-primary-500 hover:text-primary-400 transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
