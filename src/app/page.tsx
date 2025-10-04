"use client";

import React from "react";
import { SparklesPreview } from "../components/homepage/SparklesPreview";
import { HeroRotating } from "@/components/homepage/HeroRotating";
import { FloatingNavDemo } from "@/components/homepage/FloatingNavbar";
import { ContactSection } from "@/components/homepage/ContactSection";
import { PortfolioSection } from "@/components/homepage/PortofolioSection";
import { AboutSpotlight } from "@/components/homepage/AboutSpotlight";
import { ScrollNavigator } from "@/components/ui/scroll-navigator";
import Footer from "@/components/homepage/Footer";
import PricingSection from "@/components/homepage/PricingSection";
import { ChatWidget } from "@/components/homepage/ChatWidget";
import FloatingChat from "@/components/homepage/FloatingChat";
import FloatingTestimonials from "@/components/homepage/FloatingTestimonials";
import FloatingLogo from "@/components/homepage/FloatingLogo";


export default function Home() {


  return (
    <main className="relative min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-pink-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-500">


      {/* FLOATING CHAT */}
      <FloatingChat />

      {/* SCROLL INDICATOR */}
      <ScrollNavigator />

      {/* FLOATING LOGO */}
      <FloatingLogo />

      {/* FLOATING TESTIMONIALS */}
      <FloatingTestimonials />

      {/* FLOATING NAVBAR */}
      <FloatingNavDemo />

      {/* HERO */}
      <SparklesPreview />

      {/* HeroStatic */}
      <HeroRotating />

      {/* PORTFOLIO */}
      <PortfolioSection />

      {/* PRICING */}
      <PricingSection />

      {/* create */}
      {/* Simple comparison table for accessibility */}


      {/* ABOUT */}
      <AboutSpotlight />

      {/* CONTACT */}
      <ContactSection />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}

/* Tailwind helper buttons */
<style jsx>{`
  .btn-primary { @apply inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:shadow-lg hover:scale-105 transition }
  .btn-outline { @apply inline-block border border-slate-300 dark:border-slate-600 px-6 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition }
`}</style>
