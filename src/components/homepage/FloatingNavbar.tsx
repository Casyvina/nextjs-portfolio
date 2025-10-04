"use client";
import React from "react";
import { FloatingNav } from "../ui/floating-navbar";
import {
    IconHome,
    IconBriefcase,
    IconCreditCard,
    IconUser,
    IconMessage,
} from "@tabler/icons-react";


export function FloatingNavDemo() {

    const handleScroll = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navItems = [
        {
            name: "Home",
            link: "#hero",   // ✅ use link, not id
            icon: <IconHome className="h-4 w-4 text-slate-500 dark:text-slate-300" />,
        },
        {
            name: "Portfolio",
            link: "#portfolio",
            icon: <IconBriefcase className="h-4 w-4 text-slate-500 dark:text-slate-300" />,
        },
        {
            name: "Pricing",
            link: "#pricing",
            icon: <IconCreditCard className="h-4 w-4 text-slate-500 dark:text-slate-300" />,
        },
        {
            name: "About",
            link: "#about",
            icon: <IconUser className="h-4 w-4 text-slate-500 dark:text-slate-300" />,
        },
        {
            name: "Contact",
            link: "#contact",
            icon: <IconMessage className="h-4 w-4 text-slate-500 dark:text-slate-300" />,
        },
    ];

    return (
        <div className="relative w-full">
            <div className="relative w-full">
                <FloatingNav navItems={navItems} />
            </div>
        </div>
    );
}
