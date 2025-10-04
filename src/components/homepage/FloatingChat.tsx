"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: "bot", text: "👋 Hi, I'm Joseph! How can I help you today?" },
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    // auto scroll to last message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const sendMessage = () => {
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), sender: "user", text: input.trim() };
        setMessages((prev) => [...prev, newMsg]);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: "bot",
                    text: "I'm not online right now 😅. You can leave your email and message, and I'll get back to you.",
                },
            ]);
        }, 1000);

        setInput("");
    };

    return (
        <div className="fixed bottom-12 md:bottom-6 right-6 z-50">
            {/* Toggle button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-3 rounded-full bg-indigo-500 shadow-lg hover:scale-105 transition text-white"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            )}

            {/* Chat box */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-14 w-80 h-96 bg-white rounded-lg shadow-xl border flex flex-col relative"
                    style={{ marginBottom: "10px" }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-2 bg-indigo-500 text-white rounded-t-lg">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <img
                                    src="https://ui-avatars.com/api/?name=Joseph&background=4F46E5&color=fff"
                                    alt="Joseph"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white"></span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold">Joseph</p>
                                <p className="text-xs text-indigo-100">Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)}>
                            <X className="h-5 w-5 text-white hover:text-red-300 transition" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50 scrollbar-hide">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ x: msg.sender === "bot" ? -50 : 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${msg.sender === "bot"
                                    ? "bg-gray-200 text-gray-800 self-start"
                                    : "bg-indigo-500 text-white self-end ml-auto"
                                    }`}
                            >
                                {msg.text}
                            </motion.div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-2 border-t flex gap-2">
                        <input
                            type="text"
                            className="flex-1 text-sm px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm transition"
                        >
                            Send
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
