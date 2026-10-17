import { FaFolder, FaEdit, FaTrash, FaClock } from "react-icons/fa";

const formatDate = (date) => {
  if (!date) return "Not set";

  const parsedDate = new Date(`${date}T12:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not set";
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const ProjectCard = ({ project, onEdit, onDelete, onProgressChange }) => {
  return (
    <article className="rounded-2xl border border-slate-200 p-5 transition hover:border-violet-300 hover:shadow-md">
      {/* Project heading and actions */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white ${
              project.color || "bg-violet-500"
            }`}
          >
            <FaFolder />
          </div>

          <div className="min-w-0">
            <h3 className="break-words font-bold text-slate-900">
              {project.name}
            </h3>

            <p className="mt-1 text-xs text-slate-500">{project.category}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(project)}
            aria-label={`Edit ${project.name}`}
            title="Edit project"
            className="rounded-lg p-2 text-slate-400 hover:bg-violet-50 hover:text-violet-600"
          >
            <FaEdit />
          </button>

          <button
            type="button"
            onClick={() => onDelete(project.id)}
            aria-label={`Delete ${project.name}`}
            title="Delete project"
            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Description */}
      {project.description && (
        <p className="mt-4 text-sm leading-6 text-slate-500">
          {project.description}
        </p>
      )}

      {/* Progress information */}
      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="font-medium text-slate-500">Progress</span>

        <span className="font-bold text-slate-800">{project.progress}%</span>
      </div>

      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label={`${project.name} progress`}
        aria-valuenow={project.progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            project.color || "bg-violet-500"
          }`}
          style={{
            width: `${Math.min(
              100,
              Math.max(0, Number(project.progress) || 0),
            )}%`,
          }}
        />
      </div>

      {/* Deadline and status */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
          <FaClock className="shrink-0" />

          <span className="truncate">{formatDate(project.dueDate)}</span>
        </div>

        <span className="shrink-0 rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-semibold text-violet-700">
          {project.status ||
            (project.progress === 100
              ? "Completed"
              : project.progress === 0
                ? "Not Started"
                : "In Progress")}
        </span>
      </div>

      {/* Update progress */}
      <div className="mt-4 border-t border-slate-100 pt-3">
        <label
          htmlFor={`progress-${project.id}`}
          className="mb-2 block text-xs font-semibold text-slate-500"
        >
          Update progress
        </label>

        <input
          id={`progress-${project.id}`}
          type="range"
          min="0"
          max="100"
          step="5"
          value={project.progress}
          onChange={(event) => onProgressChange(project.id, event.target.value)}
          className="range range-primary range-xs w-full"
        />
      </div>
    </article>
  );
};

export default ProjectCard;
