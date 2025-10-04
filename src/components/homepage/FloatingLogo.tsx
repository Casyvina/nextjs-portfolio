"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useScrollSpy } from "../ui/useScrollSpy";
// import { useScrollSpy } from "../../hooks/useScrollSpy"; // import your hook

export default function FloatingLogo() {
    // Watch sections
    const activeId = useScrollSpy(
        ["home", "hero", "portfolio", "pricing", "about", "contact"],
        100 // offset so it doesn’t flicker too fast
    );

    // only show logo if we are NOT on #home
    const visible = activeId && activeId !== "home";
    console.log("Active ID:", activeId); // Debugging line to check the active ID
    console.log("Logo Visible:", visible); // Debugging line to check visibility

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ x: -80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -80, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed top-6 left-6 z-50"
                >
                    <a href="#home">
                        <div className="group bg-black rounded-md p-2 shadow-md cursor-pointer relative overflow-hidden">
                            {/* Logo image */}
                            <Image
                                src="/assets/logo_bbg.png" // put your logo inside public/
                                alt="Buyeni Logo"
                                width={120}
                                height={40}
                                className="hidden md:block relative z-10"
                            />
                            <Image
                                src="/assets/logo_bbg.png" // put your logo inside public/
                                alt="Buyeni Logo"
                                width={80}
                                height={30}
                                className="md:hidden relative z-10"
                            />
                        </div>
                    </a>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
