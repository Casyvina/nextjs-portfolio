"use client";

import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const messages = [
    "Every day without a website, you’re losing clients 🚪💨",
    "Your brand is fine. Your website should be finer 💅🏽✨",
    "Websites that turn followers into paying customers 💵",
    "Your hustle deserves more than just Instagram ✨"
];

export function HeroRotating() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 5000); // switch every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.section
            id="hero"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="px-4 sm:px-6 md:px-8" // add padding for mobile safety
        >
            <HeroHighlight>
                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center max-w-3xl mx-auto leading-snug"
                >
                    Websites that{" "}
                    <Highlight className="text-indigo-600 break-words">
                        grow Nigerian businesses 🚀
                    </Highlight>
                </motion.h1>

                {/* Rotating Sub-Headline */}
                <div className="min-h-[4rem] mt-6 flex items-center justify-center px-2">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto text-center"
                        >
                            {messages[index]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto"
                >
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <a href="#portfolio">See My Work</a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                        <a href="#pricing">Book Your Website</a>
                    </Button>
                </motion.div>
            </HeroHighlight>
        </motion.section>

    );
}
