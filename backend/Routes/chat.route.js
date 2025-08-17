const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../Middleware/auth');
const { 
    getUserMessages, 
    sendMessage, 
    markMessagesAsRead, 
    clearChatHistory 
} = require('../Controller/chat.controller');

// Apply authentication middleware to all chat routes
router.use(authenticateToken);

// Get all chat messages for the authenticated user
router.get('/messages', getUserMessages);

// Send a new message and get AI response
router.post('/send', sendMessage);

// Mark all messages as read
router.put('/read', markMessagesAsRead);

// Clear chat history
router.delete('/clear', clearChatHistory);

module.exports = router;