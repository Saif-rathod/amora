'use client';

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface LovedOne {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  birthday: string;
  nextEvent: string;
}

export default function LovedOnesSection() {
  const [upcomingEvents, setUpcomingEvents] = useState<LovedOne[]>([]);

  useEffect(() => {
    // In a real app, this would fetch from your API
    const dummyEvents = [
      {
        id: "1",
        name: "Emma Watson",
        relationship: "Best Friend",
        avatar: "/assets/images/headshot/headshot(1).webp",
        birthday: "April 15",
        nextEvent: "Birthday in 3 days",
      },
      {
        id: "2",
        name: "Chris Evans",
        relationship: "Brother",
        avatar: "/assets/images/headshot/headshot(2).webp",
        birthday: "June 13",
        nextEvent: "Anniversary in 2 weeks",
      },
    ];
    setUpcomingEvents(dummyEvents);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-rose-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 mb-4"
          >
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Never Miss a Special Day</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-medium text-gray-900 mb-4"
          >
            Keep Track of Your Loved Ones
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600"
          >
            Add birthdays, anniversaries, and special dates. We'll help you remember and celebrate every important moment.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Upcoming Events
                </h3>
                <Link href="/loved-ones">
                  <Button variant="ghost" className="text-rose-600 hover:text-rose-700">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <img    
                        src={event.avatar}
                        alt={event.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">
                        {event.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {event.nextEvent}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link href="/loved-ones/add">
                  <Button className="bg-rose-600 hover:bg-rose-700 rounded-lg text-white">
                    Add a Loved One
                    <Heart className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
