"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Cake, Flower, Heart, Gift, Calendar, Music4, Flower2, Component, CakeSlice, Dessert, User, Package, Crown, Menu, Grid, ChevronRight, X, Clock, Flame, IndianRupee, Sparkles, Home, Baby, Diamond, Users, Briefcase, Cookie, HeartHandshake, CreditCard, TrendingUp, TrendingDown, LogOut, ShoppingBag, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

interface Category {
  icon: React.ElementType;
  label: string;
  color: string;
  href: string;
}

interface SearchHistory {
  query: string;
  timestamp: number;
  type: 'search' | 'category';
}

interface PopularSearch {
  query: string;
  count: number;
  type: 'gift' | 'occasion' | 'category';
}

interface SearchSuggestion {
  text: string;
  type: 'suggestion' | 'category' | 'occasion';
  icon?: React.ElementType;
}

interface GiftRecipient {
  type: string;
  icon: React.ElementType;
  suggestions: string[];
}

interface TrendingTag {
  name: string;
  count: number;
  trending: 'up' | 'down' | 'hot';
}

const categories: Category[] = [
  { icon: Cake, label: "BIRTHDAY", color: "text-red-600 bg-rose-50/50 group-hover:bg-rose-100 group-hover:scale-105 font-bold uppercase", href: "/category/birthday" },
  { icon: Gift, label: "CORPORATE", color: "text-red-600 bg-purple-50 group-hover:bg-purple-100 font-bold uppercase", href: "/category/corporate" },
  { icon: Heart, label: "ANNIVERSARY", color: "text-red-600 bg-red-50/50 group-hover:bg-red-100 group-hover:scale-105 font-bold uppercase", href: "/category/anniversary" },
  { icon: Flower, label: "BOUQUET", color: "text-red-600 bg-pink-50 group-hover:bg-pink-100 font-bold uppercase", href: "/category/bouquet" },
  { icon: Gift, label: "PREMIUM", color: "text-violet-500 bg-violet-50/50 group-hover:bg-violet-100 group-hover:scale-105 font-bold uppercase", href: "/category/premium" },
  { icon: Calendar, label: "OCCASIONS", color: "text-sky-500 bg-sky-50 group-hover:bg-sky-100 font-bold uppercase", href: "/category/occasions" },
  { icon: Gift, label: "LUXURY", color: "text-amber-500 bg-amber-50 group-hover:bg-amber-100 font-bold uppercase", href: "/category/luxury" },
  { icon: Gift, label: "GIFTS TO ABROAD", color: "text-blue-500 bg-blue-50 group-hover:bg-blue-100 font-bold uppercase", href: "/category/gifts-to-abroad" },
  { icon: Music4, label: "LISTEN TOGETHER", color: "text-fuchsia-500 bg-fuchsia-50 group-hover:bg-fuchsia-100 font-bold uppercase", href: "/category/listen-together" },
  { icon: Flower2, label: "CITY FLOWER", color: "text-orange-500 bg-orange-50 group-hover:bg-orange-100 font-bold uppercase", href: "/category/flowers" },
  { icon: Component, label: "COMBO", color: "text-yellow-500 bg-yellow-50 group-hover:bg-yellow-100 font-bold uppercase", href: "/category/combo" },
  { icon: Gift, label: "PERSONALIZED", color: "text-emerald-500 bg-emerald-50 group-hover:bg-emerald-100 font-bold uppercase", href: "/category/personalized" },
  { icon: Dessert, label: "DESSERT", color: "text-red-500 bg-red-50 group-hover:bg-red-100 font-bold uppercase", href: "/category/dessert" },
  { icon: CakeSlice, label: "CAKES", color: "text-teal-500 bg-teal-50 group-hover:bg-teal-100 font-bold uppercase", href: "/category/cakes" },
];

const priceRanges = [
  { label: "UNDER ₹500", min: 0, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "₹1000 - ₹2000", min: 1000, max: 2000 },
  { label: "₹2000 - ₹5000", min: 2000, max: 5000 },
  { label: "ABOVE ₹5000", min: 5000, max: null },
];

