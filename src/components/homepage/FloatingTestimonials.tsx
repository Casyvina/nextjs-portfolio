"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ✅ Use forward slashes for Next.js public assets
const testimonials = [
    {
        id: 1,
        name: "Ada lovelace",
        avatar: "/assets/testimonials/9.jpg",
        text: "Buyeni gave me a site that doubled my bookings in 2 weeks 🚀",
    },
    {
        id: 2,
        name: "Chinedu Eze",
        avatar: "/assets/testimonials/1.jpg",
        text: "The best dev I’ve worked with. Fast, clean, and reliable! 🙌",
    },
    {
        id: 3,
        name: "Amaka Beauty",
        avatar: "/assets/testimonials/10.jpg",
        text: "My Instagram followers now buy directly from my website 💅🏽✨",
    },
    {
        id: 4,
        name: "David Umeh",
        avatar: "/assets/testimonials/4.jpg",
        text: "Very professional and easy to work with. Highly recommended ⭐️⭐️⭐️⭐️⭐️",
    },
];

function TypingDots() {
    return (
        <div className="flex gap-1 mt-1">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></span>
        </div>
    );
}

type ActiveTestimonial = {
    id: number;
    name: string;
    avatar: string;
    text: string;
    showText: boolean;
};

export default function FloatingTestimonials() {
    const [queue, setQueue] = useState<ActiveTestimonial[]>([]);
    const timersRef = useRef<NodeJS.Timeout[]>([]);

    useEffect(() => {
        const clearAllTimers = () => {
            timersRef.current.forEach((t) => clearTimeout(t));
            timersRef.current = [];
        };

        const showTestimonial = () => {
            const random =
                testimonials[Math.floor(Math.random() * testimonials.length)];

            const newT: ActiveTestimonial = { ...random, showText: false };

            // Add bubble (max 3, remove oldest if full)
            setQueue((prev) => {
                if (prev.length >= 3) return [...prev.slice(1), newT];
                return [...prev, newT];
            });

            // Reveal text after 2s
            const typingTimer = setTimeout(() => {
                setQueue((prev) =>
                    prev.map((item) =>
                        item.id === newT.id ? { ...item, showText: true } : item
                    )
                );
            }, 2000);
            timersRef.current.push(typingTimer);

            // Auto-dismiss after 15s
            const dismissTimer = setTimeout(() => {
                setQueue((prev) => prev.slice(1));
            }, 15000);
            timersRef.current.push(dismissTimer);
        };

        // Cycle every 60s after first appears at 40s
        const firstTimer = setTimeout(() => {
            showTestimonial();
            const cycleTimer = setInterval(showTestimonial, 60000);
            timersRef.current.push(cycleTimer as unknown as NodeJS.Timeout);
        }, 40000);
        timersRef.current.push(firstTimer);

        return () => {
            clearAllTimers();
        };
    }, []);

    return (
        <div className="fixed bottom-20 left-4 z-40 flex flex-col gap-3 max-w-[90vw] sm:max-w-xs">
            <AnimatePresence>
                {queue.map((t, idx) => (
                    <motion.div
                        key={t.id + "-" + idx}
                        initial={{ x: -200, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -200, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-lg px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl relative"
                        style={{ transform: `translateY(-${idx * 12}px)` }} // ✅ cascade upward
                    >
                        <Image
                            src={t.avatar}
                            alt={t.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                        />
                        <div>
                            <p className="text-xs sm:text-sm font-semibold">{t.name}</p>
                            {t.showText ? (
                                <p className="text-xs text-slate-600 dark:text-slate-400">
                                    {t.text}
                                </p>
                            ) : (
                                <TypingDots />
                            )}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
