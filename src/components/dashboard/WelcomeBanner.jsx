import { motion } from "motion/react";
import { FaLayerGroup, FaFolder } from "react-icons/fa";

const WelcomeBanner = ({ user, onExploreProjects }) => {
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const firstName = displayName.split(" ")[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-600 p-6 text-white shadow-xl shadow-violet-200 sm:p-8"
    >
      {/* Decorative circle */}
      <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />

      <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        {/* Welcome text */}
        <div>
          <p className="mb-2 text-sm font-medium text-violet-200">
            YOUR WORKSPACE AT A GLANCE
          </p>

          <h2 className="text-2xl font-extrabold sm:text-4xl">
            Welcome back, {firstName}! 👋
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-violet-100 sm:text-base">
            Manage your projects, track progress, and keep your work moving
            forward with FlowPilot.
          </p>

          <button
            type="button"
            onClick={onExploreProjects}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
          >
            <FaFolder />
            Explore Projects
          </button>
        </div>

        {/* Decorative icon */}
        <div className="hidden h-32 w-32 items-center justify-center rounded-3xl border border-white/20 bg-white/10 sm:flex">
          <FaLayerGroup className="text-6xl" />
        </div>
      </div>
    </motion.section>
  );
};

export default WelcomeBanner;
