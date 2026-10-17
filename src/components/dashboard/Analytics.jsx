import { useMemo } from "react";
import {
  FiFolder,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiBarChart2,
} from "react-icons/fi";

const Analytics = ({ projects = [], tasks = [] }) => {
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed === true,
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const overdueTasks = tasks.filter((task) => {
      if (!task.dueDate || task.completed) return false;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(`${task.dueDate}T00:00:00`);
      return !Number.isNaN(dueDate.getTime()) && dueDate < today;
    }).length;

    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const priorities = ["High", "Medium", "Low"];

    const priorityStats = priorities.map((priority) => ({
      name: priority,
      count: tasks.filter(
        (task) =>
          String(task.priority || "").toLowerCase() === priority.toLowerCase(),
      ).length,
    }));

    return {
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      completionRate,
      priorityStats,
    };
  }, [projects, tasks]);

  const cards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FiFolder,
      description: "All your projects",
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: FiBarChart2,
      description: "Tasks across projects",
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: FiCheckCircle,
      description: "Successfully completed",
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: FiClock,
      description: "Tasks not completed",
    },
    {
      title: "Overdue Tasks",
      value: stats.overdueTasks,
      icon: FiAlertCircle,
      description: "Past their due date",
    },
  ];

  const maxPriorityCount = Math.max(
    1,
    ...stats.priorityStats.map((item) => item.count),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm opacity-60">
          Understand your project and task performance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="card border border-base-300 bg-base-100 shadow-sm"
            >
              <div className="flex items-start justify-between p-5">
                <div>
                  <p className="text-sm opacity-60">{card.title}</p>
                  <p className="mt-2 text-3xl font-bold">{card.value}</p>
                  <p className="mt-2 text-xs opacity-60">{card.description}</p>
                </div>

                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card border border-base-300 bg-base-100 p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Task Completion</h2>

          <div className="mt-5 flex items-center gap-5">
            <div
              className="radial-progress text-primary"
              style={{
                "--value": stats.completionRate,
                "--size": "7rem",
                "--thickness": "10px",
              }}
              role="progressbar"
              aria-valuenow={stats.completionRate}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {stats.completionRate}%
            </div>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">{stats.completedTasks}</span>{" "}
                completed
              </p>
              <p>
                <span className="font-semibold">{stats.pendingTasks}</span>{" "}
                remaining
              </p>
              <p className="opacity-60">Based on all current tasks</p>
            </div>
          </div>
        </section>

        <section className="card border border-base-300 bg-base-100 p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Tasks by Priority</h2>

          <div className="mt-5 space-y-5">
            {stats.priorityStats.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{item.name} Priority</span>
                  <span className="font-semibold">{item.count}</span>
                </div>

                <progress
                  className="progress progress-primary w-full"
                  value={item.count}
                  max={maxPriorityCount}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Analytics;
