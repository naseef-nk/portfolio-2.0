import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import GitHubSection from '../components/GitHub';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <Navbar />
            <main className="flex-grow pt-16">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <GitHubSection />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default Home;
