import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
    const { data } = useApp();

    return (
        <footer className="border-t border-slate-800 bg-slate-950 py-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0 text-slate-400 text-sm">
                    &copy; {new Date().getFullYear()} Naseef N.K. All rights reserved.
                </div>
                <div className="flex space-x-6">
                    <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-400 hover:neon-glow-primary transition-all">
                        <Github className="w-5 h-5" />
                    </a>
                    <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-secondary-400 hover:neon-glow-secondary transition-all">
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${data.contact.email}`} className="text-slate-400 hover:text-primary-400 hover:neon-glow-primary transition-all">
                        <Mail className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
