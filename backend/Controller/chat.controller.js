const { ChatMessage } = require('../Models/chatmessage.model');
const { User } = require('../Models/user.model');
const { chatSession } = require('../jobs/geminiModel');

// Get all chat messages for a user
const getUserMessages = async (req, res) => {
    try {
        const userId = req.user._id;
        const messages = await ChatMessage.find({ userId })
            .sort({ timestamp: 1 })
            .limit(50); // Limit to last 50 messages

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ message: 'Failed to fetch chat messages' });
    }
};

// Send a new message and get AI response
const sendMessage = async (req, res) => {
    try {
        const userId = req.user._id;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Message content is required' });
        }

        // Save user message
        const userMessage = new ChatMessage({
            userId,
            content,
            isUserMessage: true,
        });
        await userMessage.save();

        // Get AI response using Gemini model
        const result = await chatSession.sendMessage(content);
        const response = await result.response;
        const aiResponseText = response.text();

        // Save AI response
        const aiMessage = new ChatMessage({
            userId,
            content: aiResponseText,
            isUserMessage: false,
        });
        await aiMessage.save();

        res.status(201).json({
            userMessage,
            aiMessage
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Failed to process message' });
    }
};

// Mark messages as read
const markMessagesAsRead = async (req, res) => {
    try {
        const userId = req.user._id;
        
        await ChatMessage.updateMany(
            { userId, read: false },
            { $set: { read: true } }
        );

        res.status(200).json({ message: 'Messages marked as read' });
    } catch (error) {
        console.error('Error marking messages as read:', error);
        res.status(500).json({ message: 'Failed to mark messages as read' });
    }
};

// Clear chat history
const clearChatHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        
        await ChatMessage.deleteMany({ userId });

        res.status(200).json({ message: 'Chat history cleared successfully' });
    } catch (error) {
        console.error('Error clearing chat history:', error);
        res.status(500).json({ message: 'Failed to clear chat history' });
    }
};

module.exports = {
    getUserMessages,
    sendMessage,
    markMessagesAsRead,
    clearChatHistory
};