const occasions = [
  { name: "BIRTHDAY", icon: CakeSlice },
  { name: "ANNIVERSARY", icon: Heart },
  { name: "VALENTINE'S DAY", icon: Heart },
  { name: "WEDDING", icon: Gift },
  { name: "GRADUATION", icon: Crown },
  { name: "CHRISTMAS", icon: Gift },
  { name: "MOTHER'S DAY", icon: Heart },
  { name: "FATHER'S DAY", icon: Gift },
  { name: "NEW YEAR", icon: Sparkles },
  { name: "HOUSEWARMING", icon: Home },
  { name: "BABY SHOWER", icon: Baby },
  { name: "ENGAGEMENT", icon: Diamond },
];

const popularSearches: PopularSearch[] = [
  { query: "BIRTHDAY GIFTS FOR MOM", count: 1200, type: 'gift' },
  { query: "ANNIVERSARY IDEAS", count: 980, type: 'occasion' },
  { query: "VALENTINE'S DAY", count: 850, type: 'occasion' },
  { query: "FLOWERS", count: 750, type: 'category' },
  { query: "LAST MINUTE GIFTS", count: 600, type: 'gift' },
  { query: "PERSONALIZED GIFTS", count: 580, type: 'category' },
  { query: "GIFT BASKETS", count: 520, type: 'category' },
  { query: "BIRTHDAY CAKES", count: 480, type: 'category' },
];

const searchSuggestions: Record<string, SearchSuggestion[]> = {
  'birth': [
    { text: 'BIRTHDAY GIFTS', type: 'category' },
    { text: 'BIRTHDAY CAKES', type: 'category' },
    { text: 'BIRTHDAY DECORATIONS', type: 'category' },
  ],
  'ann': [
    { text: 'ANNIVERSARY GIFTS', type: 'category' },
    { text: 'ANNIVERSARY FLOWERS', type: 'category' },
    { text: 'ANNIVERSARY CAKES', type: 'category' },
  ],
  'flow': [
    { text: 'FLOWERS BOUQUET', type: 'category' },
    { text: 'FLOWER ARRANGEMENTS', type: 'category' },
    { text: 'FLOWERING PLANTS', type: 'category' },
  ],
};

const giftRecipients: GiftRecipient[] = [
  { 
    type: "MOM",
    icon: Heart,
    suggestions: ["JEWELRY", "SPA DAY", "PHOTO FRAME", "FLOWERS"]
  },
  {
    type: "DAD",
    icon: User,
    suggestions: ["WATCH", "WALLET", "GOLF SET", "ELECTRONICS"]
  },
  {
    type: "PARTNER",
    icon: Heart,
    suggestions: ["DATE NIGHT", "JEWELRY", "CUSTOM PORTRAIT", "EXPERIENCE GIFT"]
  },
  {
    type: "FRIEND",
    icon: Users,
    suggestions: ["BOARD GAMES", "MOVIE TICKETS", "GIFT CARDS", "CUSTOM MUG"]
  },
  {
    type: "COLLEAGUE",
    icon: Briefcase,
    suggestions: ["OFFICE DECOR", "PLANNER", "COFFEE SET", "TECH GADGETS"]
  }
];

const trendingTags: TrendingTag[] = [
  { name: "ECO-FRIENDLY", count: 1500, trending: 'up' },
  { name: "HANDMADE", count: 1200, trending: 'hot' },
  { name: "CUSTOMIZED", count: 900, trending: 'up' },
  { name: "SAME DAY DELIVERY", count: 800, trending: 'hot' },
  { name: "UNDER ₹1000", count: 750, trending: 'down' }
];

