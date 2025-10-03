"use client";

import React from "react";
import { InfinitePortfolioCards } from "../ui/infinite-portfolio-card";

const DEMOS = [
    {
        id: 1,
        img: "/demo-makeup.png",
        alt: "Makeup Artist Demo",
        title: "Makeup Artist Portfolio",
        description: "Showcase your makeup artistry with style and easy bookings.",
        demoUrl: "https://demo-makeup.vercel.app",
        industry: "Beauty",
    },
    {
        id: 2,
        img: "/demo-fashion.png",
        alt: "Fashion Stylist Demo",
        title: "Fashion Stylist Website",
        description: "Highlight your fashion looks and grow your Instagram audience.",
        demoUrl: "https://demo-fashion.vercel.app",
        industry: "Fashion",
    },
    {
        id: 3,
        img: "/demo-realtor.png",
        alt: "Realtor Demo",
        title: "Real Estate Agent",
        description: "List properties beautifully and capture leads instantly.",
        demoUrl: "https://demo-realtor.vercel.app",
        industry: "Real Estate",
    },
    // add more as needed
];

export function PortfolioSection() {
    return (
        <section id="portfolio" className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-center">
                    Selected Demo Projects
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400 text-center">
                    These demo sites show how a clean, focused design can highlight your services,
                    build trust, and convert visitors into clients.
                </p>

                <div className="mt-16">
                    <InfinitePortfolioCards
                        items={DEMOS}
                        direction="left"
                        speed="slow"
                    />
                </div>
            </div>
        </section>
    );
}
