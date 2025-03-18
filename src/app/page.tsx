'use client';  

import { motion } from "framer-motion";
import React from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutAmora from "@/components/AboutAmora";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import OccasionsSection from "@/components/OccasionsSection";
import CustomerStories from "@/components/CustomerStories";
import PremiumGifting from "@/components/PremiumGifting";
import WhyChooseAmora from "@/components/WhyChooseAmora";
import BlogSection from "@/components/BlogSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import LovedOnesSection from "@/components/LovedOnesSection";
import ClientOnly from '@/components/ClientOnly'

export default function Home() {
  // Move animations config outside of render
  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <ClientOnly>
        <Navbar />
      </ClientOnly>
      
      <motion.div 
        className="scroll-smooth"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.section 
          className="min-h-[calc(100vh-4rem)] relative"
          variants={fadeInUp}
        >
          <HeroSection />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <AboutAmora />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <HowItWorks />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <ServicesSection />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <OccasionsSection />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <LovedOnesSection />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <CustomerStories />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <PremiumGifting />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <WhyChooseAmora />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <BlogSection />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <PricingSection />
        </motion.section>

        <motion.section variants={fadeInUp}>
          <FAQSection />
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  );
}

// Error boundary component for handling runtime errors gracefully
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600">Please try refreshing the page</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}