const seasonalRecommendations = [
  {
    season: "VALENTINE'S WEEK",
    dates: "Feb 7-14",
    items: [
      { name: "ROSE DAY SPECIAL", icon: Flower },
      { name: "CHOCOLATE DAY GIFTS", icon: Cookie },
      { name: "PROMISE DAY CARDS", icon: Heart },
    ]
  },
  {
    season: "WEDDING SEASON",
    dates: "Oct-Dec",
    items: [
      { name: "COUPLE GIFTS", icon: HeartHandshake },
      { name: "HOME DECOR", icon: Home },
      { name: "GIFT CARDS", icon: CreditCard },
    ]
  }
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [recentSearches, setRecentSearches] = React.useState<SearchHistory[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<typeof priceRanges[0] | null>(null);
  const [suggestions, setSuggestions] = React.useState<SearchSuggestion[]>([]);
  const [selectedRecipient, setSelectedRecipient] = React.useState<string | null>(null);
  const [showSeasonalOffers, setShowSeasonalOffers] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const addToRecentSearches = (query: string, type: 'search' | 'category') => {
    const newSearch: SearchHistory = {
      query,
      timestamp: Date.now(),
      type
    };
    
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.query !== query);
      return [newSearch, ...filtered].slice(0, 5);
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSuggestions(getSuggestions(query));
    addToRecentSearches(query, 'search');
  };

  const getSuggestions = (query: string): SearchSuggestion[] => {
    if (!query) return [];
    
    const matchingCategories = categories
      .filter(cat => cat.label.toLowerCase().includes(query.toLowerCase()))
      .map(cat => ({ text: cat.label, type: 'category' as const, icon: cat.icon }));

    const matchingOccasions = occasions
      .filter(occ => occ.name.toLowerCase().includes(query.toLowerCase()))
      .map(occ => ({ text: occ.name, type: 'occasion' as const, icon: occ.icon }));

    const predefinedSuggestions = Object.entries(searchSuggestions)
      .filter(([key]) => query.toLowerCase().includes(key))
      .flatMap(([, values]) => values);

    return [...matchingCategories, ...matchingOccasions, ...predefinedSuggestions].slice(0, 6);
  };

  const handleCategorySelect = (category: string) => {
    addToRecentSearches(category, 'category');
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "max-w-7xl mx-auto",
        "transition-all duration-300 ease-in-out",
        isScrolled ? "py-3" : "py-5",
        "px-4 sm:px-6 lg:px-8"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className={cn(
        "bg-white rounded-[20px]",
        "border border-gray-100",
        "shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]",
        "transition-all duration-300",
        "overflow-hidden"
      )}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative h-8 w-28 sm:h-10 sm:w-32 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/amora.webp"
                alt="AMORA"
                fill
                className="object-contain"
                priority
              />
            </div>
            <Badge 
              variant="premium" 
              className="hidden sm:flex bg-gradient-to-r from-rose-500 via-rose-400 to-pink-500 text-white shadow-sm text-xs font-medium px-3"
            >
              PREMIUM
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {/* Categories Button */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-10 px-4 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors rounded-xl mr-2"
                >
                  <Menu className="h-4 w-4 mr-2" />
                  CATEGORIES
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-96">
                <SheetHeader>
                  <SheetTitle>BROWSE CATEGORIES</SheetTitle>
                  <SheetDescription>
                    Explore our curated collection of gifts and occasions
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {categories.map((category) => (
                    <Link
                      key={category.label}
                      href={category.href}
                      className="group"
                      onClick={() => {
                        handleCategorySelect(category.label);
                        setIsSidebarOpen(false);
                      }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
          >
            <div className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg mr-4",
                          category.color
                        )}>
                          <category.icon className="h-5 w-5" />
                        </div>
                        <span>{category.label}</span>
                        <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground/50" />
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <div className="bg-gray-50 rounded-xl p-1">
              {categories.slice(0, 4).map((category, idx) => (
                <Link
                  key={category.label}
                  href={category.href}
                  className="group inline-flex"
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "h-9 px-3 rounded-lg",
                      "text-sm font-medium",
                      "hover:bg-white hover:shadow-sm",
                      "transition-all duration-200",
                      category.color,
                      pathname === category.href && "bg-white shadow-sm"
                    )}
                  >
                    <category.icon className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    <span className="hidden xl:inline">{category.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
              </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <Popover>
              <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                  className="h-10 w-10 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <Search className="h-4 w-4" />
                        </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[450px] p-0" align="end" sideOffset={8}>
                <div className="flex items-center border-b p-2">
                  <Search className="h-4 w-4 shrink-0 opacity-50 mr-2" />
                  <input
                    type="text"
                    placeholder="Search gifts, occasions, or recipients..."
                    className="flex h-8 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    autoFocus
                  />
                  {searchQuery && (
                        <Button
                          variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setSearchQuery("");
                        setSuggestions([]);
                        setSelectedRecipient(null);
                      }}
                    >
                                <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                              </Button>
                  )}
                            </div>

                <div className="max-h-[600px] overflow-y-auto divide-y">
                  {/* Search Results */}
                  {searchQuery && (
                    <div className="p-2">
                      <h4 className="mb-2 px-2 text-sm font-medium">SEARCH RESULTS</h4>
                      {filteredCategories.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                          No results found.
                          </div>
                      ) : (
                        <div className="grid gap-1">
                          {filteredCategories.map((category) => (
                            <Link
                              key={category.label}
                              href={category.href}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent",
                                category.color
                              )}
                              onClick={() => handleCategorySelect(category.label)}
                            >
                              <category.icon className="h-4 w-4" />
                              <span>{category.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                  )}

                  {/* Quick Access by Occasion */}
                  {!searchQuery && (
                    <div className="p-2">
                      <h4 className="mb-2 px-2 text-sm font-medium">BROWSE BY OCCASION</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {occasions.map((occasion, index) => (
                <Button
                            key={index}
                            variant="outline"
                            className="justify-start text-sm"
                            onClick={() => handleSearch(occasion.name)}
                          >
                            <occasion.icon className="mr-2 h-4 w-4" />
                            {occasion.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* User Menu */}
            <div className="flex items-center">
              {/* Shopping Cart */}
              <Link href="/cart" className="relative">
                <Button 
                  variant="ghost" 
                  className="h-10 w-10 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="sr-only">Shopping Cart</span>
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
                    0
                  </span>
                </Button>
              </Link>

              {/* User Profile */}
              {user ? (
                <>
          <Button
            variant="ghost"
                    className="h-10 w-10 rounded-xl hidden md:flex hover:bg-gray-50 active:bg-gray-100 transition-colors ml-1"
                    onClick={() => router.push("/dashboard")}
                  >
                    <Home className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                        className="h-10 w-10 rounded-xl p-0.5 hover:bg-gray-50 active:bg-gray-100 transition-colors ml-1"
                      >
                        <Avatar className="h-9 w-9 ring-2 ring-gray-100">
                          {user.avatar ? (
                            <AvatarImage
                              src={user.avatar}
                              alt={user.name}
                              className="object-cover rounded-lg"
                            />
                          ) : (
                            <AvatarFallback className="rounded-lg bg-rose-50 text-rose-500 font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                </Button>
              </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2" align="end">
                      <div className="flex items-center justify-start gap-3 p-3 bg-gray-50/50">
                        <Avatar className="h-10 w-10 ring-2 ring-white">
                          {user.avatar ? (
                            <AvatarImage
                              src={user.avatar}
                              alt={user.name}
                              className="object-cover rounded-lg"
                            />
                          ) : (
                            <AvatarFallback className="rounded-lg bg-rose-50 text-rose-500 font-medium">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </p>
                      </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-sm py-2.5"
                        onSelect={(event) => {
                          event.preventDefault();
                          router.push("/profile");
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-sm py-2.5"
                        onClick={() => router.push("/settings")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer text-sm text-rose-600 focus:text-rose-700 py-2.5"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                <Button
                  variant="ghost"
                  size="sm"
                    className="font-medium hover:bg-gray-50 active:bg-gray-100"
                    onClick={() => router.push("/auth/login")}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-rose-500 hover:bg-rose-600 active:bg-rose-700 font-medium shadow-sm"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign Up
                </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
            <Button
                  variant="ghost"
                  className="h-10 w-10 rounded-xl lg:hidden hover:bg-gray-50 active:bg-gray-100 transition-colors ml-1"
                  aria-label="Menu"
                >
                  <Menu className="h-4 w-4" />
            </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-full sm:w-96">
                <SheetHeader className="p-6 text-left border-b">
                  <SheetTitle className="text-xl font-semibold">MENU</SheetTitle>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-5rem)]">
                  <div className="grid gap-2 p-5">
                    {categories.map((category) => (
                <Link
                        key={category.label}
                        href={category.href}
                        className="group"
                      >
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-3 h-12 text-base transition-all duration-300",
                            category.color,
                            pathname === category.href && "bg-gray-100"
                          )}
                        >
                          <category.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                          {category.label}
                        </Button>
                </Link>
              ))}
            </div>
          </ScrollArea>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}