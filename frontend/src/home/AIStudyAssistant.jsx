import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaBook, FaQuestion, FaLightbulb, FaChartLine } from 'react-icons/fa';

const AIStudyAssistant = () => {
    const assistantFeatures = [
        {
            icon: <FaBook />,
            title: "Study Material Summarization",
            description: "Get concise summaries of lengthy study materials and textbooks"
        },
        {
            icon: <FaQuestion />,
            title: "24/7 Question Answering",
            description: "Ask questions anytime and receive instant, accurate responses"
        },
        {
            icon: <FaLightbulb />,
            title: "Personalized Explanations",
            description: "Receive explanations tailored to your learning style and pace"
        },
        {
            icon: <FaChartLine />,
            title: "Progress Tracking",
            description: "Monitor your understanding and identify knowledge gaps"
        }
    ];

    return (
        <div className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - Assistant visualization */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <div className="relative">
                            {/* Main assistant circle */}
                            <div className="w-64 h-64 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <FaRobot className="text-white text-7xl" />
                            </div>
                            
                            {/* Orbiting elements */}
                            {assistantFeatures.map((feature, index) => {
                                const angle = (index * (360 / assistantFeatures.length)) * (Math.PI / 180);
                                const radius = 160; // Distance from center
                                const x = radius * Math.cos(angle);
                                const y = radius * Math.sin(angle);
                                
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                        className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-primary text-2xl"
                                        style={{
                                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                                        }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                );
                            })}
                            
                            {/* Connecting lines */}
                            <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
                                {assistantFeatures.map((_, index) => {
                                    const angle = (index * (360 / assistantFeatures.length)) * (Math.PI / 180);
                                    const radius = 160;
                                    const x = radius * Math.cos(angle);
                                    const y = radius * Math.sin(angle);
                                    
                                    return (
                                        <motion.line
                                            key={index}
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            transition={{ duration: 1, delay: 0.2 * index }}
                                            viewport={{ once: true }}
                                            x1="50%"
                                            y1="50%"
                                            x2={`calc(50% + ${x}px)`}
                                            y2={`calc(50% + ${y}px)`}
                                            stroke="#7c3aed"
                                            strokeWidth="2"
                                            strokeDasharray="5,5"
                                        />
                                    );
                                })}
                            </svg>
                        </div>
                    </motion.div>
                    
                    {/* Right side - Text content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
                            Meet Your <span className="text-primary">AI Study Assistant</span>
                        </h2>
                        
                        <p className="text-lg text-gray-600 mb-8">
                            Our AI-powered study assistant helps you learn more efficiently by providing instant help, 
                            summarizing complex materials, and adapting to your unique learning style.
                        </p>
                        
                        <div className="space-y-6">
                            {assistantFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-3 bg-primary/10 rounded-full text-primary text-xl">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{feature.title}</h3>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="mt-8"
                        >
                            <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-700 text-white font-bold rounded-full hover:shadow-lg transform transition hover:-translate-y-1">
                                Try AI Assistant Now
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
                
                {/* Chat demo */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200"
                >
                    <div className="bg-primary text-white p-4">
                        <h3 className="font-bold">AI Study Assistant</h3>
                    </div>
                    
                    <div className="p-4 max-h-80 overflow-y-auto space-y-4">
                        {/* User message */}
                        <div className="flex justify-end">
                            <div className="bg-primary/10 text-gray-800 p-3 rounded-lg rounded-tr-none max-w-xs">
                                <p>Can you explain how neural networks work in simple terms?</p>
                            </div>
                        </div>
                        
                        {/* AI response */}
                        <div className="flex">
                            <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs">
                                <p>Think of a neural network like a team of people passing notes. Each person (neuron) gets information, decides how important it is, and passes it along. Through training, they learn which information matters most for solving a specific problem.</p>
                            </div>
                        </div>
                        
                        {/* User message */}
                        <div className="flex justify-end">
                            <div className="bg-primary/10 text-gray-800 p-3 rounded-lg rounded-tr-none max-w-xs">
                                <p>That makes sense! Can you give me a real-world example?</p>
                            </div>
                        </div>
                        
                        {/* AI response */}
                        <div className="flex">
                            <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none max-w-xs">
                                <p>Sure! Imagine teaching a neural network to recognize cats in photos. It learns to identify whiskers, pointy ears, and other cat features. After seeing thousands of examples, it can recognize cats in new photos it's never seen before.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Ask your study question..." 
                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                                Send
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AIStudyAssistant;