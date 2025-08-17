const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    type: { 
        type: String, 
        enum: ['course', 'achievement', 'system', 'social', 'reminder'],
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    link: { 
        type: String,
        default: null
    },
    relatedCourse: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course',
        default: null 
    },
    isRead: { 
        type: Boolean, 
        default: false 
    },
    icon: {
        type: String,
        default: 'notification'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    expiresAt: {
        type: Date,
        default: function() {
            // Default expiration: 30 days from creation
            const date = new Date();
            date.setDate(date.getDate() + 30);
            return date;
        }
    }
}, { timestamps: true });

// Index for efficient querying
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

// Add TTL index for automatic expiration
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = { Notification };