"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfinitePortfolioCards = ({
    items,
    direction = "left",
    speed = "normal",
    pauseOnHover = true,
    className,
}: {
    items: {
        id: number;
        img: string;
        alt: string;
        title: string;
        description: string;
        demoUrl: string;
        industry: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    const [start, setStart] = useState(false);

    useEffect(() => {
        addAnimation();
    }, []);

    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem);
                }
            });

            getDirection();
            getSpeed();
            setStart(true);
        }
    }

    const getDirection = () => {
        if (containerRef.current) {
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
        }
    };

    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty("--animation-duration", "20s");
            } else if (speed === "normal") {
                containerRef.current.style.setProperty("--animation-duration", "40s");
            } else {
                containerRef.current.style.setProperty("--animation-duration", "80s");
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-6",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item) => (
                    <li
                        key={item.id}
                        className="relative w-[320px] md:w-[400px] shrink-0 rounded-2xl p-5 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/40 shadow-lg hover:shadow-xl transition-transform duration-300"
                    >
                        {/* Image */}
                        <div className="rounded-xl overflow-hidden h-40 bg-gradient-to-br from-indigo-100 via-pink-50 to-purple-100 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
                            <img
                                src={item.img}
                                alt={item.alt}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                {item.description}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                                <a
                                    href={item.demoUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                                >
                                    View demo →
                                </a>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                    {item.industry}
                                </span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
