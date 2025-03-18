'use client'

import { Plus, Grid, List, Heart, Search, Calendar, Mail, Phone, Gift, Star, Edit2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLovedOnes, type LovedOne } from "@/hooks/use-loved-ones";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Index = () => {
  const { lovedOnes, deleteLovedOne } = useLovedOnes();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredLovedOnes, setFilteredLovedOnes] = useState<LovedOne[]>(lovedOnes);
  const [sortOrder, setSortOrder] = useState('name');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFilteredLovedOnes(lovedOnes);
  }, [lovedOnes]);

  useEffect(() => {
    let results = [...lovedOnes];

    if (searchQuery) {
      results = results.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        person.relationship.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilter !== 'all') {
      results = results.filter(person => person.relationship.toLowerCase() === selectedFilter.toLowerCase());
    }

    results.sort((a, b) => {
      if (sortOrder === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'birthday') {
        const getMonthDay = (date: string) => {
          const [month, day] = date.split(' ');
          const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
          return new Date(2000, months.indexOf(month), parseInt(day));
        };
        return getMonthDay(a.birthday).getTime() - getMonthDay(b.birthday).getTime();
      }
      return 0;
    });

    setFilteredLovedOnes(results);
  }, [searchQuery, selectedFilter, sortOrder, lovedOnes]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  const handleSortChange = (order: string) => {
    setSortOrder(order);
  };

  const handleEdit = (person: LovedOne) => {
    toast({
      title: "Edit Coming Soon",
      description: "This feature will be available in the next update!",
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this loved one?')) {
      deleteLovedOne(id);
      toast({
        title: "Deleted Successfully",
        description: "Your loved one has been removed from the list.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-4 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 mb-6 shadow-lg"
            >
              <Heart className="h-8 w-8 text-rose-600" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Loved Ones</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Keep track of important dates and preferences for the people who matter most.
            </p>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm backdrop-blur-sm bg-opacity-90 sticky top-20 z-10">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by name or relationship..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-rose-50 text-rose-600' : ''}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-rose-50 text-rose-600' : ''}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Link href="/loved-ones/add">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Loved One
                </Button>
              </Link>
            </div>
          </div>

          {/* Filter and Sort */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm backdrop-blur-sm bg-opacity-90">
            <div className="flex flex-wrap gap-2">
              <TooltipProvider>
                {['all', 'parent', 'child', 'sibling', 'spouse', 'friend', 'relative', 'colleague'].map((filter) => (
                  <Tooltip key={filter}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterChange(filter)}
                        className={`${selectedFilter === filter ? 'bg-rose-50 text-rose-600 border-rose-200' : ''} 
                          transition-all duration-200 hover:scale-105`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Filter by {filter === 'all' ? 'all relationships' : filter}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSortChange('name')}
                      className={`${sortOrder === 'name' ? 'text-rose-600' : ''} transition-all duration-200`}
                    >
                      Name
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sort alphabetically by name</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSortChange('birthday')}
                      className={`${sortOrder === 'birthday' ? 'text-rose-600' : ''} transition-all duration-200`}
                    >
                      Birthday
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sort by birthday date</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <Loader2 className="h-8 w-8 animate-spin text-rose-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading your loved ones...</p>
              </motion.div>
            </div>
          ) : filteredLovedOnes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white rounded-xl shadow-sm mt-8"
            >
              <div className="bg-rose-50 rounded-full p-4 inline-block mb-4">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Loved Ones Found</h3>
              <p className="text-gray-600 mb-6">Start adding your loved ones to keep track of their special moments.</p>
              <Link href="/loved-ones/add">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white transition-all duration-200 hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Loved One
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className={`grid gap-6 mt-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              <AnimatePresence>
                {filteredLovedOnes.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 ${
                      hoveredId === person.id ? 'transform scale-[1.02]' : ''
                    }`}
                    onMouseEnter={() => setHoveredId(person.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className={`p-6 ${viewMode === 'list' ? 'flex items-center gap-6' : ''}`}>
                      <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'mb-4'}`}>
                        <div className="relative group">
                          <img
                            src={person.avatar || '/assets/images/headshot/headshot(1).webp'}
                            alt={person.name}
                            className="w-20 h-20 rounded-full object-cover border-2 border-rose-100"
                          />
                          <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                            <p className="text-rose-600 text-sm">{person.relationship}</p>
                          </div>
                          <div className="flex gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-rose-600"
                                    onClick={() => handleEdit(person)}
                                  >
                                    <Edit2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit details</p>
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-gray-500 hover:text-rose-600"
                                    onClick={() => handleDelete(person.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{person.birthday}</span>
                          </div>
                          {person.contactInfo?.email && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 mr-2" />
                              <span>{person.contactInfo.email}</span>
                            </div>
                          )}
                          {person.contactInfo?.phone && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              <span>{person.contactInfo.phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;