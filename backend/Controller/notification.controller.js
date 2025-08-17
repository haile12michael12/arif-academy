const { Notification } = require('../Models/notification.model');
const { User } = require('../Models/user.model');

// Create a new notification
const createNotification = async (req, res) => {
    try {
        const { recipientId, type, title, message, link, relatedCourse, icon, priority } = req.body;
        
        // Validate required fields
        if (!recipientId || !type || !title || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        // Check if recipient exists
        const recipientExists = await User.exists({ _id: recipientId });
        if (!recipientExists) {
            return res.status(404).json({ message: 'Recipient not found' });
        }
        
        const notification = new Notification({
            recipient: recipientId,
            type,
            title,
            message,
            link,
            relatedCourse,
            icon,
            priority
        });
        
        await notification.save();
        
        res.status(201).json({ 
            message: 'Notification created successfully', 
            notification 
        });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get notifications for a user
const getUserNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10, unreadOnly = false } = req.query;
        
        const query = { recipient: userId };
        if (unreadOnly === 'true') {
            query.isRead = false;
        }
        
        // Get total count for pagination
        const total = await Notification.countDocuments(query);
        
        // Get notifications with pagination
        const notifications = await Notification.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('relatedCourse', 'courseName thumbnail');
        
        // Get unread count
        const unreadCount = await Notification.countDocuments({ 
            recipient: userId, 
            isRead: false 
        });
        
        res.status(200).json({
            notifications,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / limit)
            },
            unreadCount
        });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Mark notifications as read
const markAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        const { notificationIds } = req.body;
        
        if (!notificationIds || !Array.isArray(notificationIds)) {
            return res.status(400).json({ message: 'Invalid notification IDs' });
        }
        
        // Update notifications
        const result = await Notification.updateMany(
            { 
                _id: { $in: notificationIds },
                recipient: userId 
            },
            { $set: { isRead: true } }
        );
        
        res.status(200).json({ 
            message: 'Notifications marked as read',
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Error marking notifications as read:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Update all unread notifications for the user
        const result = await Notification.updateMany(
            { recipient: userId, isRead: false },
            { $set: { isRead: true } }
        );
        
        res.status(200).json({ 
            message: 'All notifications marked as read',
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const userId = req.user._id;
        const { notificationId } = req.params;
        
        // Find and delete the notification
        const notification = await Notification.findOneAndDelete({
            _id: notificationId,
            recipient: userId
        });
        
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        
        res.status(200).json({ 
            message: 'Notification deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Utility function to create notifications (for internal use)
const createSystemNotification = async (recipientId, title, message, options = {}) => {
    try {
        const notification = new Notification({
            recipient: recipientId,
            type: options.type || 'system',
            title,
            message,
            link: options.link || null,
            relatedCourse: options.relatedCourse || null,
            icon: options.icon || 'system',
            priority: options.priority || 'medium'
        });
        
        await notification.save();
        return notification;
    } catch (error) {
        console.error('Error creating system notification:', error);
        return null;
    }
};

// Create achievement notification
const createAchievementNotification = async (req, res) => {
    try {
        const { recipientId, achievementTitle, achievementDescription, icon } = req.body;
        
        if (!recipientId || !achievementTitle) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const notification = await createSystemNotification(
            recipientId,
            `Achievement Unlocked: ${achievementTitle}`,
            achievementDescription || 'You have earned a new achievement!',
            {
                type: 'achievement',
                icon: icon || 'trophy',
                priority: 'high'
            }
        );
        
        if (!notification) {
            return res.status(500).json({ message: 'Failed to create achievement notification' });
        }
        
        res.status(201).json({ 
            message: 'Achievement notification created', 
            notification 
        });
    } catch (error) {
        console.error('Error creating achievement notification:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createNotification,
    getUserNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createAchievementNotification,
    createSystemNotification
};