import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAiResponse } from '../utils/mockAiLogic';
import { Send, X, Bot, User } from 'lucide-react';

const RobotChatBox = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: "Bip bop! 🤖 Halo, aku AI pribadinya Daffa. Ada yang ingin kamu ketahui tentang kemampuannya atau portofolio ini?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, isTyping]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        const aiResponseText = await getAiResponse(newUserMessage.text);

        const newAiMessage = { id: Date.now() + 1, sender: 'ai', text: aiResponseText };
        setMessages(prev => [...prev, newAiMessage]);
        setIsTyping(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed bottom-28 right-4 z-50 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/10"
                    style={{
                        background: 'rgba(15, 15, 15, 0.8)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)'
                    }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#b8f400]/20 text-[#b8f400] shadow-[0_0_15px_rgba(184,244,0,0.3)]">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">Daffa's AI</h3>
                                <p className="text-[#b8f400] text-xs flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8f400] animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="p-4 h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent flex flex-col gap-3">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                            >
                                <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] ${msg.sender === 'user' ? 'bg-white/10 text-white' : 'bg-[#b8f400]/20 text-[#b8f400]'}`}>
                                    {msg.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                                </div>
                                <div
                                    className={`px-3 py-2 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-white/10 text-white rounded-tr-sm'
                                            : 'bg-[#b8f400]/10 text-white/90 border border-[#b8f400]/20 rounded-tl-sm'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex gap-2 max-w-[85%] self-start">
                                <div className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center bg-[#b8f400]/20 text-[#b8f400]">
                                    <Bot size={12} />
                                </div>
                                <div className="px-4 py-3 rounded-2xl bg-[#b8f400]/10 border border-[#b8f400]/20 rounded-tl-sm flex items-center gap-1">
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#b8f400] rounded-full" />
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#b8f400] rounded-full" />
                                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#b8f400] rounded-full" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-black/20 flex gap-2">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Tanya soal Daffa..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#b8f400]/50 focus:bg-white/10 transition-all placeholder:text-white/30"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim() || isTyping}
                            className="w-10 h-10 shrink-0 rounded-full bg-[#b8f400] text-black flex items-center justify-center hover:bg-[#cbfb22] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={16} className="ml-0.5" />
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RobotChatBox;
