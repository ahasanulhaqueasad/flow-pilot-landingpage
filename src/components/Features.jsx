import { motion } from "motion/react";
import {
  FaTasks,
  FaUsers,
  FaChartLine,
  FaBolt,
  FaShieldAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";

const features = [
  {
    icon: FaTasks,
    title: "Smart Task Management",
    description:
      "Organize your tasks, set priorities, and track progress without losing sight of what matters.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: FaUsers,
    title: "Team Collaboration",
    description:
      "Bring your team together, share updates, and keep everyone aligned in one workspace.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: FaChartLine,
    title: "Powerful Analytics",
    description:
      "Turn project data into useful insights and understand your team's progress at a glance.",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    icon: FaBolt,
    title: "Workflow Automation",
    description:
      "Reduce repetitive work and build a smoother process for your everyday tasks.",
    color: "bg-amber-100 text-amber-600",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Workspace",
    description:
      "Keep project information organized with thoughtful access and security controls.",
    color: "bg-rose-100 text-rose-600",
  },
  {
    icon: FaRegCalendarAlt,
    title: "Deadline Tracking",
    description:
      "Plan upcoming work, manage deadlines, and keep projects moving on schedule.",
    color: "bg-violet-100 text-violet-600",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="inline-block rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
            Powerful Features
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Everything you need to
            <span className="text-indigo-600"> work better.</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
            Stop switching between tools. FlowPilot brings your team's essential
            workflows together in one simple workspace.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-slate-200 bg-white p-7 transition-shadow duration-300 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <a
                  href="#how-it-works"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all group-hover:gap-3"
                >
                  Learn more
                  <span aria-hidden="true">→</span>
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
