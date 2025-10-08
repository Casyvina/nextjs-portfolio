"use client";
import { SparklesCore } from "@/components/ui/sparkles";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
// import { SparklesCore } from "../ui/sparkles";

export function SparklesPreview() {
    return (
        <section id="home"
            className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
            {/* Animated Heading */}
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 1,
                    ease: "easeOut",
                }}
            // className="md:text-7xl text-5xl lg:text-9xl text-center text-white relative z-20"
            >
                <Image src={"/assets/logo_nobg.png"} alt="logo" width={400} height={200} className="animate-pulse hidden md:block" />
                <Image src={"/assets/logo_nobg.png"} alt="logo" width={200} height={100} className="animate-pulse md:hidden" />
            </motion.div>
            <motion.h1
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut"
                }}
                className="absolute text-white/20 text-2xl md:text-5xl  top-1/2.95 md:top-1/2 font-bold items-center stroke-cyan-900">
                Full Stack Dev
            </motion.h1>
            <div className="w-[40rem] h-40 relative">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
        </section>
    );
}
