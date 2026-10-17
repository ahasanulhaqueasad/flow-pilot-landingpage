import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "What is FlowPilot?",
    answer:
      "FlowPilot is a demo productivity platform concept designed to help teams organize projects, manage tasks, collaborate, and track progress in one workspace.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! The demo pricing includes a Free plan to showcase how users might get started without paying. These plans and prices are illustrative and are not connected to a real payment system.",
  },
  {
    question: "Can I invite my team?",
    answer:
      "The Team plan concept is designed for collaboration. In this portfolio demo, team invitations and real-time collaboration are visual examples and are not connected to a backend.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "The demo presents flexible subscription options, but actual subscriptions and cancellations are not available because billing has not been implemented.",
  },
  {
    question: "Is FlowPilot suitable for small teams?",
    answer:
      "Absolutely! The concept is designed for individuals, freelancers, startups, and growing teams that want a simple way to organize their work.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="badge badge-primary badge-outline mb-4 px-4 py-3">
            FAQ
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently asked questions
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Everything you need to know about the FlowPilot demo and its
            features.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-indigo-200 bg-indigo-50/50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="text-base font-semibold text-slate-900 sm:text-lg">
                    {faq.question}
                  </span>

                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    {isOpen ? <FaMinus size={13} /> : <FaPlus size={13} />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-7 text-slate-600 sm:px-6 sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">Still have questions?</p>

          <a
            href="mailto:hello@example.com"
            className="mt-2 inline-block font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
