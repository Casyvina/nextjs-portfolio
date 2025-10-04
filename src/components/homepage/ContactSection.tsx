"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion, AnimatePresence } from "framer-motion";

export function ContactSection() {
    const { register, handleSubmit, setValue } = useForm();

    // Load selected plan from localStorage
    useEffect(() => {
        const fillForm = () => {
            const saved = localStorage.getItem("selectedPlan");
            if (saved) {
                const plan = JSON.parse(saved);
                setValue(
                    "message",
                    `I want to buy the ${plan.name} package for ${plan.price}.`
                );
                setValue("budget", plan.price);
            }
        };

        // Run on mount
        fillForm();

        // Listen for changes
        window.addEventListener("planSelected", fillForm);
        return () => window.removeEventListener("planSelected", fillForm);
    }, [setValue]);

    const onSubmit = (data: any) => {
        console.log("Form submitted:", data);
        // TODO: Send to email API / Supabase / Resend here
        alert("✅ Your order has been sent!");
    };

    return (
        <motion.section
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }} // animate when 20% visible
            transition={{ duration: 0.6 }}
            className="relative h-[50rem] w-full bg-neutral-950 flex flex-col items-center justify-center antialiased"
        >
            <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 rounded-xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
                    Let’s build your website today 🚀
                </h2>

                <p className="mt-4 text-neutral-400 text-center">
                    Tell me about your business and your goals. I’ll reply within 24 hours.
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 grid grid-cols-1 gap-4"
                >
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register("name", { required: true })}
                            placeholder="Your full name"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder:text-neutral-600 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            {...register("email", { required: true })}
                            placeholder="you@business.com"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder:text-neutral-600 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            {...register("business")}
                            placeholder="Makeup artist / Realtor / Other"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder:text-neutral-600 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        />
                        <input
                            {...register("budget")}
                            placeholder="₦ — ₦ — ₦"
                            className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder:text-neutral-600 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Pre-filled Message */}
                    <textarea
                        {...register("message")}
                        placeholder="A short note about your needs / timeline"
                        className="w-full h-28 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 placeholder:text-neutral-600 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                        >
                            Send Message
                        </button>

                        <a
                            href="https://wa.me/?text=Hi%2C%20I%27m%20interested%20in%20a%20website"
                            target="_blank"
                            rel="noreferrer"
                            className="px-6 py-3 rounded-lg border border-neutral-700 text-neutral-300 hover:border-green-500 hover:text-green-400 transition"
                        >
                            Message on WhatsApp
                        </a>

                        <a
                            href="https://instagram.com/yourhandle"
                            target="_blank"
                            rel="noreferrer"
                            className="text-neutral-400 hover:text-pink-400 transition"
                        >
                            Instagram
                        </a>
                    </div>
                </form>
            </div>

            {/* Beams background */}
            <BackgroundBeams />
        </motion.section>
    );
}
