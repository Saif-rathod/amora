"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function OccasionsSection() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const occasions = [
    {
      title: "Mountain Adventures",
      description: "Explore the heights of nature",
      image: "/assets/images/celebration/celebration 16.webp",
      className: "col-span-2 h-[200px] sm:h-[250px] md:h-[300px]",
      link: "/occasions/mountain",
      tag: "Popular"
    },
    {
      title: "Urban Exploration",
      description: "Navigate city streets and hidden gem",
      image: "/assets/images/final for celebration/celebration(15).jpg",
      className: "col-span-2 h-[200px] sm:h-[250px] md:h-[300px]",
      link: "/occasions/urban",
      tag: "Trending"
    },
    {
      title: "Lake Escapes",
      description: "Discover serene waters and breathtaking views",
      image: "/assets/images/couple photos/love.webp",
      className: "col-span-3 row-span-2 h-[420px] sm:h-[520px] md:h-[620px]",
      link: "/occasions/lake",
      tag: "Featured"
    },
    {
      title: "Travel Companions",
      description: "Share adventures with friends",
      image: "/assets/images/celebration/celebration 13.webp",
      className: "col-span-2 h-[200px] sm:h-[250px] md:h-[300px]",
      link: "/occasions/travel",
      tag: "New"
    },
    {
      title: "Nature Photography",
      description: "Capture moments in the wild",
      image: "/assets/images/final for celebration/celebration(22).webp",
      className: "col-span-2 h-[200px] sm:h-[250px] md:h-[300px]",
      link: "/occasions/nature",
      tag: "Popular"
    }
  ];

  const handleNavigation = (link: string) => {
    try {
      router.push(link);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-8 md:py-16">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-rose-950 text-left mb-4 title">
            Special Occasions
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 rounded-full" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Discover Amazing Experiences
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Explore our handpicked collection of unforgettable adventures and create lasting memories
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-7 gap-2 sm:gap-3 md:gap-4"
        >
          <div className="col-span-2 grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
            {[occasions[0], occasions[1]].map((occasion, index) => (
              <motion.div 
                key={index}
                variants={item}
                className={`relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl ${occasion.className} 
                  group cursor-pointer transition-all duration-500 ease-in-out hover:scale-[1.02]
                  shadow-lg hover:shadow-2xl`}
                onClick={() => handleNavigation(occasion.link)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                {mounted && (
                  <>
                    <Image
                      src={occasion.image}
                      alt={occasion.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 28vw, (max-width: 768px) 28vw, 28vw"
                      loading="lazy"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                        console.error(`Failed to load image: ${occasion.image}`);
                      }}
                    />
                    <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 
                      bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full
                      text-xs sm:text-sm font-medium text-gray-800 shadow-md">
                      {occasion.tag}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 
                      group-hover:to-black/70 transition-all duration-300">
                      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 text-white">
                        <motion.h3 
                          className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredIndex === index ? 0 : 20,
                            opacity: hoveredIndex === index ? 1 : 0.8
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {occasion.title}
                        </motion.h3>
                        <motion.p 
                          className="text-xs sm:text-sm line-clamp-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredIndex === index ? 0 : 20,
                            opacity: hoveredIndex === index ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {occasion.description}
                        </motion.p>
                        <motion.button
                          className="hidden sm:block mt-3 md:mt-4 bg-white/20 backdrop-blur-sm text-white 
                            px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-white/30 
                            transition-all duration-300 text-xs sm:text-sm font-medium
                            border border-white/30"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredIndex === index ? 0 : 20,
                            opacity: hoveredIndex === index ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          Explore More
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div 
            variants={item}
            className={`relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl ${occasions[2].className} 
              group cursor-pointer transition-all duration-500 ease-in-out hover:scale-[1.02]
              shadow-lg hover:shadow-2xl`}
            onClick={() => handleNavigation(occasions[2].link)}
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
            {mounted && (
              <>
                <Image
                  src={occasions[2].image}
                  alt={occasions[2].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 42vw, (max-width: 768px) 42vw, 42vw"
                  loading="lazy"
                  onError={(e: any) => {
                    e.target.style.display = 'none';
                    console.error(`Failed to load image: ${occasions[2].image}`);
                  }}
                />
                <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 
                  bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full
                  text-xs sm:text-sm font-medium text-gray-800 shadow-md">
                  {occasions[2].tag}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 
                  group-hover:to-black/70 transition-all duration-300">
                  <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 text-white">
                    <motion.h3 
                      className="text-base sm:text-lg md:text-2xl font-bold mb-1 sm:mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredIndex === 2 ? 0 : 20,
                        opacity: hoveredIndex === 2 ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {occasions[2].title}
                    </motion.h3>
                    <motion.p 
                      className="text-xs sm:text-sm line-clamp-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredIndex === 2 ? 0 : 20,
                        opacity: hoveredIndex === 2 ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {occasions[2].description}
                    </motion.p>
                    <motion.button
                      className="hidden sm:block mt-3 md:mt-4 bg-white/20 backdrop-blur-sm text-white 
                        px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-white/30 
                        transition-all duration-300 text-xs sm:text-sm font-medium
                        border border-white/30"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredIndex === 2 ? 0 : 20,
                        opacity: hoveredIndex === 2 ? 1 : 0
                      }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      Discover More
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>

          <div className="col-span-2 grid grid-cols-1 gap-2 sm:gap-3 md:gap-4">
            {[occasions[3], occasions[4]].map((occasion, index) => (
              <motion.div 
                key={index}
                variants={item}
                className={`relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl ${occasion.className} 
                  group cursor-pointer transition-all duration-500 ease-in-out hover:scale-[1.02]
                  shadow-lg hover:shadow-2xl`}
                onClick={() => handleNavigation(occasion.link)}
                onMouseEnter={() => setHoveredIndex(index + 3)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                {mounted && (
                  <>
                    <Image
                      src={occasion.image}
                      alt={occasion.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 28vw, (max-width: 768px) 28vw, 28vw"
                      loading="lazy"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                        console.error(`Failed to load image: ${occasion.image}`);
                      }}
                    />
                    <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 
                      bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full
                      text-xs sm:text-sm font-medium text-gray-800 shadow-md">
                      {occasion.tag}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 
                      group-hover:to-black/70 transition-all duration-300">
                      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6 text-white">
                        <motion.h3 
                          className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredIndex === index + 3 ? 0 : 20,
                            opacity: hoveredIndex === index + 3 ? 1 : 0.8
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {occasion.title}
                        </motion.h3>
                        <motion.p 
                          className="text-xs sm:text-sm line-clamp-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredIndex === index + 3 ? 0 : 20,
                            opacity: hoveredIndex === index + 3 ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        >
                          {occasion.description}
                        </motion.p>
                        <motion.button
                          className="hidden sm:block mt-3 md:mt-4 bg-white/20 backdrop-blur-sm text-white 
                            px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-white/30 
                            transition-all duration-300 text-xs sm:text-sm font-medium
                            border border-white/30"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredIndex === index + 3 ? 0 : 20,
                            opacity: hoveredIndex === index + 3 ? 1 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.2 }}
                        >
                          Explore More
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}