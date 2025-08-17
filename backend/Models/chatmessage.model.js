const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    isUserMessage: {
        type: Boolean,
        default: true
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Index for efficient querying by user
chatMessageSchema.index({ userId: 1, timestamp: -1 });

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = { ChatMessage };