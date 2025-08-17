const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/auth');
const mlController = require('../Controller/ml.controller');

// Get personalized course recommendations
router.get('/recommendations', authenticateToken, mlController.getPersonalizedRecommendations);

// Get similar courses to a specific course
router.get('/similar-courses/:courseId', authenticateToken, mlController.getSimilarCourses);

// Generate a learning path based on career goals
router.post('/learning-path', authenticateToken, mlController.generateLearningPath);

// Analyze skill gap based on job descriptions
router.post('/skill-gap', authenticateToken, mlController.analyzeSkillGap);

module.exports = router;