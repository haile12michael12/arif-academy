import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { FaGithub, FaLinkedin, FaHome, FaInfoCircle, FaBook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaInstagram, FaYoutube, FaFacebook, FaArrowUp, FaAccessibleIcon, FaGlobe, FaHeadset, FaShieldAlt, FaHandshake, FaUniversity } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BiWater } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { MdEmail, MdPhone, MdLocationOn, MdLanguage } from "react-icons/md";
import { motion } from "framer-motion";

// Additional resources links
const resourceLinks = [
    { id: 'blog', label: 'Blog', url: '/blog', icon: FaBook },
    { id: 'help', label: 'Help Center', url: '/help', icon: FaHeadset },
    { id: 'privacy', label: 'Privacy & Security', url: '/privacy', icon: FaShieldAlt },
    { id: 'partners', label: 'Partners', url: '/partners', icon: FaHandshake },
    { id: 'careers', label: 'Careers', url: '/careers', icon: FaUniversity }
];

// Language options
const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' }
];

const socialLinks = [
    { id: 'github', url: 'https://github.com/MeetDOD', icon: FaGithub, label: 'GitHub' },
    { id: 'linkedin', url: 'https://www.linkedin.com/in/meetdodiya', icon: FaLinkedin, label: 'LinkedIn' },
    { id: 'twitter', url: '#', icon: FaTwitter, label: 'Twitter' },
    { id: 'instagram', url: '#', icon: FaInstagram, label: 'Instagram' },
    { id: 'youtube', url: '#', icon: FaYoutube, label: 'YouTube' },
    { id: 'facebook', url: '#', icon: FaFacebook, label: 'Facebook' }
];

const quickLinks = [
    { id: 'home', label: 'Home', hash: '/', icon: FaHome },
    { id: 'courses', label: 'Courses', hash: '/courses', icon: FaBook },
    { id: 'about', label: 'About', hash: '/about', icon: FaInfoCircle },
    { id: 'riverflow', label: 'Riverflow', hash: '/riverflow', icon: BiWater },
    { id: 'pricing', label: 'Pricing', hash: '/pricing', icon: IoIosPricetags }
];

const services = [
    { id: 'resume', label: 'Resume Builder', description: 'Professional resume creation' },
    { id: 'interview', label: 'AI Interview', description: 'Mock interview practice' },
    { id: 'portfolio', label: 'Portfolio Builder', description: 'Create stunning portfolios' },
    { id: 'courses', label: 'AI Courses', description: 'Learn with AI assistance' },
    { id: 'coding', label: 'Coding Practice', description: 'Solve coding problems' },
    { id: 'insights', label: 'Career Insights', description: 'Industry knowledge' }
];

