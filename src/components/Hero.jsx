import { motion } from "motion/react";
import {
  FaArrowRight,
  FaPlay,
  FaCheckCircle,
  FaChartLine,
  FaUsers,
  FaTasks,
  FaRegClock,
} from "react-icons/fa";

const Hero = () => {
  const stats = [
    { icon: FaTasks, label: "Tasks completed", value: "2,840" },
    { icon: FaUsers, label: "Active members", value: "1,284" },
    { icon: FaChartLine, label: "Productivity", value: "+38.5%" },
  ];

  return (
    <section
      id="get-started"
      className="overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-white"
    >
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 md:pb-28 md:pt-24 lg:px-8">
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-bold">
              NEW
            </span>
            Your team's smarter workspace
            <FaArrowRight size={11} />
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Work smarter.
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
              Achieve more.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Bring your projects, tasks, and team together in one simple
            workspace. Spend less time managing work and more time making
            progress.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="btn h-14 w-full border-0 bg-indigo-600 px-7 text-base text-white shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 sm:w-auto"
            >
              Get Started for Free
              <FaArrowRight />
            </a>

            <a
              href="#features"
              className="btn h-14 w-full border border-slate-200 bg-white px-7 text-base text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 sm:w-auto"
            >
              <FaPlay size={13} />
              Explore Features
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              Free to get started
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-500" />
              No credit card required
            </span>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto mt-16 max-w-5xl md:mt-20"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-indigo-200/40 via-purple-200/30 to-blue-200/40 blur-2xl" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-indigo-900/10">
            {/* Browser Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="rounded-md border border-slate-200 bg-white px-5 py-1 text-xs text-slate-400 sm:px-12">
                app.flowpilot.demo
              </div>

              <div className="w-10" />
            </div>

            {/* Dashboard Content */}
            <div className="grid min-h-[300px] md:grid-cols-[190px_1fr]">
              {/* Sidebar */}
              <aside className="hidden border-r border-slate-200 bg-slate-50/70 p-5 md:block">
                <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400">
                  Workspace
                </p>

                <div className="space-y-4 text-sm">
                  <p className="rounded-lg bg-indigo-100 px-3 py-2 font-semibold text-indigo-700">
                    Overview
                  </p>
                  <p className="px-3 text-slate-500">My Tasks</p>
                  <p className="px-3 text-slate-500">Projects</p>
                  <p className="px-3 text-slate-500">Team Members</p>
                </div>
              </aside>

              {/* Main Dashboard */}
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">Monday, October 12</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                      Good morning, Alex 👋
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Here's what's happening with your projects.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm border-0 bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    + New Task
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;

                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5 + index * 0.15,
                        }}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs text-slate-500">
                            {stat.label}
                          </span>
                          <Icon className="text-indigo-500" />
                        </div>

                        <p className="mt-3 text-2xl font-bold text-slate-900">
                          {stat.value}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Recent Tasks */}
                <div className="mt-6 rounded-xl border border-slate-200 p-4 sm:p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Recent Tasks</h3>
                    <span className="text-xs text-indigo-600">View all</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Redesign landing page",
                        status: "In Progress",
                        color: "bg-amber-100 text-amber-700",
                        width: "w-2/3",
                      },
                      {
                        title: "Prepare product launch",
                        status: "Completed",
                        color: "bg-emerald-100 text-emerald-700",
                        width: "w-full",
                      },
                      {
                        title: "Review team feedback",
                        status: "Pending",
                        color: "bg-slate-100 text-slate-600",
                        width: "w-1/3",
                      },
                    ].map((task) => (
                      <div
                        key={task.title}
                        className="flex flex-wrap items-center justify-between gap-3"
                      >
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                          <FaCheckCircle className="shrink-0 text-slate-300" />
                          <span className="truncate text-sm text-slate-700">
                            {task.title}
                          </span>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${task.color}`}
                        >
                          {task.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                  <FaRegClock />
                  Dashboard preview — sample data
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 top-20 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl sm:block lg:-right-8"
          >
            <p className="text-xs text-slate-500">Weekly growth</p>
            <p className="mt-1 flex items-center gap-2 text-lg font-bold text-emerald-600">
              <FaChartLine />
              +24.8%
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
