import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";

const TaskProgress = ({ tasks = [] }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const overdueTasks = tasks.filter((task) => {
    if (task.completed || !task.dueDate) return false;

    const dueDate = new Date(`${task.dueDate}T00:00:00`);

    return !Number.isNaN(dueDate.getTime()) && dueDate < today;
  }).length;

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: FaTasks,
      iconStyle: "bg-violet-100 text-violet-600",
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: FaCheckCircle,
      iconStyle: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: FaClock,
      iconStyle: "bg-amber-100 text-amber-600",
    },
    {
      label: "Overdue",
      value: overdueTasks,
      icon: FaExclamationCircle,
      iconStyle: "bg-red-100 text-red-600",
    },
  ];

  return (
    <section className="space-y-5">
      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconStyle}`}
                >
                  <Icon className="text-xl" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Completion progress */}
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Task Completion
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Track your overall task progress.
            </p>
          </div>

          <span className="text-2xl font-bold text-violet-600">
            {completionPercentage}%
          </span>
        </div>

        <div
          className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label="Task completion"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completionPercentage}
        >
          <div
            className="h-full rounded-full bg-violet-600 transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {completedTasks} of {totalTasks} tasks completed
        </p>
      </article>
    </section>
  );
};

export default TaskProgress;
