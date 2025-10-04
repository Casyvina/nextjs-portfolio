"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function ScrollNavigator() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const lastSection = sections[sections.length - 1];

        if (!lastSection) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShow(false);
                } else {
                    setShow(true);
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(lastSection);

        return () => {
            observer.unobserve(lastSection);
        };
    }, []);

    const handleClick = () => {
        const sections = Array.from(document.querySelectorAll("section"));
        const currentScroll = window.scrollY;

        // Find next section
        const next = sections.find((s) => s.offsetTop > currentScroll + 10);

        if (next) {
            next.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (!show) return null;

    return (
        <motion.div
            className="fixed bottom-16 md:bottom-10 z-50 left-1/2 -translate-x-1/2 text-slate-500 dark:text-slate-400 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={handleClick}
        >
            <ArrowDown className="h-7 w-7" />
        </motion.div>
    );
}