const contactInfo = [
    { id: 'email', icon: MdEmail, label: 'Email', value: 'contact@arifacademy.com', url: 'mailto:contact@arifacademy.com' },
    { id: 'phone', icon: MdPhone, label: 'Phone', value: '+1 (555) 123-4567', url: 'tel:+15551234567' },
    { id: 'location', icon: MdLocationOn, label: 'Location', value: 'New York, NY, USA', url: '#' }
];

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleLanguageChange = (code) => {
        setSelectedLanguage(code);
        setShowLanguageMenu(false);
        // In a real app, this would trigger language change in the app
        console.log(`Language changed to ${code}`);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <footer className="relative px-8 pt-16 pb-8 w-full font-montserrat mt-32 text-white bg-gradient-to-br from-black via-gray-900 to-black rounded-t-3xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            {/* Back to top button */}
            {showBackToTop && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300 hover:scale-110"
                    aria-label="Back to top"
                >
                    <FaArrowUp className="text-xl" />
                </motion.button>
            )}
            
            <div className="relative z-10 max-w-screen-2xl mx-auto">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="flex flex-col items-center md:items-start p-4 space-y-4 lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <img src={logo} alt="Logo" className="w-auto h-12" />
                            <h2 className="font-bold text-primary text-2xl">Arif Academy</h2>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed text-center md:text-left">
                            Empowering students to build professional portfolios, gain career insights, and connect with industry experts.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-3 bg-gray-800/50 rounded-full hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                                    title={link.label}
                                >
                                    <link.icon className="text-xl group-hover:text-primary transition-colors duration-300" />
                                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {link.label}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="p-4">
                        <h3 className="font-bold text-primary text-xl mb-6 flex items-center">
                            <span className="mr-2">🔗</span> Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        to={link.hash}
                                        className="group flex items-center space-x-3 text-gray-300 hover:text-primary transition-all duration-300 hover:translate-x-2"
                                    >
                                        <link.icon className="text-lg group-hover:scale-110 transition-transform duration-300" />
                                        <span className="relative">
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="p-4">
                        <h3 className="font-bold text-primary text-xl mb-6 flex items-center">
                            <span className="mr-2">⚡</span> Our Services
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {services.map((service) => (
                                <div key={service.id} className="group p-3 bg-gray-800/30 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:scale-105">
                                    <h4 className="font-semibold text-white group-hover:text-primary transition-colors duration-300">
                                        {service.label}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-1">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Resources */}
                    <div className="p-4">
                        <h3 className="font-bold text-primary text-xl mb-6 flex items-center">
                            <span className="mr-2">📚</span> Resources
                        </h3>
                        <ul className="space-y-3">
                            {resourceLinks.map((link) => (
                                <li key={link.id}>
                                    <Link
                                        to={link.url}
                                        className="group flex items-center space-x-3 text-gray-300 hover:text-primary transition-all duration-300 hover:translate-x-2"
                                    >
                                        <link.icon className="text-lg group-hover:scale-110 transition-transform duration-300" />
                                        <span className="relative">
                                            {link.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Newsletter */}
                    <div className="p-4 space-y-6">
                        {/* Contact Info */}
                        <div>
                            <h3 className="font-bold text-primary text-xl mb-6 flex items-center">
                                <span className="mr-2">📞</span> Contact Us
                            </h3>
                            <div className="space-y-3">
                                {contactInfo.map((contact) => (
                                    <a
                                        key={contact.id}
                                        href={contact.url}
                                        className="group flex items-center space-x-3 text-gray-300 hover:text-primary transition-all duration-300"
                                    >
                                        <contact.icon className="text-lg group-hover:scale-110 transition-transform duration-300" />
                                        <div>
                                            <p className="text-xs text-gray-500">{contact.label}</p>
                                            <p className="text-sm font-medium">{contact.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="font-bold text-primary text-xl mb-4 flex items-center">
                                <span className="mr-2">📧</span> Newsletter
                            </h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Stay updated with our latest courses and career tips!
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-white placeholder-gray-400 transition-all duration-300"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-primary text-white rounded-md hover:bg-primary/80 transition-all duration-300 hover:scale-105"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                                {isSubscribed && (
                                    <p className="text-green-400 text-sm animate-pulse">
                                        ✅ Successfully subscribed!
                                    </p>
                                )}
                            </form>
                        </div>
                        
                        {/* Language Selector */}
                        <div className="mt-6">
                            <h3 className="font-bold text-primary text-xl mb-4 flex items-center">
                                <span className="mr-2"><MdLanguage /></span> Language
                            </h3>
                            <div className="relative">
                                <button 
                                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                                    className="flex items-center justify-between w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white hover:border-primary transition-all duration-300"
                                >
                                    <span>{languages.find(lang => lang.code === selectedLanguage)?.name || 'English'}</span>
                                    <FaGlobe />
                                </button>
                                
                                {showLanguageMenu && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-xl overflow-hidden"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => handleLanguageChange(lang.code)}
                                                className={`w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors duration-200 ${selectedLanguage === lang.code ? 'bg-primary/20 text-primary' : 'text-white'}`}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                {/* Accessibility Statement */}
                <div className="border-t border-gray-800 pt-8 pb-6">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <FaAccessibleIcon className="text-primary text-xl" />
                        <h3 className="font-bold text-white text-lg">Accessibility Statement</h3>
                    </div>
                    <p className="text-gray-300 text-sm text-center max-w-3xl mx-auto">
                        Arif Academy is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards to ensure we provide equal access to all users.
                    </p>
                </div>
                
                {/* Bottom section */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-400">
                                Made with <span className='text-red-500 text-xl animate-pulse'>❤</span> by Arif Academy
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Copyright © 2025 All rights reserved by{' '}
                                <span className='text-primary font-bold'>Meet, hailemichael assefa</span>
                            </p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                Cookie Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                Sitemap
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                GDPR
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;