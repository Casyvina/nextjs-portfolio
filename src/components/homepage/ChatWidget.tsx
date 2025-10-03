"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconMessage, IconSend } from "@tabler/icons-react";

export function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: "me", text: "👋 Hi there! How can I help you?" },
    ]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: input }]);
        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Floating Chat Button */}
            <Button
                onClick={() => setOpen(!open)}
                size="icon"
                className="rounded-full h-12 w-12 bg-green-500 hover:bg-green-600 shadow-lg"
            >
                <IconMessage className="h-5 w-5 text-white" />
            </Button>

            {open && (
                <div className="absolute bottom-16 right-0 w-80 h-96 bg-white rounded-lg shadow-xl border border-slate-200 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-2 p-3 bg-green-500 text-white">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                            J
                        </div>
                        <div>
                            <p className="text-sm font-medium">Joseph (Casyvina)</p>
                            <div className="flex items-center gap-1 text-xs">
                                <span className="w-2 h-2 rounded-full bg-green-300"></span> Online
                            </div>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50">
                        {messages.map((msg, idx) =>
                            msg.sender === "me" ? (
                                <motion.div
                                    key={msg.id}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="flex items-start gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                                        J
                                    </div>
                                    <div className="bg-white p-2 rounded-lg shadow text-sm max-w-[70%]">
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={msg.id}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="flex justify-end"
                                >
                                    <div className="bg-green-500 text-white p-2 rounded-lg shadow text-sm max-w-[70%]">
                                        {msg.text}
                                    </div>
                                </motion.div>
                            )
                        )}
                    </div>

                    {/* Input Box */}
                    <div className="border-t border-slate-200 p-2 flex items-center gap-2 bg-white">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 text-sm"
                        />
                        <Button
                            onClick={handleSend}
                            size="icon"
                            className="bg-green-500 hover:bg-green-600"
                        >
                            <IconSend className="h-4 w-4 text-white" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
