"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../ui/spotlight";


export function AboutSpotlight() {
    return (
        <section
            id="about"

            className="relative flex h-[40rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center"
        >
            {/* Grid background */}
            {/* <div
                className={cn(
                    "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
                    "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
                )}
            /> */}

            {/* Spotlight */}
            <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />

            {/* Content */}
            <div className="relative z-10 mx-auto w-full max-w-4xl p-6 text-center">
                <h2 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-transparent text-3xl md:text-6xl font-extrabold">
                    Hi — I&apos;m Joseph
                </h2>

                <p className="mt-6 text-neutral-300 text-justify leading-relaxed">
                    I design and build modern websites for small businesses — especially
                    makeup artists, stylists, real estate agents, and contractors. My goal
                    is simple: help Nigerian entrepreneurs grow their brands online with
                    stunning websites that don’t just look good but also convert visitors
                    into paying clients.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <a
                        href="#contact"
                        className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                    >
                        Work with me
                    </a>
                    <a
                        href="/demos"
                        className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl border border-neutral-700 text-neutral-300 bg-black/40 backdrop-blur-sm transition-all hover:bg-black/60"
                    >
                        See more demos
                    </a>
                </div>
            </div>
        </section>
    );
}
