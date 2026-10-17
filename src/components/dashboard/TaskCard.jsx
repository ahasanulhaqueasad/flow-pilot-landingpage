import {
  FaCheck,
  FaEdit,
  FaTrash,
  FaFolder,
  FaCalendarAlt,
  FaExclamationCircle,
} from "react-icons/fa";

const priorityStyles = {
  High: "bg-red-50 text-red-600 ring-red-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const formatDate = (dateString) => {
  if (!dateString) return "No due date";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getTaskStatus = (task) => {
  if (task.completed) {
    return {
      label: "Completed",
      className: "bg-emerald-50 text-emerald-700",
    };
  }

  if (task.dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(`${task.dueDate}T00:00:00`);

    if (!Number.isNaN(dueDate.getTime()) && dueDate < today) {
      return {
        label: "Overdue",
        className: "bg-red-50 text-red-600",
      };
    }
  }

  return {
    label: "Pending",
    className: "bg-blue-50 text-blue-700",
  };
};

const TaskCard = ({ task, project, onEdit, onDelete, onToggleComplete }) => {
  const status = getTaskStatus(task);

  const priorityClass = priorityStyles[task.priority] || priorityStyles.Medium;

  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        task.completed
          ? "border-emerald-100"
          : status.label === "Overdue"
            ? "border-red-200"
            : "border-slate-200"
      }`}
    >
      {/* Top row */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          aria-label={
            task.completed
              ? `Mark ${task.title} as pending`
              : `Mark ${task.title} as completed`
          }
          title={task.completed ? "Mark as pending" : "Mark as completed"}
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
            task.completed
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-slate-300 text-transparent hover:border-violet-500"
          }`}
        >
          <FaCheck className="text-xs" />
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`break-words font-bold ${
              task.completed ? "text-slate-400 line-through" : "text-slate-900"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 break-words text-sm leading-6 text-slate-500">
              {task.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
          >
            <FaEdit />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${priorityClass}`}
        >
          <FaExclamationCircle className="mr-1.5" />
          {task.priority || "Medium"} Priority
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Project */}
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
        <FaFolder className="shrink-0 text-violet-500" />

        <span className="truncate">
          {project?.name || "No project assigned"}
        </span>
      </div>

      {/* Due date */}
      <div
        className={`mt-3 flex items-center gap-2 text-sm ${
          status.label === "Overdue"
            ? "font-semibold text-red-600"
            : task.completed
              ? "text-slate-400"
              : "text-slate-500"
        }`}
      >
        {status.label === "Overdue" ? (
          <FaExclamationCircle className="shrink-0" />
        ) : (
          <FaCalendarAlt className="shrink-0" />
        )}

        <span>
          {task.dueDate ? `Due: ${formatDate(task.dueDate)}` : "No due date"}
        </span>
      </div>
    </article>
  );
};

export default TaskCard;
