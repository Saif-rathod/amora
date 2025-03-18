"use client";

import * as React from "react";
import { Mulish} from "next/font/google";
import Link from "next/link";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { cn } from "@/lib/utils";

const mulish = Mulish({ subsets: ["latin"] });

interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string[];
  rating: number;
  reviews: number;
  description: string;
}

const flowers: Flower[] = [
  {
    id: "1",
    name: "Sunflower",
    price: 25,
    image: "assets/images/flower photos/flower1.webp",
    category: ["flowers"],
    rating: 4.5,
    reviews: 12,
    description: "Bright and cheerful sunflowers that bring warmth to any space.",
  },
  {
    id: "2",
    name: "Tulip",
    price: 30,
    image: "/assets/images/flower photos/flowers2.webp",
    category: ["flowers"],
    rating: 4.5,
    reviews: 10,
    description: "Elegant tulips in vibrant colors, perfect for spring celebrations.",
  },
  {
    id: "3",
    name: "Daisy",
    price: 20,
    image: "/assets/images/flower photos/flowers3.webp",
    category: ["flowers"],
    rating: 4.5,
    reviews: 8,
    description: "Simple and sweet daisies that symbolize innocence and purity.",
  },
  {
    id: "4",
    name: "Rose",
    price: 35,
    image: "/assets/images/flower photos/flowers4.webp",
    category: ["flowers"],
    rating: 4.5,
    reviews: 10,
    description: "Classic roses that express love and appreciation beautifully.",
  },
  {
    id: "5",
    name: "Lily",
    price: 40,
    image: "/assets/images/flower photos/flowers5.webp",
    category: ["flowers"],
    rating: 4.5,
    reviews: 12,
    description: "Elegant lilies known for their graceful beauty and sweet fragrance.",
  },
];

export default function FlowersPage() {
  return (
    <div className="py-16 bg-gray-100 max-w-6xl mx-auto px-4">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-center text-gray-800">
        Flowers
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-12 mx-auto text-center">
        Our flowers are carefully selected and arranged to provide the perfect gift or
        decoration for any occasion.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flowers.map((flower) => (
          <Card key={flower.id} className="transition-transform transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">{flower.name}</CardTitle>
              <Badge variant="secondary" className="ml-2">
                ⭐ {flower.rating}
              </Badge>
            </CardHeader>
            <CardContent>
              <img
                src={flower.image}
                alt={flower.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <CardDescription className="mt-4 text-gray-500">
                {flower.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={`/category/flowers/${flower.id}`} className="w-full">
                <Button
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition duration-300"
                >
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
