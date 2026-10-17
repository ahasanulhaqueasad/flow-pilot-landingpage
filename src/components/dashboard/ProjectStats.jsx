import {
  FaFolderOpen,
  FaCheckCircle,
  FaSpinner,
  FaRegFolder,
} from "react-icons/fa";

const ProjectStats = ({ projects = [] }) => {
  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => Number(project.progress) >= 100,
  ).length;

  const inProgressProjects = projects.filter((project) => {
    const progress = Number(project.progress) || 0;
    return progress > 0 && progress < 100;
  }).length;

  const notStartedProjects = projects.filter(
    (project) => (Number(project.progress) || 0) <= 0,
  ).length;

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects,
      icon: FaFolderOpen,
      iconStyle: "bg-violet-100 text-violet-600",
    },
    {
      label: "Completed",
      value: completedProjects,
      icon: FaCheckCircle,
      iconStyle: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "In Progress",
      value: inProgressProjects,
      icon: FaSpinner,
      iconStyle: "bg-blue-100 text-blue-600",
    },
    {
      label: "Not Started",
      value: notStartedProjects,
      icon: FaRegFolder,
      iconStyle: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <article
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
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
                <Icon
                  className={`text-xl ${
                    stat.label === "In Progress" ? "animate-spin" : ""
                  }`}
                />
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default ProjectStats;
