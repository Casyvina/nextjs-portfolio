"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// fake testimonials
const testimonials = [
    {
        id: 1,
        name: "Ada Lovelace",
        avatar: "https://i.pravatar.cc/100?img=1",
        text: "Joseph gave me a site that doubled my bookings in 2 weeks 🚀",
    },
    {
        id: 2,
        name: "Chinedu Eze",
        avatar: "https://i.pravatar.cc/100?img=2",
        text: "The best dev I’ve worked with. Fast, clean, and reliable! 🙌",
    },
    {
        id: 3,
        name: "Amaka Beauty",
        avatar: "https://i.pravatar.cc/100?img=3",
        text: "My Instagram followers now buy directly from my website 💅🏽✨",
    },
    {
        id: 4,
        name: "David Umeh",
        avatar: "https://i.pravatar.cc/100?img=4",
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

    useEffect(() => {
        let cycleTimeout: NodeJS.Timeout;

        const showTestimonial = () => {
            const random =
                testimonials[Math.floor(Math.random() * testimonials.length)];

            const newT: ActiveTestimonial = { ...random, showText: false };

            // add bubble with typing dots only
            setQueue((prev) => {
                if (prev.length >= 3) return [newT]; // reset if stack too big
                return [...prev, newT];
            });

            // after 2s replace typing dots with text
            setTimeout(() => {
                setQueue((prev) =>
                    prev.map((item) =>
                        item.id === newT.id ? { ...item, showText: true } : item
                    )
                );
            }, 2000);

            // auto-dismiss after 15s
            setTimeout(() => {
                setQueue((prev) => prev.slice(1));
            }, 15000);
        };

        const startCycle = () => {
            showTestimonial();
            // wait 1min before starting again
            cycleTimeout = setTimeout(startCycle, 60000);
        };

        // first after 40s
        const first = setTimeout(startCycle, 40000);

        return () => {
            clearTimeout(first);
            clearTimeout(cycleTimeout);
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
                        style={{ marginLeft: idx * 12 }}
                    >
                        <img
                            src={t.avatar}
                            alt={t.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
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
