import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes, FaTrash, FaChevronDown } from 'react-icons/fa';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { tokenState, userState } from '@/store/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const messagesEndRef = useRef(null);
    const token = useRecoilValue(tokenState);
    const user = useRecoilValue(userState);

    // Fetch messages on component mount
    useEffect(() => {
        if (token && isOpen) {
            fetchMessages();
        }
    }, [token, isOpen]);

    // Scroll to bottom of messages
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            setIsFetching(true);
            const response = await axios.get('http://localhost:4000/api/chat/messages', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages(response.data);
            setIsFetching(false);
            // Mark messages as read
            await axios.put('http://localhost:4000/api/chat/read', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Error fetching messages:', error);
            setIsFetching(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        try {
            setIsLoading(true);
            // Add user message to UI immediately
            const tempUserMessage = {
                _id: Date.now().toString(),
                content: inputMessage,
                isUserMessage: true,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, tempUserMessage]);
            setInputMessage('');

            // Send message to API
            const response = await axios.post('http://localhost:4000/api/chat/send', 
                { content: inputMessage },
                { headers: { Authorization: `Bearer ${token}` }}
            );

            // Update messages with actual response from server
            setMessages(prev => [
                ...prev.filter(msg => msg._id !== tempUserMessage._id),
                response.data.userMessage,
                response.data.aiMessage
            ]);
            setIsLoading(false);
        } catch (error) {
            console.error('Error sending message:', error);
            setIsLoading(false);
            // Show error message
            setMessages(prev => [
                ...prev,
                {
                    _id: Date.now().toString(),
                    content: 'Sorry, I\'m having trouble connecting. Please try again later.',
                    isUserMessage: false,
                    timestamp: new Date().toISOString()
                }
            ]);
        }
    };

    const handleClearChat = async () => {
        try {
            await axios.delete('http://localhost:4000/api/chat/clear', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessages([]);
        } catch (error) {
            console.error('Error clearing chat:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* Chat toggle button */}
            <div className="fixed bottom-4 right-4 z-50">
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaRobot size={24} />
                </motion.button>
            </div>

            {/* Chat window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="fixed bottom-20 right-4 w-80 sm:w-96 h-[500px] bg-white rounded-lg shadow-2xl overflow-hidden z-50 border border-gray-200 flex flex-col"
                        style={{ backgroundColor: `var(--background-color)`, borderColor: `var(--borderColor)` }}
                    >
                        {/* Header */}
                        <div className="bg-primary text-white p-3 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <FaRobot size={20} />
                                <h3 className="font-bold">AI Assistant</h3>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={handleClearChat}
                                    className="text-white hover:text-red-200 transition-colors"
                                    title="Clear chat history"
                                >
                                    <FaTrash size={16} />
                                </button>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:text-gray-200 transition-colors"
                                >
                                    <FaTimes size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-3 overflow-y-auto">
                            {isFetching ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                                            <Skeleton className={`h-16 ${i % 2 === 0 ? 'w-3/4' : 'w-2/3'} rounded-lg`} />
                                        </div>
                                    ))}
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                                    <FaRobot size={40} className="text-primary mb-3" />
                                    <h3 className="text-lg font-semibold mb-2">Hello, {user?.fullName || 'there'}!</h3>
                                    <p className="text-gray-600 mb-4">I'm your AI assistant. How can I help you today?</p>
                                    <div className="w-full space-y-2">
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-start text-left" 
                                            onClick={() => setInputMessage('How do I enroll in a course?')}
                                        >
                                            How do I enroll in a course?
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-start text-left" 
                                            onClick={() => setInputMessage('What learning paths do you recommend for web development?')}
                                        >
                                            Recommend a learning path
                                        </Button>
                                        <Button 
                                            variant="outline" 
                                            className="w-full justify-start text-left" 
                                            onClick={() => setInputMessage('Help me prepare for a technical interview')}
                                        >
                                            Help with technical interviews
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div 
                                            key={message._id} 
                                            className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div 
                                                className={`p-3 rounded-lg max-w-[85%] ${message.isUserMessage 
                                                    ? 'bg-primary/10 text-gray-800 rounded-tr-none' 
                                                    : 'bg-gray-100 rounded-tl-none'}`}
                                                style={message.isUserMessage ? {} : { backgroundColor: `var(--borderColor)` }}
                                            >
                                                <ReactMarkdown className="prose prose-sm max-w-none">
                                                    {message.content}
                                                </ReactMarkdown>
                                                <div className="text-xs text-gray-500 mt-1 text-right">
                                                    {formatTimestamp(message.timestamp)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                                                <div className="flex space-x-2 items-center">
                                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t" style={{ borderColor: `var(--borderColor)` }}>
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    placeholder="Type your message..." 
                                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    style={{ borderColor: `var(--borderColor)` }}
                                    disabled={isLoading}
                                />
                                <Button 
                                    type="submit" 
                                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                                    disabled={isLoading || !inputMessage.trim()}
                                >
                                    <FaPaperPlane />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;