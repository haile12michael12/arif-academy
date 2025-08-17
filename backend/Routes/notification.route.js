const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/auth');
const {
    createNotification,
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createAchievementNotification
} = require('../Controller/notification.controller');

// Get user notifications (requires authentication)
router.get('/', authenticateToken, getUserNotifications);

// Create a new notification (admin or system only)
router.post('/', authenticateToken, createNotification);

// Mark specific notifications as read
router.patch('/read', authenticateToken, markAsRead);

// Mark all notifications as read
router.patch('/read-all', authenticateToken, markAllAsRead);

// Delete a notification
router.delete('/:notificationId', authenticateToken, deleteNotification);

// Create achievement notification
router.post('/achievement', authenticateToken, createAchievementNotification);

module.exports = router;