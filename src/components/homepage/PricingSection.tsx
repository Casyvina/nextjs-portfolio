"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PricingSection = () => {
    const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

    const plans = [
        {
            name: "Starter",
            monthly: 25000,
            yearly: 250000,
            desc: "A polished one-page site",
            features: [
                "1-page website (Hero, Services, Portfolio, Contact)",
                "Booking form (WhatsApp/Email)",
                "Free hosting + domain (1st year)",
                "Mobile-friendly design",
            ],
            popular: false,
        },
        {
            name: "Pro",
            monthly: 40000,
            yearly: 400000,
            desc: "Multi-page site + CMS",
            features: [
                "Everything in Starter",
                "Up to 5 pages",
                "Blog / Makeup Tips page",
                "Instagram feed integration",
                "Testimonials section",
                "Basic SEO setup",
                "Monthly updates (images/text)",
            ],
            popular: true,
        },
        {
            name: "Premium",
            monthly: 70000,
            yearly: 700000,
            desc: "Full brand package & support",
            features: [
                "Everything in Pro",
                "Unlimited pages",
                "Full online shop (lashes, wigs, products)",
                "Secure payments (Paystack/Flutterwave)",
                "Email marketing (newsletter, promos)",
                "Google Analytics reports",
                "Priority WhatsApp support",
                "60 days support",
            ],
            popular: false,
        },
    ];

    return (
        <motion.section
            id="pricing"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }} // animate when 20% visible
            transition={{ duration: 0.6 }}
            className="py-24 relative bg-gradient-to-b from-indigo-50 via-white to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        >
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight">
                    Simple packages for growing businesses
                </h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">
                    Choose the plan that fits your goals.
                </p>

                {/* Toggle billing cycle */}
                <div className="mt-6 flex items-center justify-center gap-4">
                    <button
                        onClick={() => setBilling("monthly")}
                        className={`px-4 py-2 text-sm rounded-full transition ${billing === "monthly"
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBilling("yearly")}
                        className={`px-4 py-2 text-sm rounded-full transition ${billing === "yearly"
                            ? "bg-indigo-600 text-white shadow"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            }`}
                    >
                        Yearly <span className="ml-1 text-xs">(Save 20%)</span>
                    </button>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => {
                        const basePrice = billing === "monthly" ? plan.monthly : plan.yearly;
                        const discount = billing === "yearly" ? basePrice * 1.2 : basePrice; // fake anchor for strikethrough
                        return (
                            <div
                                key={plan.name}
                                className={`relative rounded-2xl p-8 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${plan.popular
                                    ? "ring-2 ring-indigo-500/60 dark:ring-indigo-400/50"
                                    : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow">
                                        Most Popular
                                    </span>
                                )}

                                <h3 className="font-semibold text-xl">{plan.name}</h3>
                                <p className="mt-1 text-slate-500 dark:text-slate-400">
                                    {plan.desc}
                                </p>

                                {/* Pricing with discount */}
                                <div className="mt-4">
                                    {billing === "yearly" && (
                                        <p className="text-sm text-slate-400 line-through">
                                            ₦{discount.toLocaleString()}
                                        </p>
                                    )}
                                    <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                                        ₦{basePrice.toLocaleString()}
                                        <span className="text-lg font-normal text-slate-500 ml-1">
                                            /{billing === "monthly" ? "m" : "yr"}
                                        </span>
                                    </p>
                                </div>

                                <ul className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-400 text-left">
                                    {plan.features.map((f) => (
                                        <li key={f}>✓ {f}</li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <div className="mt-8 flex justify-center">
                                    <a
                                        onClick={() => {
                                            window.location.hash = "contact";
                                            localStorage.setItem("selectedPlan", JSON.stringify({
                                                name: plan.name,
                                                price: billing === "monthly" ? `${plan.monthly}/m` : `${plan.yearly}/yr`
                                            }));
                                            window.dispatchEvent(new Event("planSelected"));
                                        }}
                                        className="relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                                    >
                                        Choose {plan.name}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <p className="mt-8 text-sm text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                    Pay monthly or yearly. Cancel anytime. Start today and let your
                    website work for you.
                </p>
            </div>
        </motion.section>
    );
};

export default PricingSection;
