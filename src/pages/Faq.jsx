import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const faqs = [
  {
    question: "How do I create an account on Mentor?",
    answer:
      "Sign up with your email and password, verify your email, and start exploring our courses immediately.",
  },
  {
    question: "Can I access courses for free?",
    answer:
      "Yes! Mentor provides free courses for learners. Some advanced courses may require enrollment fees for certification.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards and Stripe payments securely for paid courses and certification fees.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click on 'Forgot Password' at login, enter your email, and follow the instructions to reset your password securely.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes, all Mentor courses are self-paced so you can learn at your own speed without deadlines.",
  },
  {
    question: "Do I get a certificate after completion?",
    answer:
      "Yes! Completing paid courses successfully will grant you a verifiable certificate you can share with employers.",
  },
  {
    question: "Can I switch roles between student and teacher?",
    answer:
      "Currently, roles are fixed upon registration. Contact support if you need a role change request.",
  },
  {
    question: "How do I contact support for issues?",
    answer:
      "Use the 'Contact Us' form or email support@mentor.com. We respond within 24 hours.",
  },
  {
    question: "Can I delete my account?",
    answer:
      "Yes, you can request account deletion from your profile settings. All data will be permanently removed.",
  },
  {
    question: "Is my data safe on Mentor?",
    answer:
      "Absolutely! We use Firebase and MongoDB with secure authentication and encryption to protect your data.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Frequently{" "}
          <span className="underline underline-offset-8 decoration-amber-400 decoration-4">
            Asked
          </span>{" "}
          Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-100"
            >
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full text-left px-5 py-4 flex justify-between items-center"
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
                <span className="text-gray-500">
                  {openIndex === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
