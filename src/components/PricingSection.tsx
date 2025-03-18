import React from 'react';
import { Sparkles, Gift, FlowerIcon } from 'lucide-react';

export default function PricingSection() {
  const pricingCards = [
    {
      title: "One-Time Registration",
      price: "₹1,000",
      description: "Lifetime membership access",
      icon: Sparkles,
      features: ["No recurring fees", "Full platform access", "Priority support"],
      highlight: false
    },
    {
      title: "Gift Collections",
      price: "Starting ₹499",
      description: "Thoughtfully curated gifts",
      icon: Gift,
      features: ["Personalization options", "Premium packaging", "On-time delivery"],
      highlight: true
    },
    {
      title: "Luxury Bouquets",
      price: "₹999 - ₹99,999",
      description: "Exquisite floral arrangements",
      icon: FlowerIcon,
      features: ["Fresh flowers", "Custom designs", "Same-day delivery"],
      highlight: false
    }
  ];

  return (
    <section className="container mx-auto px-4 py-24 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      </div>

      <div className="relative">
        <div className="text-center mb-16">
          ``
          <h2 className="text-3xl md:text-3xl font-bold text-rose-950 bg-clip-text mb-6">
            Pricing Plans
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-rose-400 mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingCards.map((card, index) => (
            <div 
              key={index}
              className={`
                relative group rounded-2xl p-8 transition-all duration-300
                ${card.highlight 
                  ? 'bg-gradient-to-b from-red-500 to-rose-500 text-white shadow-xl hover:shadow-2xl hover:-translate-y-2' 
                  : 'bg-white hover:bg-red-50 shadow-lg hover:shadow-xl hover:-translate-y-1'}
              `}
            >
              {/* Top decorative bar */}
              <div className={`
                absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 rounded-b-full
                ${card.highlight ? 'bg-white/50' : 'bg-gradient-to-r from-red-500 to-rose-400'}
              `} />

              <div className="flex justify-center mb-6">
                <card.icon className={`w-12 h-12 ${card.highlight ? 'text-white' : 'text-red-500'}`} />
              </div>

              <h3 className={`text-xl font-bold mb-2 ${card.highlight ? 'text-white' : 'text-gray-800'}`}>
                {card.title}
              </h3>
              <p className={`text-3xl font-bold mb-4 ${card.highlight ? 'text-white' : 'text-red-600'}`}>
                {card.price}
              </p>
              <p className={`mb-6 ${card.highlight ? 'text-rose-100' : 'text-gray-600'}`}>
                {card.description}
              </p>

              <ul className="space-y-3 mb-8">
                {card.features.map((feature, idx) => (
                  <li 
                    key={idx}
                    className={`flex items-center ${card.highlight ? 'text-rose-100' : 'text-gray-600'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${card.highlight ? 'bg-white' : 'bg-red-500'}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`
                  w-full py-3 px-6 rounded-3xl font-semibold transition-all duration-300
                  ${card.highlight 
                    ? 'bg-white text-red-500 hover:bg-rose-100' 
                    : 'bg-red-500 text-white hover:bg-red-600'}
                `}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}