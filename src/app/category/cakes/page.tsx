"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Heart } from "lucide-react";

const CakesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const cakes = [
    { id: 1, name: "Chocolate Delight", price: 39.99, image: "/cakes/chocolate-delight.jpg", category: "chocolate" },
    { id: 2, name: "Strawberry Dream", price: 34.99, image: "/cakes/strawberry-dream.jpg", category: "fruit" },
    { id: 3, name: "Vanilla Bliss", price: 29.99, image: "/cakes/vanilla-bliss.jpg", category: "classic" },
    { id: 4, name: "Red Velvet Passion", price: 44.99, image: "/cakes/red-velvet-passion.jpg", category: "specialty" },
    { id: 5, name: "Lemon Zest", price: 32.99, image: "/cakes/lemon-zest.jpg", category: "fruit" },
  ];

  const filteredCakes = selectedCategory === "all"
    ? cakes
    : cakes.filter(cake => cake.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Delicious Cakes for Every Occasion</h1>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>All Cakes</TabsTrigger>
          <TabsTrigger value="chocolate" onClick={() => setSelectedCategory("chocolate")}>Chocolate</TabsTrigger>
          <TabsTrigger value="fruit" onClick={() => setSelectedCategory("fruit")}>Fruit</TabsTrigger>
          <TabsTrigger value="classic" onClick={() => setSelectedCategory("classic")}>Classic</TabsTrigger>
          <TabsTrigger value="specialty" onClick={() => setSelectedCategory("specialty")}>Specialty</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCakes.map((cake) => (
          <Card key={cake.id}>
            <CardHeader>
              <CardTitle>{cake.name}</CardTitle>
              <CardDescription>${cake.price.toFixed(2)}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={cake.image} alt={cake.name} width={300} height={200} className="rounded-md" />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline"><Heart className="mr-2 h-4 w-4" /> Add to Favorites</Button>
              <Button><Gift className="mr-2 h-4 w-4" /> Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CakesPage;