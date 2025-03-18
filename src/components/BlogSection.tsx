import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function BlogSection() {
  const posts = [
    {
      title: "Top 10 Last-Minute Gift Ideas",
      description: "Discover creative and thoughtful gifts for any occasion.",
      image: "/assets/images/couple photos/couple1.webp",
    },
    {
      title: "How to Stay Organized for Special Occasions",
      description: "Tips and tricks to never miss an important date again.",
      image: "/assets/images/final for celebration/celebration(1).jpg",
    },
    {
      title: "Creative Ways to Surprise Loved Ones",
      description: "Make every moment special with these unique ideas.",
      image: "/assets/images/couple photos/couple11.webp",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center mb-12 md:mb-16">
          
          <h2 className="text-2xl md:text-2xl lg:text-3xl font-bold text-rose-950 text-left mb-4">
            From the Blog
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300 rounded-2xl" />
        </div>
        <div className="grid md:grid-cols-3 gap-8 ">
          {posts.map((post, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
              <div className="rounded-2xl overflow-hidden mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6">
                Read More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}