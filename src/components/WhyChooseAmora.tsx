"use client"

import React from 'react';
import { Clock, Gift, Heart, Coffee, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function WhyChooseAmora() {
  const features = [
    {
      title: "Time-Saving",
      description: "Smart reminders & automated planning",
      icon: Clock,
      gradient: "from-pink-500 to-rose-500",
      image: "/assets/images/flower photos/flower1.webp"
    },
    {
      title: "Curated Gifts",
      description: "Handpicked selections for every occasion",
      icon: Gift,
      gradient: "from-rose-500 to-red-500",
      image: "/assets/images/flower photos/flower2.webp"
    },
    {
      title: "Stronger Bonds",
      description: "Never miss special moments",
      icon: Heart,
      gradient: "from-red-500 to-orange-500",
      image: "/assets/images/flower photos/flower3.webp"
    },
    {
      title: "Stress-Free",
      description: "We handle all the details",
      icon: Coffee,
      gradient: "from-orange-500 to-yellow-500",
      image: "/assets/images/flower photos/flower4.webp"
    },
  ];

  const stats = [
    { 
      value: "10k+",
      label: "Happy Customers",
      icon: Sparkles
    },
    { 
      value: "20k+",
      label: "Gifts Delivered",
      icon: Gift
    },
    { 
      value: "98%",
      label: "On-Time Delivery",
      icon: CheckCircle2
    }
  ];

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-500/10 via-red-500/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-rose-950 text-left mb-4 title">
            Why Choose Amora
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 rounded-full" />
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="relative p-8">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500",
                  "bg-gradient-to-br",
                  feature.gradient
                )}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Stats Background */}
          <div className="absolute inset-0">
            <Image
              src="/assets/images/flower photos/flower5.webp"
              alt="Background"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/90 to-red-500/90" />
          </div>

          {/* Stats Content */}
          <div className="relative grid md:grid-cols-3 gap-8 md:gap-12 p-8 md:p-12">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col items-center text-center space-y-2"
              >
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-white group-hover:text-rose-100 transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-rose-100 font-medium text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}