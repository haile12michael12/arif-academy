import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { FaGithub, FaLinkedin, FaHome, FaInfoCircle, FaBook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { BiWater } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

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

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    return (
        <footer className="relative px-8 pt-16 pb-8 w-full font-montserrat mt-32 text-white bg-gradient-to-br from-black via-gray-900 to-black rounded-t-3xl overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            
            <div className="relative z-10 max-w-screen-2xl mx-auto">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="flex flex-col items-center md:items-start p-4 space-y-4">
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
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-gray-400">
                                Made with <span className='text-xl animate-pulse'></span> by Arif Academy
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                Copyright © 2025 All rights reserved by{' '}
                                <span className='text-primary font-bold'>Meet, hailemichael assefa</span>
                            </p>
                        </div>
                        
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;