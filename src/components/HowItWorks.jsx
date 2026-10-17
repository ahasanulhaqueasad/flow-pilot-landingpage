import { motion } from "motion/react";
import {
  FaUserPlus,
  FaLayerGroup,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    number: "01",
    icon: FaUserPlus,
    title: "Create Your Workspace",
    description:
      "Sign up and set up your workspace in minutes. Invite your teammates and bring everyone together.",
  },
  {
    number: "02",
    icon: FaLayerGroup,
    title: "Organize Your Projects",
    description:
      "Create projects, assign tasks, set deadlines, and organize your team's priorities in one place.",
  },
  {
    number: "03",
    icon: FaRocket,
    title: "Track Your Progress",
    description:
      "Follow progress, review insights, and help your team deliver better results with less effort.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="overflow-hidden bg-slate-50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Simple Process
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Get started in
            <span className="text-indigo-600"> three easy steps.</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            A better workflow doesn't have to be complicated. Start small and
            build a system that works for your team.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3 md:gap-6">
          {/* Connector Line */}
          <div className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-indigo-200 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative z-10 rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-sm transition-shadow hover:shadow-lg sm:p-9"
              >
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">
                  <Icon size={29} />

                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-indigo-100 text-xs font-extrabold text-indigo-700">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600">
                  Step {index + 1}
                  <FaArrowRight size={12} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
