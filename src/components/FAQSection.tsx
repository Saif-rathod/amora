import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Amora's gift reminder system work?",
    answer: "Our reminder system keeps track of important dates and occasions for your loved ones. You'll receive timely notifications before each event, ensuring you never miss a special moment."
  },
  {
    question: "Can I customize gift preferences for different occasions?",
    answer: "Yes! You can set specific gift preferences for each loved one and occasion. This helps us provide more personalized gift suggestions that match their interests and your budget."
  },
  {
    question: "What types of occasions does Amora support?",
    answer: "We support a wide range of occasions including birthdays, anniversaries, weddings, festivals, and more. You can also create custom occasions for personal celebrations."
  },
  {
    question: "How far in advance should I place my order?",
    answer: "We recommend placing orders at least 2-3 days in advance for regular deliveries. For special occasions or custom arrangements, please allow 5-7 days for the best experience."
  },
  {
    question: "Do you offer international delivery?",
    answer: "Currently, we're focusing on delivering joy within India. We're working on expanding our services internationally and will announce when new regions become available."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our services and how we can help you celebrate special moments.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 bg-white rounded-lg border hover:border-rose-300 transition-colors duration-200"
              >
                <span className="text-left text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-4 bg-rose-50 rounded-b-lg"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;