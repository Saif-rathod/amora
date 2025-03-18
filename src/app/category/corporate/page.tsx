"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Gift, Heart, Star, Calendar, Users, Package, Trophy,
  Phone, Search, Mail, ShoppingCart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Gift = {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  stock: number;
  description: string;
};

const corporateGifts = [
  {
    id: 1,
    name: "Executive Gift Box",
    price: 149.99,
    rating: 4.8,
    reviews: 124,
    image: "/assets/images/lover.webp",
    category: "premium",
    stock: 15,
    description: "Luxury curated box with premium items for executives"
  },
  {
    id: 2,
    name: "Team Celebration Pack",
    price: 299.99,
    rating: 4.9,
    reviews: 89,
    image: "/assets/images/love.webp",
    category: "team",
    stock: 8,
    description: "Perfect for celebrating team achievements"
  },
  {
    id: 3,
    name: "Client Appreciation Set",
    price: 199.99,
    rating: 4.7,
    reviews: 156,
    image: "/assets/images/date.webp",
    category: "client",
    stock: 12,
    description: "Show gratitude to valuable clients"
  },
  {
    id: 4,
    name: "Holiday Special Bundle",
    price: 249.99,
    rating: 4.6,
    reviews: 92,
    image: "/api/placeholder/400/300",
    category: "seasonal",
    stock: 20,
    description: "Festive gift collection for special occasions"
  }
];

const features = [
  {
    icon: Package,
    title: "Custom Packaging",
    description: "Personalized gift packaging with your company branding"
  },
  {
    icon: Calendar,
    title: "Scheduled Delivery",
    description: "Plan your gifting campaigns in advance"
  },
  {
    icon: Users,
    title: "Bulk Orders",
    description: "Special pricing for large corporate orders"
  },
  {
    icon: Trophy,
    title: "Premium Quality",
    description: "Only the finest products in every gift"
  }
];

const CorporateGiftsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<Gift[]>([]);

  const filteredGifts = corporateGifts.filter(gift => {
    const matchesCategory = selectedCategory === "all" || gift.category === selectedCategory;
    const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        gift.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (gift: Gift) => {
    setCartItems([...cartItems, gift]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative py-32 bg-gradient-to-br from-red-600 via-red-500 to-red-400 rounded-b-[3rem] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-20 mix-blend-overlay" />
        <div className="container mx-auto px-4 sm:px-8 lg:px-24">
          <div className="max-w-3xl relative">
            {/* <Badge variant="secondary" className="mb-6 text-lg px-6 py-2 rounded-full bg-white/90 text-red-600 shadow-lg">
              Premium Corporate Gifting Solutions
            </Badge> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
              Elevate Your Business Relationships
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-white/90">
              Create lasting impressions with our curated collection of premium corporate gifts
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 bg-white text-red-600 hover:bg-red-100 shadow-lg transition duration-300">
                Explore Catalog
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white/10 transition duration-300">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-24 mt-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search gifts..."
                className="pl-10 rounded-full border-gray-200 focus:ring-2 focus:ring-red-500 transition duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Tabs value={selectedCategory} className="w-full md:w-auto">
              <TabsList className="inline-flex p-1 bg-gray-50 rounded-full shadow-md">
                <TabsTrigger value="all" onClick={() => setSelectedCategory("all")} className="rounded-full hover:bg-red-100 transition duration-300">
                  All
                </TabsTrigger>
                <TabsTrigger value="premium" onClick={() => setSelectedCategory("premium")} className="rounded-full hover:bg-red-100 transition duration-300">
                  Premium
                </TabsTrigger>
                <TabsTrigger value="team" onClick={() => setSelectedCategory("team")} className="rounded-full hover:bg-red-100 transition duration-300">
                  Team
                </TabsTrigger>
                <TabsTrigger value="client" onClick={() => setSelectedCategory("client")} className="rounded-full hover:bg-red-100 transition duration-300">
                  Client
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-24 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {filteredGifts.map((gift) => (
            <Card key={gift.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 rounded-lg border-2 border-burgundy bg-white">
              <div className="relative w-full h-64 overflow-hidden rounded-lg">
                <img
                  src={gift.image}
                  alt={gift.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                />
                {gift.stock < 10 && (
                  <Badge className="absolute top-3 right-3 bg-red-600 text-white rounded-full shadow-lg">
                    Only {gift.stock} left
                  </Badge>
                )}
              </div>
              <CardHeader className="space-y-2 p-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl font-semibold">{gift.name}</CardTitle>
                  <Badge variant="secondary" className="bg-gray-100 rounded-full">
                    {gift.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2 text-gray-600">
                  {gift.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{gift.rating}</span>
                  <span className="text-gray-500">({gift.reviews} reviews)</span>
                </div>
                <p className="text-2xl font-bold text-red-600">${gift.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between gap-4 p-4">
                <Button variant="outline" className="rounded-full flex-1 hover:bg-gray-100 transition duration-300">
                  <Heart className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button 
                  className="rounded-full flex-1 bg-red-600 hover:bg-red-700 transition duration-300"
                  onClick={() => addToCart(gift)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-28 bg-gray-50 rounded-[3rem] my-12">
        <div className="container mx-auto px-4 sm:px-8 lg:px-24">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-red-600">Why Choose Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We understand the importance of making the right impression. Our corporate gifting solutions are designed to help you build and strengthen business relationships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center p-8 hover:shadow-lg transition-all duration-300 border-none bg-white rounded-3xl group hover:-translate-y-1">
                <CardContent>
                  <div className="mb-6 inline-flex p-4 rounded-2xl bg-red-50 group-hover:bg-red-100 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4 text-red-600">Get Started</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Make an Impact?</h2>
            <p className="text-gray-600 mb-8">
              Our corporate gifting specialists are here to help you create the perfect gifting strategy for your business
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 bg-red-600 hover:bg-red-700 transition duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Schedule a Consultation
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 hover:bg-gray-100 transition duration-300">
                <Mail className="w-5 h-5 mr-2" />
                Email Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CorporateGiftsPage;