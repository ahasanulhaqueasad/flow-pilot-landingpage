import { FaTasks, FaPlus, FaSpinner, FaSearch } from "react-icons/fa";

const TaskState = ({
  type = "empty",
  message,
  description,
  onAddTask,
  onResetFilters,
}) => {
  if (type === "loading") {
    return (
      <div
        className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <FaSpinner className="animate-spin text-3xl text-violet-600" />

        <p className="mt-4 font-semibold text-slate-800">
          {message || "Loading tasks..."}
        </p>

        <p className="mt-1 text-sm text-slate-500">Please wait a moment.</p>
      </div>
    );
  }

  if (type === "no-results") {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <FaSearch className="text-2xl" />
        </div>

        <h3 className="mt-5 text-lg font-bold text-slate-900">
          {message || "No matching tasks"}
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {description || "Try changing your search or filters to find tasks."}
        </p>

        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Reset filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <FaTasks className="text-2xl" />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {message || "No tasks yet"}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
        {description ||
          "Create your first task and start organizing your work."}
      </p>

      {onAddTask && (
        <button
          type="button"
          onClick={onAddTask}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
        >
          <FaPlus />
          Add New Task
        </button>
      )}
    </div>
  );
};

export default TaskState;
