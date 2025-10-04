"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import emailjs from "emailjs-com";

export function ContactSection() {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [showSuccess, setShowSuccess] = useState(false);
    const [celebrate, setCelebrate] = useState(false);
    const [loading, setLoading] = useState(false);

    // preload plan data if selected
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

        fillForm();
        window.addEventListener("planSelected", fillForm);
        return () => window.removeEventListener("planSelected", fillForm);
    }, [setValue]);

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    name: data.name,
                    email: data.email,
                    business: data.business,
                    budget: data.budget,
                    message: data.message,
                    time: new Date().toLocaleString(),
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );

            reset();
            setCelebrate(true);
            setShowSuccess(true);

            setTimeout(() => setCelebrate(false), 5000);
        } catch (err) {
            console.error("EmailJS error:", err);
            alert("❌ Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.section
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[50rem] w-full bg-neutral-950 flex flex-col items-center justify-center antialiased"
        >
            {celebrate && <Confetti recycle={false} numberOfPieces={300} />}

            <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 rounded-xl">
                <h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">
                    Let’s build your website today 🚀
                </h2>
                <p className="mt-4 text-neutral-400 text-center">
                    Tell me about your business and your goals. I’ll reply within 24 hours.
                </p>

                {!showSuccess && (
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 grid grid-cols-1 gap-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                {...register("name", { required: true })}
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                {...register("email", { required: true })}
                                placeholder="you@business.com"
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                {...register("business")}
                                placeholder="Makeup artist / Realtor / Other"
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                {...register("budget")}
                                placeholder="₦ — ₦ — ₦"
                                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <textarea
                            {...register("message")}
                            placeholder="A short note about your needs / timeline"
                            className="w-full h-28 rounded-lg border border-neutral-800 bg-neutral-900 text-neutral-200 px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                        />

                        <div className="mt-6 flex flex-wrap gap-4 items-center justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${loading
                                    ? "bg-indigo-500 text-white cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-1">
                                        Sending
                                        <span className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
                                        <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
                                    </span>
                                ) : (
                                    "Send Message"
                                )}
                            </button>

                            <a
                                href="https://wa.me/2349155351324?text=Hi%2C%20I%27m%20interested%20in%20a%20website"
                                target="_blank"
                                rel="noreferrer"
                                className="px-6 py-3 rounded-lg border border-neutral-700 text-neutral-300 hover:border-green-500 hover:text-green-400 transition"
                            >
                                Message on WhatsApp
                            </a>

                            <a
                                href="https://instagram.com/buyeni_dev"
                                target="_blank"
                                rel="noreferrer"
                                className="text-neutral-400 hover:text-pink-400 transition"
                            >
                                Instagram
                            </a>
                        </div>
                    </form>
                )}
            </div>

            {/* <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl p-8 max-w-sm text-center"
                        >
                            <h3 className="text-xl font-bold text-indigo-600">🎉 Message Sent!</h3>
                            <p className="mt-2 text-slate-600 dark:text-slate-400">
                                Thanks for reaching out. I’ll respond within 24 hours.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="mt-6 px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence> */}

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="rounded-xl shadow-2xl p-8 max-w-sm text-center 
                   bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 
                   text-white"
                        >
                            {/* ✅ Animated Checkmark */}
                            <motion.svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 52 52"
                                className="w-16 h-16 mx-auto mb-4"
                            >
                                <motion.path
                                    fill="none"
                                    stroke="#fff"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 27l7 7 17-17"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.7, ease: "easeInOut" }}
                                />
                            </motion.svg>

                            <h3 className="text-2xl font-bold">🎉 Message Sent!</h3>
                            <p className="mt-3 text-white/90">
                                Thanks for reaching out. I’ll respond within 24 hours.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="mt-6 px-6 py-2 rounded-lg bg-white/20 hover:bg-white/30 
                     transition text-white font-semibold backdrop-blur-md"
                            >
                                Close
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            <BackgroundBeams />
        </motion.section>
    );
}
