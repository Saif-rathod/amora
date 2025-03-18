"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, Gift, Flower, Sparkles } from 'lucide-react';

const services = [
  {
    title: 'Event Planning',
    highlight: 'Seamless',
    icon: Calendar,
    image: '/assets/images/final for celebration/celebration(23).webp',
    color: 'from-blue-500 to-indigo-500'
  },
  {
    title: 'Gift Curation',
    highlight: 'Personalized',
    icon: Gift,
    image: '/assets/images/final for gifts/gift(2).webp',
    color: 'from-rose-500 to-pink-500'
  },
  {
    title: 'Flower Arrangements',
    highlight: 'Fresh Daily',
    icon: Flower,
    image: '/assets/images/final for celebration/celebration(22).webp',
    color: 'from-emerald-500 to-green-500'
  },
  {
    title: 'Custom Celebrations',
    highlight: 'Unique',
    icon: Sparkles,
    image: '/assets/images/final for celebration/celebration(28).webp',
    color: 'from-amber-500 to-yellow-500'
  }
];

const ServicesSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50/90 to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(254,205,211,0.2)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(254,205,211,0.3)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center mb-16"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 blur-xl" />
            <div className="relative bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-rose-100/50">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent font-medium">
                Our Services
              </span>
            </div>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl">
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
                      <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                        {service.highlight}
                      </span>
                    </div>
                  </motion.div>
                </div>
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Icon Badge */}
                  <div className={`absolute -top-8 right-6 bg-gradient-to-br ${service.color} p-3 rounded-2xl shadow-lg transform transition-transform duration-300 group-hover:scale-110`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-medium bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {service.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;