import { motion } from "motion/react";
import { FaCheck, FaArrowRight, FaStar } from "react-icons/fa";

const plans = [
  {
    name: "Free",
    description: "Perfect for individuals getting started.",
    price: "$0",
    period: "forever",
    buttonText: "Get Started Free",
    featured: false,
    features: [
      "Up to 3 projects",
      "Basic task management",
      "5 team members",
      "Basic project views",
      "Community support",
    ],
  },
  {
    name: "Pro",
    description: "For professionals ready to do more.",
    price: "$19",
    period: "per user / month",
    buttonText: "Start Pro Trial",
    featured: true,
    features: [
      "Unlimited projects",
      "Advanced task management",
      "Up to 20 team members",
      "Advanced analytics",
      "Workflow automation",
      "Priority email support",
    ],
  },
  {
    name: "Team",
    description: "For teams that need more power.",
    price: "$49",
    period: "per user / month",
    buttonText: "Contact Sales",
    featured: false,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Custom workflows",
      "Advanced permissions",
      "Team performance reports",
      "Dedicated support",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            Simple Pricing
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Plans that grow with
            <span className="text-indigo-600"> your team.</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            Start for free and choose a plan that fits your workflow as your
            projects and team grow.
          </p>

          <p className="mt-3 text-sm text-slate-400">
            Demo pricing for this portfolio project.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-6xl gap-7 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -5 }}
              className={`relative flex flex-col rounded-2xl border p-7 sm:p-8 ${
                plan.featured
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-2xl shadow-indigo-600/20 lg:scale-105"
                  : "border-slate-200 bg-white text-slate-900 shadow-sm"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-slate-900 shadow-lg">
                  <FaStar />
                  MOST POPULAR
                </span>
              )}

              <h3 className="text-xl font-bold">{plan.name}</h3>

              <p
                className={`mt-3 min-h-12 text-sm leading-6 ${
                  plan.featured ? "text-indigo-100" : "text-slate-500"
                }`}
              >
                {plan.description}
              </p>

              <div className="mt-7 flex flex-wrap items-baseline gap-2">
                <span className="text-4xl font-extrabold tracking-tight">
                  {plan.price}
                </span>

                <span
                  className={`text-sm ${
                    plan.featured ? "text-indigo-100" : "text-slate-500"
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <a
                href="#get-started"
                className={`btn mt-7 w-full border-0 ${
                  plan.featured
                    ? "bg-white text-indigo-700 hover:bg-indigo-50"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {plan.buttonText}
                <FaArrowRight />
              </a>

              <div
                className={`my-7 border-t ${
                  plan.featured ? "border-indigo-400" : "border-slate-200"
                }`}
              />

              <p
                className={`text-sm font-bold ${
                  plan.featured ? "text-white" : "text-slate-900"
                }`}
              >
                What's included:
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm leading-6"
                  >
                    <FaCheck
                      className={`mt-1 shrink-0 ${
                        plan.featured ? "text-emerald-300" : "text-emerald-500"
                      }`}
                    />
                    <span
                      className={
                        plan.featured ? "text-indigo-50" : "text-slate-600"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="mt-12 text-center text-sm text-slate-500">
          Need a custom solution?{" "}
          <a
            href="#contact"
            className="font-semibold text-indigo-600 hover:text-indigo-700"
          >
            Let's talk
          </a>
        </p>
      </div>
    </section>
  );
};

export default Pricing;
