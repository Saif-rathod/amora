"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, Settings, Calendar, Bell, ArrowRight, Package, Gift, Heart, Clock, TrendingUp, ShoppingBag, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading || !user) {
    return null;
  }

  const stats = [
    { 
      label: 'Total Orders', 
      value: '12', 
      icon: Package, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      label: 'Wishlist Items', 
      value: '5', 
      icon: Heart, 
      color: 'text-rose-500',
      bgColor: 'bg-rose-50'
    },
    { 
      label: 'Active Orders', 
      value: '2', 
      icon: Clock, 
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    },
    { 
      label: 'Total Spent', 
      value: '₹4,500', 
      icon: CreditCard, 
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50'
    },
  ];

  const recentOrders = [
    { 
      id: '1', 
      product: 'Birthday Cake', 
      date: '2024-02-22', 
      status: 'Delivered',
      price: '₹899',
      statusColor: 'text-green-600 bg-green-50'
    },
    { 
      id: '2', 
      product: 'Rose Bouquet', 
      date: '2024-02-21', 
      status: 'In Transit',
      price: '₹599',
      statusColor: 'text-amber-600 bg-amber-50'
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50/50">
        <div className="container mx-auto pt-28 pb-12 px-4">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white p-8 mb-8 shadow-lg">
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 👋</h1>
              <p className="text-rose-100">Manage your orders and track your special moments</p>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardContent className="flex items-center p-6">
                  <div className={`rounded-xl p-3 mr-4 ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-rose-500" />
                    Recent Orders
                  </CardTitle>
                  <Button variant="ghost" className="text-rose-500 hover:text-rose-600" size="sm">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Track your latest purchases and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 rounded-xl border bg-white hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Gift className="h-6 w-6 text-rose-500" />
                        </div>
                        <div>
                          <p className="font-medium">{order.product}</p>
                          <p className="text-sm text-gray-500">Order #{order.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.price}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-rose-500" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>Frequently used features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Track Order', 'My Wishlist', 'Edit Profile'].map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start gap-2 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    >
                      {action === 'Track Order' && <Package className="h-4 w-4" />}
                      {action === 'My Wishlist' && <Heart className="h-4 w-4" />}
                      {action === 'Edit Profile' && (
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                      {action}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-rose-500 to-pink-500 text-white hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Special Offers
                  </CardTitle>
                  <CardDescription className="text-rose-100">
                    Exclusive deals for you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                      <p className="font-medium text-2xl">20% OFF</p>
                      <p className="text-sm text-rose-100">On your next purchase</p>
                    </div>
                    <Button variant="secondary" className="w-full bg-white text-rose-500 hover:bg-rose-50">
                      View All Offers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
