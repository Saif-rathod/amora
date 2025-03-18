"use client"

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Gift, Sparkles, Crown, Diamond, Heart } from "lucide-react";

export default function PremiumGifting() {
  const gifts = [
    {
      title: "Luxury Boxes",
      highlight: "Handcrafted",
      image: "/assets/images/customized/customized8.webp",
      price: "From ₹1999",
      icon: Diamond,
      color: "from-violet-500 to-purple-500"
    },
    {
      title: "Custom Gifts",
      highlight: "Personalized",
      image: "/assets/images/customized/customized%2025.webp",
      price: "From ₹9999",
      icon: Crown,
      color: "from-amber-500 to-yellow-500"
    },
    {
      title: "Premium Flowers",
      highlight: "Fresh Daily",
      image: "/assets/images/customized/customized%2027.webp",
      price: "From ₹1499",
      icon: Heart,
      color: "from-rose-500 to-pink-500"
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/90 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,228,230,0.3)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_120%,rgba(254,205,211,0.4)_0%,transparent_60%)]" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-20"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 blur-xl" />
            <div className="relative bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-rose-100/50">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-medium tracking-wide">
                Exclusive Collection
              </span>
            </div>
          </div>
        </motion.div>

        {/* Gift Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {gifts.map((gift, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative h-[340px] overflow-hidden">
                  <Image
                    src={gift.image}
                    alt={gift.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                    priority={index === 0}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Badge */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="absolute top-4 left-4"
                  >
                    <div className="bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium">
                      <span className={`bg-gradient-to-r ${gift.color} bg-clip-text text-transparent`}>
                        {gift.highlight}
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Icon Badge */}
                  <div className={`absolute -top-8 right-6 bg-gradient-to-br ${gift.color} p-3 rounded-2xl shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                    <gift.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {gift.title}
                    </h3>
                    <span className={`bg-gradient-to-r ${gift.color} bg-clip-text text-transparent font-medium text-sm`}>
                      {gift.price}
                    </span>
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${gift.color} text-white rounded-xl py-3 transition-all duration-300 hover:shadow-lg hover:opacity-90`}
                  >
                    Explore
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}