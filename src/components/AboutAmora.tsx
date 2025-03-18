import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutAmora() {
  return (
    <section className="container mx-auto px-4 py-24 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-block">
            <motion.h2 
              className="text-5xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              About Amora
            </motion.h2>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-rose-500 rounded-full"></div>
          </div>
          
          <motion.p 
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Amora was created to simplify how you celebrate love and special occasions. Our mission is to help busy individuals like you show love effortlessly with personalized reminders and handpicked gifts.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex gap-4 pt-4"
          >
            <Button className="bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white rounded-full px-8 py-6 text-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              Learn More
            </Button>
          </motion.div>
        </motion.div>

        {/* Image */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/assets/images/final for celebration/celebration(11).jpg"
              alt="About Amora"
              width={800}
              height={600}
              className="object-cover w-full h-[500px] rounded-3xl transform transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
          </div>
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-red-600 to-rose-500 rounded-full opacity-50 blur-2xl" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-red-600 to-rose-500 rounded-full opacity-50 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}