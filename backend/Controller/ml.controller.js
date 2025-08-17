const { User } = require('../Models/user.model');
const Course = require('../Models/usercourse.model');
const axios = require('axios');

// Advanced ML-based course recommendation system
const getPersonalizedRecommendations = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate('enrolledCourses.course');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Extract user's learning patterns and preferences
        const userTechStack = user.techstack || [];
        const enrolledCourses = user.enrolledCourses || [];
        const completedCourseIds = enrolledCourses
            .filter(enrollment => enrollment.progress >= 80)
            .map(enrollment => enrollment.course._id);
        
        // Get user's course progress data
        const inProgressCourses = enrolledCourses
            .filter(enrollment => enrollment.progress > 0 && enrollment.progress < 80)
            .map(enrollment => ({
                id: enrollment.course._id,
                progress: enrollment.progress,
                category: enrollment.course.category,
                topic: enrollment.course.topic,
                level: enrollment.course.courseLevel
            }));

        // Calculate user's learning preferences
        const categoryPreferences = {};
        const topicPreferences = {};
        const levelPreferences = {};

        inProgressCourses.forEach(course => {
            // Weight by progress - higher progress means stronger preference
            const weight = course.progress / 100;
            
            // Update category preferences
            if (course.category) {
                categoryPreferences[course.category] = (categoryPreferences[course.category] || 0) + weight;
            }
            
            // Update topic preferences
            if (course.topic) {
                topicPreferences[course.topic] = (topicPreferences[course.topic] || 0) + weight;
            }
            
            // Update level preferences
            if (course.level) {
                levelPreferences[course.level] = (levelPreferences[course.level] || 0) + weight;
            }
        });

        // Get top preferences
        const getTopPreferences = (preferences, count = 3) => {
            return Object.entries(preferences)
                .sort((a, b) => b[1] - a[1])
                .slice(0, count)
                .map(entry => entry[0]);
        };

        const topCategories = getTopPreferences(categoryPreferences);
        const topTopics = getTopPreferences(topicPreferences);
        const topLevels = getTopPreferences(levelPreferences);

        // Build query for recommendations
        const query = {
            $and: [
                { _id: { $nin: completedCourseIds } }, // Exclude completed courses
                {
                    $or: [
                        // Match by tech stack
                        ...userTechStack.map(tech => ({
                            $or: [
                                { courseName: { $regex: tech, $options: 'i' } },
                                { description: { $regex: tech, $options: 'i' } },
                                { category: { $regex: tech, $options: 'i' } },
                                { topic: { $regex: tech, $options: 'i' } }
                            ]
                        })),
                        // Match by preferred categories
                        ...topCategories.map(category => ({ category })),
                        // Match by preferred topics
                        ...topTopics.map(topic => ({ topic })),
                        // Match by preferred levels
                        ...topLevels.map(level => ({ courseLevel: level }))
                    ]
                }
            ]
        };

        // Find recommendations
        let recommendations = await Course.find(query).limit(10);

        // If not enough recommendations, get trending courses
        if (recommendations.length < 5) {
            const trendingCourses = await Course.find({
                _id: { $nin: [...completedCourseIds, ...recommendations.map(c => c._id)] }
            }).limit(10 - recommendations.length);
            
            recommendations = [...recommendations, ...trendingCourses];
        }

        // Calculate personalized relevance score for sorting
        const scoredRecommendations = recommendations.map(course => {
            let score = 0;
            
            // Score based on tech stack match
            userTechStack.forEach(tech => {
                const regex = new RegExp(tech, 'i');
                if (regex.test(course.courseName)) score += 3;
                if (regex.test(course.description)) score += 2;
                if (regex.test(course.category)) score += 2;
                if (regex.test(course.topic)) score += 2;
            });
            
            // Score based on category preference
            if (topCategories.includes(course.category)) {
                score += 3 * (1 - topCategories.indexOf(course.category) / topCategories.length);
            }
            
            // Score based on topic preference
            if (topTopics.includes(course.topic)) {
                score += 3 * (1 - topTopics.indexOf(course.topic) / topTopics.length);
            }
            
            // Score based on level preference
            if (topLevels.includes(course.courseLevel)) {
                score += 2 * (1 - topLevels.indexOf(course.courseLevel) / topLevels.length);
            }
            
            return {
                ...course.toObject(),
                relevanceScore: score
            };
        });

        // Sort by relevance score
        scoredRecommendations.sort((a, b) => b.relevanceScore - a.relevanceScore);

        res.status(200).json({ 
            recommendations: scoredRecommendations,
            userPreferences: {
                techStack: userTechStack,
                categories: topCategories,
                topics: topTopics,
                levels: topLevels
            }
        });
    } catch (error) {
        console.error('Error generating personalized recommendations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Content-based filtering for similar courses
const getSimilarCourses = async (req, res) => {
    try {
        const { courseId } = req.params;
        
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Extract key features for similarity matching
        const { category, topic, courseLevel, description } = course;
        
        // Build query for similar courses
        const query = {
            _id: { $ne: courseId }, // Exclude the current course
            $or: [
                { category },
                { topic },
                { courseLevel },
                // Text similarity in description
                { description: { $regex: topic, $options: 'i' } }
            ]
        };
        
        const similarCourses = await Course.find(query).limit(5);
        
        res.status(200).json({ similarCourses });
    } catch (error) {
        console.error('Error finding similar courses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Learning path generation based on career goals
const generateLearningPath = async (req, res) => {
    try {
        const { careerGoal } = req.body;
        const userId = req.user._id;
        
        if (!careerGoal) {
            return res.status(400).json({ message: 'Career goal is required' });
        }
        
        // Get user's current skills and enrolled courses
        const user = await User.findById(userId).populate('enrolledCourses.course');
        const userSkills = user.techstack || [];
        const enrolledCourseIds = user.enrolledCourses.map(e => e.course._id);
        
        // Define skill requirements for different career paths
        const careerPaths = {
            'frontend': ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Angular', 'UI/UX', 'Responsive Design'],
            'backend': ['Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Databases', 'API Design', 'Authentication'],
            'fullstack': ['JavaScript', 'React', 'Node.js', 'Express', 'Databases', 'API Design', 'Authentication', 'Deployment'],
            'data-science': ['Python', 'R', 'Statistics', 'Machine Learning', 'Data Visualization', 'SQL', 'Big Data'],
            'devops': ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Services', 'Monitoring', 'Security'],
            'mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Mobile UI Design', 'App Deployment'],
            'ai-ml': ['Python', 'TensorFlow', 'PyTorch', 'Neural Networks', 'NLP', 'Computer Vision', 'Deep Learning']
        };
        
        // Find the closest career path if exact match not found
        let targetSkills = [];
        if (careerPaths[careerGoal.toLowerCase()]) {
            targetSkills = careerPaths[careerGoal.toLowerCase()];
        } else {
            // Find courses related to the career goal
            const relatedCourses = await Course.find({
                $or: [
                    { courseName: { $regex: careerGoal, $options: 'i' } },
                    { description: { $regex: careerGoal, $options: 'i' } },
                    { category: { $regex: careerGoal, $options: 'i' } },
                    { topic: { $regex: careerGoal, $options: 'i' } }
                ]
            }).limit(10);
            
            // Extract skills from related courses
            const skillsFromCourses = new Set();
            relatedCourses.forEach(course => {
                const words = `${course.courseName} ${course.description} ${course.topic}`.split(/\s+/);
                words.forEach(word => {
                    if (word.length > 3 && /^[A-Z]/.test(word)) {
                        skillsFromCourses.add(word);
                    }
                });
            });
            
            targetSkills = Array.from(skillsFromCourses);
        }
        
        // Identify missing skills
        const missingSkills = targetSkills.filter(skill => !userSkills.includes(skill));
        
        // Find courses that teach the missing skills
        const skillCourses = [];
        for (const skill of missingSkills) {
            const courses = await Course.find({
                _id: { $nin: enrolledCourseIds },
                $or: [
                    { courseName: { $regex: skill, $options: 'i' } },
                    { description: { $regex: skill, $options: 'i' } },
                    { topic: { $regex: skill, $options: 'i' } }
                ]
            }).limit(2);
            
            courses.forEach(course => {
                skillCourses.push({
                    ...course.toObject(),
                    targetSkill: skill
                });
            });
        }
        
        // Organize courses into a learning path
        const beginnerCourses = skillCourses.filter(course => course.courseLevel === 'Beginner');
        const intermediateCourses = skillCourses.filter(course => course.courseLevel === 'Intermediate');
        const advancedCourses = skillCourses.filter(course => course.courseLevel === 'Advanced');
        
        const learningPath = {
            careerGoal,
            currentSkills: userSkills,
            targetSkills,
            missingSkills,
            pathStages: [
                {
                    name: 'Foundation',
                    description: 'Master the fundamental skills',
                    courses: beginnerCourses.slice(0, 3)
                },
                {
                    name: 'Building Expertise',
                    description: 'Develop intermediate knowledge',
                    courses: intermediateCourses.slice(0, 3)
                },
                {
                    name: 'Advanced Mastery',
                    description: 'Become an expert in your field',
                    courses: advancedCourses.slice(0, 3)
                }
            ]
        };
        
        res.status(200).json({ learningPath });
    } catch (error) {
        console.error('Error generating learning path:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Skill gap analysis
const analyzeSkillGap = async (req, res) => {
    try {
        const userId = req.user._id;
        const { jobDescription } = req.body;
        
        if (!jobDescription) {
            return res.status(400).json({ message: 'Job description is required' });
        }
        
        // Get user's current skills
        const user = await User.findById(userId);
        const userSkills = user.techstack || [];
        
        // Extract skills from job description
        // This is a simplified approach - in production, you'd use NLP or a skills extraction API
        const commonTechSkills = [
            'JavaScript', 'Python', 'Java', 'C#', 'C++', 'Ruby', 'PHP', 'Swift', 'Kotlin',
            'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring',
            'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'SQL', 'NoSQL',
            'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'GraphQL', 'REST', 'TensorFlow',
            'PyTorch', 'Machine Learning', 'AI', 'Data Science', 'Big Data', 'Hadoop', 'Spark'
        ];
        
        const jobSkills = commonTechSkills.filter(skill => 
            new RegExp(`\\b${skill}\\b`, 'i').test(jobDescription)
        );
        
        // Identify missing skills
        const missingSkills = jobSkills.filter(skill => 
            !userSkills.some(userSkill => 
                new RegExp(`\\b${userSkill}\\b`, 'i').test(skill)
            )
        );
        
        // Find courses that teach the missing skills
        const recommendedCourses = [];
        for (const skill of missingSkills) {
            const courses = await Course.find({
                $or: [
                    { courseName: { $regex: skill, $options: 'i' } },
                    { description: { $regex: skill, $options: 'i' } },
                    { topic: { $regex: skill, $options: 'i' } }
                ]
            }).limit(2);
            
            courses.forEach(course => {
                recommendedCourses.push({
                    ...course.toObject(),
                    targetSkill: skill
                });
            });
        }
        
        // Calculate match percentage
        const matchPercentage = jobSkills.length > 0 
            ? Math.round((jobSkills.length - missingSkills.length) / jobSkills.length * 100) 
            : 0;
        
        res.status(200).json({
            analysis: {
                jobSkills,
                userSkills,
                missingSkills,
                matchPercentage,
                recommendedCourses
            }
        });
    } catch (error) {
        console.error('Error analyzing skill gap:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getPersonalizedRecommendations,
    getSimilarCourses,
    generateLearningPath,
    analyzeSkillGap
};