import { useState } from "react";
import { FaTimes, FaFolderPlus, FaSave } from "react-icons/fa";

const initialForm = {
  name: "",
  category: "Design",
  description: "",
  startDate: "",
  dueDate: "",
  progress: 0,
  color: "bg-violet-500",
};

const colorOptions = [
  { label: "Violet", value: "bg-violet-500" },
  { label: "Blue", value: "bg-blue-500" },
  { label: "Green", value: "bg-emerald-500" },
  { label: "Orange", value: "bg-orange-500" },
  { label: "Pink", value: "bg-pink-500" },
];

const ProjectModal = ({ isOpen, onClose, onSave, projectToEdit = null }) => {
  if (!isOpen) return null;

  return (
    <ProjectModalForm
      key={projectToEdit?.id ?? "new-project"}
      onClose={onClose}
      onSave={onSave}
      projectToEdit={projectToEdit}
    />
  );
};

const ProjectModalForm = ({ onClose, onSave, projectToEdit }) => {
  const [form, setForm] = useState(() => ({
    ...initialForm,
    ...(projectToEdit
      ? {
          name: projectToEdit.name || "",
          category: projectToEdit.category || "Design",
          description: projectToEdit.description || "",
          startDate: projectToEdit.startDate || "",
          dueDate: projectToEdit.dueDate || "",
          progress: Number(projectToEdit.progress) || 0,
          color: projectToEdit.color || "bg-violet-500",
        }
      : {}),
  }));

  const [error, setError] = useState("");

  const isEditing = Boolean(projectToEdit);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: name === "progress" ? Number(value) : value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      setError("Please enter a project name.");
      return;
    }

    if (form.startDate && form.dueDate && form.dueDate < form.startDate) {
      setError("Due date cannot be earlier than the start date.");
      return;
    }

    const progress = Math.min(100, Math.max(0, Number(form.progress) || 0));

    onSave({
      ...form,
      name,
      progress,
      status:
        progress === 100
          ? "Completed"
          : progress === 0
            ? "Not Started"
            : "In Progress",
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="my-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-lg text-violet-600">
              <FaFolderPlus />
            </div>

            <div>
              <h2
                id="project-modal-title"
                className="text-lg font-bold text-slate-900"
              >
                {isEditing ? "Edit Project" : "Create New Project"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {isEditing
                  ? "Update your project information."
                  : "Add a new project to your workspace."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Project Name *
            </label>

            <input
              id="project-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Website Redesign"
              maxLength={100}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />
          </div>

          <div>
            <label
              htmlFor="project-category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="project-category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500"
            >
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="project-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="What is this project about?"
              rows={3}
              maxLength={500}
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="project-start-date"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Start Date
              </label>

              <input
                id="project-start-date"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="project-due-date"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Due Date
              </label>

              <input
                id="project-due-date"
                name="dueDate"
                type="date"
                min={form.startDate || undefined}
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <label
                htmlFor="project-progress"
                className="text-sm font-semibold text-slate-700"
              >
                Initial Progress
              </label>

              <span className="text-sm font-bold text-violet-600">
                {form.progress}%
              </span>
            </div>

            <input
              id="project-progress"
              name="progress"
              type="range"
              min="0"
              max="100"
              step="5"
              value={form.progress}
              onChange={handleChange}
              className="range range-primary range-sm w-full"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold text-slate-700">
              Project Color
            </p>

            <div className="flex flex-wrap gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  title={color.label}
                  aria-label={`${color.label} project color`}
                  aria-pressed={form.color === color.value}
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      color: color.value,
                    }))
                  }
                  className={`h-8 w-8 rounded-full ${color.value} ${
                    form.color === color.value
                      ? "ring-2 ring-slate-900 ring-offset-2"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
            >
              <FaSave />
              {isEditing ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
