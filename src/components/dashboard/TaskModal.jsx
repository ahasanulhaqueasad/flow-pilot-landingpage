import { useState } from "react";
import { FaTimes, FaTasks, FaSave } from "react-icons/fa";

const initialForm = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
  projectId: "",
  completed: false,
};

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  taskToEdit = null,
  projects = [],
}) => {
  if (!isOpen) return null;

  return (
    <TaskModalForm
      key={taskToEdit?.id ?? "new-task"}
      onClose={onClose}
      onSave={onSave}
      taskToEdit={taskToEdit}
      projects={projects}
    />
  );
};

const TaskModalForm = ({ onClose, onSave, taskToEdit, projects }) => {
  const [formData, setFormData] = useState(() => ({
    ...initialForm,
    ...taskToEdit,
    projectId: taskToEdit?.projectId ? String(taskToEdit.projectId) : "",
  }));

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required.";
    }

    if (formData.dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(formData.dueDate)) {
      newErrors.dueDate = "Please select a valid due date.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      projectId: formData.projectId || "",
    });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="my-auto w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-lg text-violet-600">
              <FaTasks />
            </div>

            <div>
              <h2
                id="task-modal-title"
                className="text-xl font-bold text-slate-900"
              >
                {taskToEdit ? "Edit Task" : "Create New Task"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Organize your work and deadlines.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">
            {/* Task title */}
            <div>
              <label
                htmlFor="task-title"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Task Title <span className="text-red-500">*</span>
              </label>

              <input
                id="task-title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Design the homepage"
                className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-violet-200 ${
                  errors.title
                    ? "border-red-400"
                    : "border-slate-200 focus:border-violet-500"
                }`}
              />

              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="task-description"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Description
              </label>

              <textarea
                id="task-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe what needs to be done..."
                className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              />
            </div>

            {/* Priority and due date */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="task-priority"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Priority
                </label>

                <select
                  id="task-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="task-due-date"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Due Date
                </label>

                <input
                  id="task-due-date"
                  name="dueDate"
                  type="date"
                  value={formData.dueDate || ""}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
                />

                {errors.dueDate && (
                  <p className="mt-1 text-xs text-red-500">{errors.dueDate}</p>
                )}
              </div>
            </div>

            {/* Related project */}
            <div>
              <label
                htmlFor="task-project"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Related Project
              </label>

              <select
                id="task-project"
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
              >
                <option value="">No project assigned</option>

                {projects.map((project) => (
                  <option key={project.id} value={String(project.id)}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Completion status */}
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-4">
              <input
                type="checkbox"
                name="completed"
                checked={Boolean(formData.completed)}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />

              <span>
                <span className="block text-sm font-semibold text-slate-800">
                  Mark as completed
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Check this if the task is already finished.
                </span>
              </span>
            </label>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              <FaSave />
              {taskToEdit ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
