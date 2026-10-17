import { motion } from "motion/react";
import { FaArrowRight, FaCheckCircle, FaRocket } from "react-icons/fa";

function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20"
      >
        {/* Decorative background circles */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20"
          >
            <FaRocket size={28} />
          </motion.div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to transform the way you work?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-indigo-100 sm:text-lg">
            Discover a smarter way to organize projects, collaborate with your
            team, and make every workday more productive.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-7 py-4 font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-1 hover:bg-indigo-50"
            >
              Explore FlowPilot
              <FaArrowRight />
            </a>

            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Features
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-indigo-100">
            <span className="flex items-center gap-2">
              <FaCheckCircle />
              Simple project management
            </span>

            <span className="flex items-center gap-2">
              <FaCheckCircle />
              Designed for modern teams
            </span>
          </div>

          <p className="mt-6 text-xs text-indigo-200">
            Portfolio demo project · No real account or payment system
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default CTA;
