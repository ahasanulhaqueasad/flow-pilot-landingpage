import { FaFilter, FaSearch } from "react-icons/fa";

const TaskFilters = ({ filters, setFilters, searchTerm, setSearchTerm }) => {
  const updateFilter = (key, value) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: "All",
      priority: "All",
    });

    setSearchTerm("");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-bold text-slate-800">
          <FaFilter className="text-violet-600" />
          Filter Tasks
        </h3>

        <button
          type="button"
          onClick={resetFilters}
          className="text-sm font-semibold text-violet-600 transition hover:text-violet-800"
        >
          Reset filters
        </button>
      </div>

      {/* Search and filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div>
          <label
            htmlFor="task-search"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            Search tasks
          </label>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
            <FaSearch className="shrink-0 text-slate-400" />

            <input
              id="task-search"
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by task name..."
              className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="task-status-filter"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            Task status
          </label>

          <select
            id="task-status-filter"
            value={filters.status}
            onChange={(event) => updateFilter("status", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          >
            <option value="All">All tasks</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label
            htmlFor="task-priority-filter"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            Priority
          </label>

          <select
            id="task-priority-filter"
            value={filters.priority}
            onChange={(event) => updateFilter("priority", event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default TaskFilters;
