import { Calendar, Bell, Gift, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Calendar className="w-12 h-12" />,
      title: "Register & Connect",
      description: "Add important dates & preferences",
    },
    {
      icon: <Bell className="w-12 h-12" />,
      title: "Smart Alerts",
      description: "Never miss special moments",
    },
    {
      icon: <Gift className="w-12 h-12" />,
      title: "Perfect Gifts",
      description: "Curated with care & delivered",
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: "Auto-Magic",
      description: "Sit back while we handle everything",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-white to-rose-50 opacity-50" />
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent mb-4">
            How the Magic Happens
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-rose-400 to-red-500 rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-lg 
                             backdrop-blur-sm bg-opacity-80 border border-rose-100
                             transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                <div className="mb-6 p-4 rounded-full bg-gradient-to-br from-rose-100 to-red-50 
                              group-hover:from-rose-200 group-hover:to-red-100 transition-colors duration-300">
                  <div className="text-rose-600 group-hover:text-red-600 transition-colors duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <Button className="bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 
                           text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg 
                           hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;