"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Gift, Sparkles, User, Users } from "lucide-react"

const quotes = [
  "TIMELESS MOMENTS, ENDLESS LOVE",
  "CRAFTING MEMORIES WITH GRACE",
  "WHERE ROMANCE MEETS ELEGANCE",
  "LUXURY IN EVERY DETAIL",
]

export default function HeroSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.9])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section 
      style={{ opacity, scale }}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black pt-24 sm:pt-28 md:pt-32"
    >
      {/* Background Video with Enhanced Filter */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover opacity-70"
          style={{ 
            filter: "contrast(120%) brightness(105%) saturate(110%)",
            objectPosition: "center center" 
          }}
        >
          <source src="/assets/videos/romance.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/70" />

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Quote with Enhanced Animation */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentQuote}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-base sm:text-lg text-rose-200/90 tracking-[0.25em] uppercase"
            >
              {quotes[currentQuote]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Enhanced Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-7xl sm:text-8xl md:text-9xl text-white mb-16 tracking-tight relative"
        >
          <span className="relative">
            Love & Peace
            <motion.span
              className="absolute -top-8 -right-8 text-rose-300"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.span>
          </span>
        </motion.h1>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-6"
        >
          <Button 
            className="group bg-white text-red-600 font-bold hover:bg-white/90 rounded-full px-10 py-7 text-base tracking-wide transition-all duration-300"
          >
            Begin the Journey
            <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/loved-ones'}
            className="group relative overflow-hidden font-bold border-white/30 text-red-600 rounded-full px-10 py-7 text-base tracking-wide transition-all duration-300 hover:border-white/50 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)] before:absolute before:inset-0 before:-z-10 before:translate-y-[200%] before:bg-white/15 before:transition-transform before:duration-300 hover:before:translate-y-0"
          >
            Loved Ones 
            <Gift className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  )
}
