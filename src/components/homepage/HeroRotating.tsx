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
            viewport={{ once: false, amount: 0.2 }} // animate when 20% visible
            transition={{ duration: 0.6 }}
        >
            <HeroHighlight>
                {/* Static Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-center max-w-3xl mx-auto leading-snug"
                >
                    Websites that{" "}
                    <Highlight className="text-indigo-600 whitespace-nowrap">
                        grow Nigerian businesses 🚀
                    </Highlight>
                </motion.h1>

                {/* Rotating Sub-Headline */}
                <div className="h-20 mt-6 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.6 }}
                            className="text-lg text-slate-700 max-w-2xl mx-auto text-center"
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
                    className="mt-8 flex justify-center gap-4"
                >
                    <div className="mt-8 flex justify-center gap-4">
                        <Button asChild size="lg">
                            <a href="#portfolio">See My Work</a>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <a href="#pricing">Book Your Website</a>
                        </Button>
                    </div>
                </motion.div>
            </HeroHighlight>
        </motion.section>
    );
}
