import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaComments, FaLightbulb, FaHandsHelping, FaStar } from 'react-icons/fa';

const CommunityForum = () => {
    const forumFeatures = [
        {
            icon: <FaUsers className="text-2xl text-blue-500" />,
            title: "Connect with Peers",
            description: "Join a community of like-minded learners and professionals"
        },
        {
            icon: <FaComments className="text-2xl text-purple-500" />,
            title: "Discussion Boards",
            description: "Engage in topic-specific conversations and knowledge sharing"
        },
        {
            icon: <FaLightbulb className="text-2xl text-amber-500" />,
            title: "Study Groups",
            description: "Form or join study groups for collaborative learning experiences"
        },
        {
            icon: <FaHandsHelping className="text-2xl text-green-500" />,
            title: "Mentorship",
            description: "Connect with industry mentors for guidance and career advice"
        },
        {
            icon: <FaStar className="text-2xl text-red-500" />,
            title: "Showcase Projects",
            description: "Share your work and get constructive feedback from the community"
        }
    ];

    // Sample recent discussions
    const recentDiscussions = [
        {
            title: "Best practices for React state management in 2023",
            author: "Sarah Johnson",
            replies: 24,
            category: "Web Development"
        },
        {
            title: "How to prepare for AI engineering interviews",
            author: "Michael Chen",
            replies: 18,
            category: "Career Advice"
        },
        {
            title: "Resources for learning data structures and algorithms",
            author: "Priya Patel",
            replies: 32,
            category: "Computer Science"
        }
    ];

    return (
        <div className="py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Join Our <span className="text-primary">Learning Community</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Connect with fellow learners, share knowledge, and accelerate your growth through collaborative learning
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Left side - Forum features */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2 inline-block">
                            Community Features
                        </h3>
                        
                        {forumFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-start p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-primary"
                            >
                                <div className="mr-4 p-3 rounded-full bg-gray-100">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">{feature.title}</h4>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right side - Recent discussions */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                    >
                        <h3 className="text-2xl font-bold mb-6 border-b-2 border-primary pb-2 inline-block">
                            Recent Discussions
                        </h3>
                        
                        <div className="space-y-4">
                            {recentDiscussions.map((discussion, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-lg text-primary hover:text-primary/80 cursor-pointer">
                                            {discussion.title}
                                        </h4>
                                        <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                                            {discussion.category}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm text-gray-500">
                                        <span>By {discussion.author}</span>
                                        <span>{discussion.replies} replies</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-6 text-center">
                            <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300">
                                View All Discussions
                            </button>
                        </div>
                        
                        <div className="mt-8 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                            <h4 className="font-bold text-lg mb-2">Join the Conversation</h4>
                            <p className="text-gray-700 mb-4">Share your knowledge, ask questions, and connect with peers in your field.</p>
                            <button className="px-4 py-2 bg-white text-primary border border-primary rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                Start a New Discussion
                            </button>
                        </div>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-700 text-white font-bold rounded-full hover:shadow-lg transform transition hover:-translate-y-1">
                        Join Our Community
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default CommunityForum;