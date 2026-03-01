import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogOut, Home, User, Code, FolderGit2, Mail, X } from 'lucide-react';

const AdminDashboard = () => {
    const { data, updateData, isAdminAuth, logoutAdmin } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('hero');

    // Local state for forms
    const [heroData, setHeroData] = useState(data.hero);
    const [aboutData, setAboutData] = useState(data.about);
    const [skillsData, setSkillsData] = useState({
        frontend: data.skills.frontend.join(', '),
        backend: data.skills.backend.join(', '),
        database: data.skills.database.join(', '),
        tools: data.skills.tools.join(', ')
    });
    const [projectsData, setProjectsData] = useState(data.projects);
    const [contactData, setContactData] = useState(data.contact);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
    };

    const handleSave = (fn, sectionName) => {
        try {
            fn();
            showNotification(`${sectionName} saved successfully!`, 'success');
        } catch (error) {
            console.error(error);
            showNotification(`Failed to save ${sectionName}`, 'error');
        }
    };

    useEffect(() => {
        if (!isAdminAuth) {
            navigate('/admin');
        }
    }, [isAdminAuth, navigate]);

    if (!isAdminAuth) return null;

    const handleLogout = () => {
        logoutAdmin();
        navigate('/');
    };

    const saveHero = () => handleSave(() => updateData('hero', heroData), 'Hero Section');
    const saveAbout = () => handleSave(() => updateData('about', aboutData), 'About Section');
    const saveSkills = () => {
        handleSave(() => {
            updateData('skills', {
                frontend: skillsData.frontend.split(',').map(s => s.trim()).filter(Boolean),
                backend: skillsData.backend.split(',').map(s => s.trim()).filter(Boolean),
                database: skillsData.database.split(',').map(s => s.trim()).filter(Boolean),
                tools: skillsData.tools.split(',').map(s => s.trim()).filter(Boolean)
            });
        }, 'Skills');
    };
    const saveProjects = () => handleSave(() => updateData('projects', projectsData), 'Projects');
    const saveContact = () => handleSave(() => updateData('contact', contactData), 'Contact Info');

    const handleProjectEdit = (id, field, value) => {
        setProjectsData(projectsData.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    const handleProjectTechEdit = (id, value) => {
        setProjectsData(projectsData.map(p =>
            p.id === id ? { ...p, tech: value.split(',').map(t => t.trim()).filter(Boolean) } : p
        ));
    };

    const handleImageUpload = (e, callback) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                callback(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProject = () => {
        const newId = projectsData.length > 0 ? Math.max(...projectsData.map(p => p.id)) + 1 : 1;
        setProjectsData([...projectsData, {
            id: newId,
            name: "New Project",
            description: "Short description",
            tech: ["React"],
            github: "#",
            live: "#",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
        }]);
    };

    const handleDeleteProject = (id) => {
        setProjectsData(projectsData.filter(p => p.id !== id));
    };

    const tabs = [
        { id: 'hero', label: 'Hero Section', icon: <Home className="w-5 h-5" /> },
        { id: 'about', label: 'About Me', icon: <User className="w-5 h-5" /> },
        { id: 'skills', label: 'Skills', icon: <Code className="w-5 h-5" /> },
        { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-5 h-5" /> },
        { id: 'contact', label: 'Contact Info', icon: <Mail className="w-5 h-5" /> }
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-auto md:h-screen sticky top-0">
                <div className="p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white tracking-wider flex items-center gap-2">
                        <span className="text-primary-400">Admin</span> Panel
                    </h2>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeTab === tab.id
                                ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                                : 'hover:bg-slate-800 text-slate-400 hover:text-white border border-transparent'
                                }`}
                        >
                            {tab.icon}
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors border border-slate-700 hover:border-red-500/30"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto h-screen bg-slate-950">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">
                                Edit {tabs.find(t => t.id === activeTab)?.label}
                            </h1>
                            <p className="text-slate-400">
                                Changes made here will instantly reflect on your live portfolio.
                            </p>
                        </div>
                        <button
                            onClick={() => window.open('/', '_blank')}
                            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium border border-slate-700 transition-colors self-start sm:self-auto"
                        >
                            View Live Site
                        </button>
                    </header>

                    <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
                        {/* HERO TAB */}
                        {activeTab === 'hero' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={heroData.name}
                                        onChange={e => setHeroData({ ...heroData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Role Title</label>
                                    <input
                                        type="text"
                                        value={heroData.role}
                                        onChange={e => setHeroData({ ...heroData, role: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Short Intro</label>
                                    <textarea
                                        rows="4"
                                        value={heroData.intro}
                                        onChange={e => setHeroData({ ...heroData, intro: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white resize-y"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Resume Upload (PDF/Image)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,image/*"
                                        onChange={e => handleImageUpload(e, (base64) => setHeroData({ ...heroData, resumeUrl: base64 }))}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500"
                                    />
                                    {heroData.resumeUrl && <p className="text-xs text-green-400 mt-2">Resume is currently uploaded.</p>}
                                </div>
                                <button
                                    onClick={saveHero}
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors shadow-lg"
                                >
                                    Save Hero Changes
                                </button>
                            </div>
                        )}

                        {/* ABOUT TAB */}
                        {activeTab === 'about' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">About Content</label>
                                    <textarea
                                        rows="8"
                                        value={aboutData.content}
                                        onChange={e => setAboutData({ ...aboutData, content: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white resize-y"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Profile Image Upload</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={e => handleImageUpload(e, (base64) => setAboutData({ ...aboutData, image: base64 }))}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500"
                                    />
                                    {aboutData.image && (
                                        <div className="mt-4 flex flex-col gap-3">
                                            <div className="relative w-32 h-32 group">
                                                <img src={aboutData.image} alt="Profile Preview" className="w-full h-full object-cover rounded-xl border border-slate-700" />
                                                <button
                                                    onClick={() => setAboutData({ ...aboutData, image: '' })}
                                                    className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-500 transition-colors border border-red-700"
                                                    title="Remove Image"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-slate-500 italic">Click the 'X' to remove this image</p>
                                        </div>
                                    )}
                                </div>
                                <button
                                    onClick={saveAbout}
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors shadow-lg"
                                >
                                    Save About Changes
                                </button>
                            </div>
                        )}

                        {/* SKILLS TAB */}
                        {activeTab === 'skills' && (
                            <div className="space-y-6">
                                <p className="text-sm text-amber-400 bg-amber-400/10 p-3 rounded-lg border border-amber-400/20 mb-6">
                                    Enter skills separated by commas (e.g., React, Node.js, Express)
                                </p>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Frontend</label>
                                    <input
                                        type="text"
                                        value={skillsData.frontend}
                                        onChange={e => setSkillsData({ ...skillsData, frontend: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Backend</label>
                                    <input
                                        type="text"
                                        value={skillsData.backend}
                                        onChange={e => setSkillsData({ ...skillsData, backend: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Database</label>
                                    <input
                                        type="text"
                                        value={skillsData.database}
                                        onChange={e => setSkillsData({ ...skillsData, database: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Tools / Others</label>
                                    <input
                                        type="text"
                                        value={skillsData.tools}
                                        onChange={e => setSkillsData({ ...skillsData, tools: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <button
                                    onClick={saveSkills}
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors shadow-lg mt-4"
                                >
                                    Save Skills Changes
                                </button>
                            </div>
                        )}

                        {/* PROJECTS TAB */}
                        {activeTab === 'projects' && (
                            <div className="space-y-10">
                                {projectsData.map((project, index) => (
                                    <div key={project.id} className="p-6 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                                        <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-2">
                                            Project #{index + 1}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">Project Name</label>
                                                <input
                                                    type="text"
                                                    value={project.name}
                                                    onChange={e => handleProjectEdit(project.id, 'name', e.target.value)}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">Image URL</label>
                                                <input
                                                    type="text"
                                                    value={project.image}
                                                    onChange={e => handleProjectEdit(project.id, 'image', e.target.value)}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs text-slate-500 mb-1">Description</label>
                                                <textarea
                                                    rows="2"
                                                    value={project.description}
                                                    onChange={e => handleProjectEdit(project.id, 'description', e.target.value)}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm resize-y"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-xs text-slate-500 mb-1">Tech Stack (comma separated)</label>
                                                <input
                                                    type="text"
                                                    value={project.tech.join(', ')}
                                                    onChange={e => handleProjectTechEdit(project.id, e.target.value)}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">GitHub URL</label>
                                                <input
                                                    type="text"
                                                    value={project.github}
                                                    onChange={e => handleProjectEdit(project.id, 'github', e.target.value)}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-slate-500 mb-1">Live URL</label>
                                                <input
                                                    type="text"
                                                    value={project.live}
                                                    onChange={e => handleProjectEdit(project.id, 'live', e.target.value)}
                                                    className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs text-slate-500 mb-1">Upload Project Cover</label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => handleImageUpload(e, (base64) => handleProjectEdit(project.id, 'image', base64))}
                                                    className="flex-1 text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-600 file:text-white hover:file:bg-primary-500"
                                                />
                                                {project.image && (
                                                    <button
                                                        onClick={() => handleProjectEdit(project.id, 'image', '')}
                                                        className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-colors border border-red-500/20"
                                                    >
                                                        Remove Image
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 flex justify-end">
                                            <button
                                                onClick={() => handleDeleteProject(project.id)}
                                                className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors text-sm border border-red-600/30"
                                            >
                                                Delete Project
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={handleAddProject}
                                        className="px-6 py-3 border border-primary-500 text-primary-400 hover:bg-primary-500/10 font-medium rounded-lg transition-colors shadow-lg"
                                    >
                                        + Add New Project
                                    </button>
                                    <button
                                        onClick={saveProjects}
                                        className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors shadow-lg"
                                    >
                                        Save All Projects
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* CONTACT TAB */}
                        {activeTab === 'contact' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={contactData.email}
                                        onChange={e => setContactData({ ...contactData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">LinkedIn URL</label>
                                    <input
                                        type="url"
                                        value={contactData.linkedin}
                                        onChange={e => setContactData({ ...contactData, linkedin: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">GitHub URL</label>
                                    <input
                                        type="url"
                                        value={contactData.github}
                                        onChange={e => setContactData({ ...contactData, github: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">Phone (Optional)</label>
                                    <input
                                        type="tel"
                                        value={contactData.phone}
                                        onChange={e => setContactData({ ...contactData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                                    />
                                </div>
                                <button
                                    onClick={saveContact}
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg transition-colors shadow-lg mt-4"
                                >
                                    Save Contact Changes
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Notification Toast */}
            {notification.show && (
                <div className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl border transition-all transform animate-in fade-in slide-in-from-bottom-5 duration-300 z-[100] ${notification.type === 'success'
                    ? 'bg-green-500/10 border-green-500/50 text-green-400'
                    : 'bg-red-500/10 border-red-500/50 text-red-400'
                    }`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <p className="font-medium">{notification.message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
