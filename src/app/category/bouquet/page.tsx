"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { FaArrowUp, FaArrowLeft, FaShoppingCart } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"

const BouquetPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const bouquets = [
    {
      id: 1,
      name: "Romantic Rose Bouquet",
      price: 89.99,
      image: "/assets/images/bouquets/redroses.webp",
      description: "Beautiful arrangement of red and pink roses with baby's breath",
    },
    {
      id: 2,
      name: "Elegant White Roses",
      price: 79.99,
      image: "/assets/images/bouquets/whiterose.webp",
      description: "Stunning bouquet of pure white roses for a touch of elegance",
    },
    {
        id: 3,
        name: "Elegant White Roses",
        price: 79.99,
        image: "/assets/images/bouquets/whiterose.webp",
        description: "Stunning bouquet of pure white roses for a touch of elegance",
      },
      {
        id: 4,
        name: "Elegant White Roses",
        price: 79.99,
        image: "/assets/images/bouquets/whiterose.webp",
        description: "Stunning bouquet of pure white roses for a touch of elegance",
      },
      {
        id: 5,
        name: "Elegant White Roses",
        price: 79.99,
        image: "/assets/images/bouquets/download.webp",
        description: "Stunning bouquet of pure white roses for a touch of elegance",
      },
      {
        id: 6,
        name: "Elegant White Roses",
        price: 79.99,
        image: "/assets/images/bouquets/whiterose.webp",
        description: "Stunning bouquet of pure white roses for a touch of elegance",
      },
      {
        id: 7,
        name: "Elegant White Roses",
        price: 79.99,
        image: "/assets/images/bouquets/whiterose.webp",
        description: "Stunning bouquet of pure white roses for a touch of elegance",
      },
      {
        id: 8,
        name: "Elegant White Roses",
        price: 79.99,
        image: "/assets/images/bouquets/whiterose.webp",
        description: "Stunning bouquet of pure white roses for a touch of elegance",
      },
      {
        id: 9,
        name: "Elegant White Roses",
        price: 79.99,
        image: "/assets/images/bouquets/whiterose.webp",
        description: "Stunning bouquet of pure white roses for a touch of elegance",
      }
    // ... (other bouquet items)
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 rounded-b-[4rem] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Luxury Bouquets
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-3xl mx-auto">
              Handcrafted with love for your special moments
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 lg:px-24 py-16 relative z-10 -mt-16">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-12 group bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300"
        >
          <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="text-lg font-medium">Back to Home</span>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {bouquets.map((bouquet, index) => (
            <div
              key={bouquet.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image src={bouquet.image || "/placeholder.svg"} alt={bouquet.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">{bouquet.name}</h3>
                  <span className="text-3xl font-bold text-white drop-shadow-md">${bouquet.price.toFixed(2)}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{bouquet.description}</p>
                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full transition-all duration-300 flex items-center justify-center space-x-2 group hover:shadow-lg">
                  <FaShoppingCart className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <FaArrowUp />
        </button>
      )}

      <Footer />
    </div>
  )
}

export default BouquetPage

