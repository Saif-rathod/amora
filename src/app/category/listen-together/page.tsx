'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'

import { useState } from 'react';

export default function ListenTogether() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        <Image
          src="/assets/images/love.webp"
          alt="Share Music Hero"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80">
          <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center">
            <div className="max-w-2xl text-white text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 leading-tight">
                Gift a Song
              </h1>
              <p className="text-lg md:text-xl mb-8 leading-relaxed">
                Send more than just music - share emotions, memories, and moments wrapped in melodies.
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/25">
                Create a Musical Gift
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 md:px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          How to Share Your Musical Gift
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 hover:transform hover:scale-105 transition-all border border-purple-500/20">
              <div className="absolute -top-6 left-8 h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-4 text-white">Choose Your Song</h3>
              <p className="text-gray-300">Select the perfect track that expresses your feelings or captures a special memory.</p>
            </div>
          </div>
          {/* Step 2 */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 hover:transform hover:scale-105 transition-all border border-purple-500/20">
              <div className="absolute -top-6 left-8 h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-4 text-white">Add Your Message</h3>
              <p className="text-gray-300">Write a personal note explaining why this song matters and what it means to you.</p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-6 md:p-8 hover:transform hover:scale-105 transition-all border border-purple-500/20">
              <div className="absolute -top-6 left-8 h-12 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-4 text-white">Send with Love</h3>
              <p className="text-gray-300">Share your musical gift instantly - they'll receive a beautiful interactive experience.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Gifts Section */}
      <div className="container mx-auto px-4 md:px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Popular Gift Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Gift Card 1 */}
          <div className="group relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"/>
            <Image
              src="/assets/images/lover.webp"
              alt="Romantic Playlist"
              width={400}
              height={500}
              className="object-cover h-[300px] md:h-[400px] w-full group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20">
              <h3 className="text-xl font-semibold mb-2 text-white">Romantic Collection</h3>
              <p className="text-sm text-gray-300">Perfect for anniversaries and date nights</p>
            </div>
          </div>
          {/* Gift Card 2 */}
          <div className="group relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"/>
            <Image
              src="/assets/images/love.webp"
              alt="Friendship Songs"
              width={400}
              height={500}
              className="object-cover h-[300px] md:h-[400px] w-full group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20">
              <h3 className="text-xl font-semibold mb-2 text-white">Friendship Vibes</h3>
              <p className="text-sm text-gray-300">Songs that celebrate special friendships</p>
            </div>
          </div>
          {/* Gift Card 3 */}
          <div className="group relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"/>
            <Image
              src="/assets/images/date.webp"
              alt="Motivational Mix"
              width={400}
              height={500}
              className="object-cover h-[300px] md:h-[400px] w-full group-hover:scale-110 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 p-4 md:p-6 z-20">
              <h3 className="text-xl font-semibold mb-2 text-white">Motivation Mix</h3>
              <p className="text-sm text-gray-300">Boost someone's day with energetic tracks</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-3xl p-8 md:p-12 text-center backdrop-blur-lg border border-purple-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Share Some Music Magic?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Create a musical gift that will touch their heart and make their day special.
          </p>
          <button className="bg-white text-purple-900 px-6 md:px-8 py-3 md:py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all">
            Start Creating
          </button>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full md:w-1/2 p-2 rounded-lg border border-purple-500"
        />
      </div>

      {/* Social Media Share Section */}
      <div className="container mx-auto px-4 md:px-6 py-4 text-center">
        <h3 className="text-lg text-white mb-2">Share Your Gift:</h3>
        <div className="flex justify-center space-x-4">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Facebook</a>
          <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white px-4 py-2 rounded-lg">Twitter</a>
          <a href={`https://www.instagram.com/?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="bg-purple-500 text-white px-4 py-2 rounded-lg">Instagram</a>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-4 right-4">
        <button onClick={scrollToTop} className="bg-purple-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-600">
          Back to Top
        </button>
      </div>

      <Footer />
    </div>
  )
}
