import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";


const faqData = [
  {
    question: "How does your delivery service work?",
    answer:
      "Simply place your order through our website or app, choose your delivery preferences, and our team will handle the rest. You'll receive real-time updates until your parcel arrives at your doorstep.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "We currently deliver to all major cities and suburbs in the region. Enter your zip code during checkout to see if we deliver to your area.",
  },
  {
    question: "How can I track my delivery?",
    answer:
      "Once your order is dispatched, you'll receive a tracking link via email and SMS. You can also log into your account to view the delivery status in real time.",
  },
  {
    question: "What if I miss my delivery?",
    answer:
      "If you miss your delivery, our courier will attempt to contact you and reschedule. Alternatively, you can reach out to our support team to arrange another delivery time.",
  },
  {
    question: "Are there any items you do not deliver?",
    answer:
      "For safety reasons, we do not deliver hazardous materials, illegal items, or perishable goods. Please check our terms and conditions for the full list.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our support team anytime via live chat, email, or phone. Visit our Contact page for more details.",
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer:
      "Yes, you can update your delivery address before your order is dispatched by contacting our support team.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Enhanced Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Question (FAQ)
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
          </p>
        </div>

        {/* FAQ Items with Smooth Animations */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl shadow-sm transition-all duration-300 overflow-hidden ${
                openIndex === idx ? "shadow-md" : "hover:shadow-md"
              }`}
            >
              <button
                className="w-full flex justify-between items-center text-left p-6 focus:outline-none"
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="font-medium text-lg text-gray-900">
                  {faq.question}
                </span>
                <span className="ml-4 text-primary">
                  {openIndex === idx ? (
                    <FiChevronUp className="w-5 h-5 transition-transform duration-300" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 transition-transform duration-300" />
                  )}
                </span>
              </button>
              
              <div
                id={`faq-panel-${idx}`}
                className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === idx
                    ? "max-h-96 opacity-100 pb-6"
                    : "max-h-0 opacity-0"
                }`}
                style={{
                  willChange: "max-height, opacity",
                }}
              >
                <div className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FaqSection;