"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ChevronUp, ShoppingCart, Star, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface GiftItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string[];
  rating: number;
  reviews: number;
}

const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const giftItems: GiftItem[] = [
    {
      id: "1",
      name: "Luxury Birthday Gift Box",
      price: 89.99,
      description:
        "A carefully curated collection of premium birthday treats including artisanal chocolates, scented candles, and personalized items.",
      image: "/assets/images/flower photos/flower9.webp",
      category: ["premium", "bestseller"],
      rating: 4.8,
      reviews: 156,

    },
    {
      id: "2",
      name: "Personalized Photo Album",
      price: 49.99,
      description:
        "Custom-made photo album with high-quality prints and personalized messages to capture precious memories.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      category: ["personalized"],
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "3",
      name: "Gourmet Hamper",
      price: 129.99,
      description:
        "Luxurious hamper filled with fine wines, gourmet snacks, and birthday treats perfect for celebration.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: ["premium", "food"],
      rating: 4.7,
      reviews: 203,
    },
    {
      id: "4",
      name: "Gourmet Hamper",
      price: 129.99,
      description:
        "Luxurious hamper filled with fine wines, gourmet snacks, and birthday treats perfect for celebration.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: ["premium", "food"],
      rating: 4.7,
      reviews: 203,
    },
    {
      id: "5",
      name: "Gourmet Hamper",
      price: 129.99,
      description:
        "Luxurious hamper filled with fine wines, gourmet snacks, and birthday treats perfect for celebration.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: ["premium", "food"],
      rating: 4.7,
      reviews: 203,
    },
    {
      id: "6",
      name: "Gourmet Hamper",
      price: 129.99,
      description:
        "Luxurious hamper filled with fine wines, gourmet snacks, and birthday treats perfect for celebration.",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
      category: ["premium", "food"],
      rating: 4.7,
      reviews: 203,
    },
  ];
  

  const filteredItems = selectedFilter === "all"
    ? giftItems
    : giftItems.filter(item => item.category.includes(selectedFilter));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (item: GiftItem) => {
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      
      <div className="relative h-[80vh] bg-[#faf9f8] overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-transparent to-purple-50 opacity-70" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.2\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center animate-fade-up">
            <span className="inline-block px-6 py-2 mb-6 text-sm font-medium bg-white/80 rounded-full backdrop-blur-md text-gray-800 shadow-sm animate-float">
              Discover Perfect Gifts
            </span>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-800 mb-8 leading-tight">
              Birthday{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
                Gifts
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-3xl mx-auto mb-12">
              Thoughtfully curated gifts that make every celebration extraordinary
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Shop Now
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-lg border-2 hover:bg-gray-50 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 to-transparent" />
      </div>

      {/* Search and Filters Section */}
      <main className="container mx-auto px-4 lg:px-8 py-16 relative z-10 -mt-20">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-gray-100/50">
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Search for the perfect gift..."
              className="w-full h-14 pl-14 pr-6 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 transition-all duration-300"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["all", "premium", "personalized", "food", "bestseller"].map(
              (filter) => (
                <Button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  className={`rounded-full px-6 py-2 capitalize transition-all duration-300 ${selectedFilter === filter
                      ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      : "hover:bg-rose-50 border-rose-200"
                    }`}
                >
                  {filter === "all" ? "All Gifts" : filter}
                </Button>
              )
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 mt-12">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-500 hover:shadow-xl animate-scale-fade"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.category.map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-md"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(item.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-gray-200 text-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {item.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({item.reviews} reviews)
                  </span>
                </div>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl py-6 transition-all duration-300 flex items-center justify-center space-x-2 group overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
                    Add to Cart
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        
        <section className="mt-32 bg-white/70 backdrop-blur-md rounded-3xl p-12 border border-gray-100/50 shadow-lg">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Choose Our Birthday Gifts?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Curated Selection",
                description:
                  "Hand-picked gifts for every personality and style preference",
                icon: "✨",
              },
              {
                title: "Luxury Packaging",
                description:
                  "Premium gift wrapping for an elevated unboxing experience",
                icon: "🎁",
              },
              {
                title: "Guaranteed Delivery",
                description: "On-time delivery with real-time tracking updates",
                icon: "🚚",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-rose-50 to-purple-50 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-300 text-4xl shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900 group-hover:text-rose-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 max-w-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>


      <Footer />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-rose-500 transition-all duration-300 hover:scale-110 z-50 ${showBackToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        aria-label="Back to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Index;