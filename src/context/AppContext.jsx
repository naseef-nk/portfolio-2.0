import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

// Initial Data
const defaultData = {
    hero: {
        name: "Naseef N.K",
        role: "Full Stack MERN Developer",
        resumeUrl: "/resume.pdf",
        intro: "A Full Stack MERN Developer passionate about building scalable and high-performance web applications. I love turning ideas into real-world products."
    },
    about: {
        content: "I'm a passionate developer focused on building modern web applications using the MERN stack. Currently learning advanced backend architecture and scalable system design. I enjoy solving real-world problems and continuously improving my coding skills. My goal is to become a highly skilled full stack engineer working on impactful products.",
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800"
    },
    skills: {
        frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS", "Bootstrap"],
        backend: ["Node.js", "Express.js", "REST APIs"],
        database: ["MongoDB", "Mongoose"],
        tools: ["Git", "GitHub", "Postman", "VS Code"]
    },
    projects: [
        {
            id: 1,
            name: "E-Commerce App",
            description: "Full-featured e-commerce platform with authentication, cart, and payment integration.",
            tech: ["React", "Node.js", "Express", "MongoDB"],
            github: "#",
            live: "#",
            image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            name: "Task Manager App",
            description: "A productivity app to manage daily tasks with CRUD functionality.",
            tech: ["React", "Node.js", "MongoDB"],
            github: "#",
            live: "#",
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            name: "Portfolio Website",
            description: "Personal portfolio built using React with modern UI design.",
            tech: ["React", "Tailwind CSS"],
            github: "#",
            live: "#",
            image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800"
        }
    ],
    contact: {
        email: "hello@example.com",
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        phone: ""
    }
};

export const AppProvider = ({ children }) => {
    const [data, setData] = useState(() => {
        const saved = localStorage.getItem('portfolioData');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return defaultData;
            }
        }
        return defaultData;
    });

    const [isAdminAuth, setIsAdminAuth] = useState(() => {
        return localStorage.getItem('isAdminAuth') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('portfolioData', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        localStorage.setItem('isAdminAuth', isAdminAuth);
    }, [isAdminAuth]);

    const updateData = (section, payload) => {
        setData(prev => ({
            ...prev,
            [section]: payload
        }));
    };

    const loginAdmin = (password) => {
        if (password === "Naseef@123") {
            setIsAdminAuth(true);
            return true;
        }
        return false;
    };

    const logoutAdmin = () => {
        setIsAdminAuth(false);
    };

    return (
        <AppContext.Provider value={{ data, updateData, isAdminAuth, loginAdmin, logoutAdmin }}>
            {children}
        </AppContext.Provider>
    );
};
