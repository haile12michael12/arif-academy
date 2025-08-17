import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaMedal, FaChartLine, FaUsers, FaGem } from 'react-icons/fa';

const GamifiedLearning = () => {
    const gamificationFeatures = [
        {
            icon: <FaTrophy className="text-yellow-500" />,
            title: "Achievement Badges",
            description: "Earn badges for completing courses, mastering skills, and helping others"
        },
        {
            icon: <FaChartLine className="text-blue-500" />,
            title: "Progress Tracking",
            description: "Visualize your learning journey with interactive progress dashboards"
        },
        {
            icon: <FaMedal className="text-purple-500" />,
            title: "Skill Levels",
            description: "Level up your skills from beginner to expert through practical challenges"
        },
        {
            icon: <FaUsers className="text-green-500" />,
            title: "Leaderboards",
            description: "Compete with peers and climb the ranks in various learning categories"
        },
        {
            icon: <FaGem className="text-red-500" />,
            title: "Reward Points",
            description: "Earn points redeemable for premium content, mentorship sessions, and more"
        }
    ];

    // Sample leaderboard data
    const leaderboardData = [
        { name: "Alex Johnson", points: 1250, badges: 8, rank: 1 },
        { name: "Maria Garcia", points: 1120, badges: 7, rank: 2 },
        { name: "David Kim", points: 980, badges: 6, rank: 3 },
        { name: "Sarah Ahmed", points: 870, badges: 5, rank: 4 },
        { name: "James Wilson", points: 760, badges: 4, rank: 5 }
    ];

    return (
        <div className="py-16 bg-gradient-to-br from-purple-50 via-white to-indigo-50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                        <span className="text-primary">Gamified</span> Learning Experience
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Make learning fun and engaging with our gamification features that reward your progress and achievements
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Features */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {gamificationFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-primary group hover:-translate-y-1"
                            >
                                <div className="p-3 bg-gray-100 rounded-full text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                    <p className="text-gray-600">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right side - Leaderboard */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
                    >
                        <div className="bg-gradient-to-r from-primary to-purple-700 text-white p-6">
                            <h3 className="text-2xl font-bold mb-2">Top Learners This Week</h3>
                            <p>Compete with peers and earn rewards for your achievements</p>
                        </div>
                        
                        <div className="p-6">
                            <div className="space-y-4">
                                {leaderboardData.map((user, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className={`flex items-center justify-between p-4 rounded-lg ${index === 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-100'}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-700' : 'bg-primary/20'} ${index < 3 ? 'text-white' : 'text-gray-700'}`}>
                                                {user.rank}
                                            </div>
                                            <div>
                                                <h4 className="font-bold">{user.name}</h4>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span>{user.badges} badges</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-primary">{user.points} pts</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            <div className="mt-6 text-center">
                                <button className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300">
                                    View Full Leaderboard
                                </button>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 p-6 border-t border-gray-200">
                            <h4 className="font-bold text-lg mb-3">Your Progress</h4>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Course Completion</span>
                                        <span>65%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-primary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Skill Level</span>
                                        <span>Intermediate</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Weekly Goal</span>
                                        <span>3/5 days</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block bg-gradient-to-r from-primary/10 to-purple-500/10 p-8 rounded-2xl">
                        <h3 className="text-2xl font-bold mb-4">Ready to Make Learning Fun?</h3>
                        <p className="text-lg text-gray-600 mb-6">Join thousands of students who are learning while competing and earning rewards</p>
                        <button className="px-8 py-3 bg-gradient-to-r from-primary to-purple-700 text-white font-bold rounded-full hover:shadow-lg transform transition hover:-translate-y-1">
                            Start Earning Rewards
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GamifiedLearning;