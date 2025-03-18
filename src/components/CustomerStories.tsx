'use client';

import { useEffect, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Sarah L.",
    rating: 5,
    text: "Amora has revolutionized my gift-giving experience! The personalized reminders ensure I never miss an important date.",
    image: "/assets/images/headshot/headshot(1).webp",
    position: "Busy Professional",
  },
  {
    name: "Michael R.",
    rating: 5,
    text: "As someone who often struggles to find the perfect gift, Amora has been a game-changer.",
    image: "/assets/images/headshot/headshot(2).webp",
    position: "Entrepreneur",
  },
  {
    name: "Emily T.",
    rating: 4,
    text: "The stress-free planning that Amora offers is a breath of fresh air.",
    image: "/assets/images/headshot/headshot(3).webp",
    position: "Teacher",
  },
  {
    name: "David K.",
    rating: 5,
    text: "Amora has saved my relationships multiple times. The timely reminders have turned me into a considerate partner.",
    image: "/assets/images/headshot/headshot(4).webp",
    position: "Software Engineer",
  },
  {
    name: "Lisa M.",
    rating: 5,
    text: "Amora has made me the favorite aunt in the family! I never miss a birthday or special occasion now.",
    image: "/assets/images/headshot/headshot(5).webp",
    position: "Marketing Manager",
  },
  {
    name: "James P.",
    rating: 4,
    text: "The reminders and gift suggestions have helped me maintain strong relationships with friends and family.",
    image: "/assets/images/headshot/headshot(6).webp",
    position: "Freelance Writer",
  },
  {
    name: "Sophia R.",
    rating: 5,
    text: "From reminders to gift selection and delivery, it's like having a personal gift concierge!",
    image: "/assets/images/headshot/headshot(7).webp",
    position: "Architect",
  },
];

export default function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/flower photos/rosebg1_enhanced.webp"
          alt="Background Image"
          fill
          className="object-cover object-center"
          quality={100}
          priority
        />
        {/* Adding a semi-transparent overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-rose-950 text-left mb-4 title">
            Customer Stories
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block text-rose-300 font-medium mb-4 text-lg"
          >
            Our Happy Customers
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Stories from the Heart
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-200 max-w-2xl mx-auto text-lg"
          >
            Discover how Amora has transformed the way people celebrate their relationships and cherish special moments.
          </motion.p>
        </motion.div>

        <div className="relative px-4 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <Card className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-none shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="relative">
                      <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                        <Image
                          src={reviews[currentIndex].image}
                          alt={reviews[currentIndex].name}
                          width={144}
                          height={144}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2.5 shadow-lg">
                        <Quote className="w-5 h-5 text-rose-500" />
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex justify-center md:justify-start items-center gap-1 mb-4">
                        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <Star className="w-6 h-6 fill-rose-500 text-rose-500" />
                          </motion.div>
                        ))}
                      </div>
                      <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xl md:text-2xl text-gray-800 font-medium italic mb-6 leading-relaxed"
                      >
                        "{reviews[currentIndex].text}"
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{reviews[currentIndex].name}</h3>
                        <p className="text-rose-600 font-medium">{reviews[currentIndex].position}</p>
                      </motion.div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="bg-white hover:bg-white shadow-xl rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              <ChevronLeft className="h-7 w-7 text-rose-600" />
            </Button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="bg-white hover:bg-white shadow-xl rounded-full w-14 h-14 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              <ChevronRight className="h-7 w-7 text-rose-600" />
            </Button>
          </div>
         
          {/* Slide Indicators */}
          <div className="flex justify-center mt-10 gap-3">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  index === currentIndex
                    ? "w-10 h-2.5 bg-rose-500 shadow-lg"
                    : "w-2.5 h-2.5 bg-white hover:bg-rose-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}