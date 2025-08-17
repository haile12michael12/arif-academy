import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaBriefcase, FaCertificate, FaChartLine } from 'react-icons/fa';

const LearningPath = () => {
    const pathSteps = [
        {
            icon: <FaGraduationCap className="text-3xl text-blue-500" />,
            title: "Skill Assessment",
            description: "Evaluate your current skills and identify areas for improvement",
            color: "from-blue-500 to-blue-300"
        },
        {
            icon: <FaLaptopCode className="text-3xl text-purple-500" />,
            title: "Personalized Learning",
            description: "Follow AI-generated courses tailored to your skill gaps and goals",
            color: "from-purple-500 to-purple-300"
        },
        {
            icon: <FaCertificate className="text-3xl text-green-500" />,
            title: "Practice & Projects",
            description: "Apply your knowledge through coding challenges and portfolio projects",
            color: "from-green-500 to-green-300"
        },
        {
            icon: <FaBriefcase className="text-3xl text-amber-500" />,
            title: "Interview Preparation",
            description: "Practice with AI mock interviews specific to your target roles",
            color: "from-amber-500 to-amber-300"
        },
        {
            icon: <FaChartLine className="text-3xl text-red-500" />,
            title: "Career Launch",
            description: "Get matched with job opportunities aligned with your skills",
            color: "from-red-500 to-red-300"
        }
    ];

    return (
        <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Your <span className="text-primary">Learning Journey</span> With Us
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Follow our structured learning path designed to take you from beginner to job-ready professional
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Path line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500 transform -translate-x-1/2 hidden md:block"></div>
                    
                    <div className="space-y-12 md:space-y-0">
                        {pathSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} relative z-10`}
                            >
                                <div className={`w-full md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} justify-center`}>
                                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md w-full border-t-4 border-primary">
                                        <div className="flex items-center mb-4">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${step.color} mr-4 shadow-md`}>
                                                {step.icon}
                                            </div>
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                        </div>
                                        <p className="text-gray-600">{step.description}</p>
                                    </div>
                                </div>
                                
                                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-primary z-20 my-4 md:my-0">
                                    <span className="font-bold text-primary">{index + 1}</span>
                                </div>
                                
                                <div className="md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-700 text-white font-bold rounded-full hover:shadow-lg transform transition hover:-translate-y-1">
                        Start Your Learning Journey
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default LearningPath;