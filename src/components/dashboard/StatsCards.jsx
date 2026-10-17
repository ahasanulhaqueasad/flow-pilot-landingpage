import { motion } from "motion/react";
import {
  FaFolder,
  FaCheckSquare,
  FaCheckCircle,
  FaChartBar,
  FaArrowUp,
} from "react-icons/fa";

const StatsCards = ({ projects = [] }) => {
  const completedProjects = projects.filter(
    (project) => project.progress === 100,
  ).length;

  const activeProjects = projects.filter(
    (project) => project.progress > 0 && project.progress < 100,
  ).length;

  const categoriesCount = new Set(projects.map((project) => project.category))
    .size;

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FaFolder,
      color: "bg-violet-100 text-violet-600",
    },
    {
      title: "Active Projects",
      value: activeProjects,
      icon: FaCheckSquare,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Completed Projects",
      value: completedProjects,
      icon: FaCheckCircle,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Categories",
      value: categoriesCount,
      icon: FaChartBar,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <section className="mb-8">
      <div className="mb-5">
        <h2 className="text-lg font-extrabold text-slate-900">
          Workspace Overview
        </h2>

        <p className="mt-1 text-sm text-slate-400">Your project statistics</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.title}</p>

                  <p className="mt-3 text-3xl font-extrabold">{stat.value}</p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon className="text-xl" />
                </div>
              </div>

              <p className="mt-4 flex items-center gap-1 text-xs text-emerald-600">
                <FaArrowUp />
                Live from your project list
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsCards;
