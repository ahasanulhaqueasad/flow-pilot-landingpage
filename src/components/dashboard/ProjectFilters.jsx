import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

const ProjectFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
  };

  const hasActiveFilters = searchTerm.trim() !== "" || statusFilter !== "All";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 font-bold text-slate-800">
          <FaFilter className="text-violet-600" />
          Filter Projects
        </h3>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800"
          >
            <FaTimes />
            Reset filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Project search */}
        <div>
          <label
            htmlFor="project-search"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            Search projects
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-100">
            <FaSearch className="shrink-0 text-slate-400" />

            <input
              id="project-search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by project name..."
              className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none"
            />
          </div>
        </div>

        {/* Project status */}
        <div>
          <label
            htmlFor="project-status"
            className="mb-2 block text-sm font-medium text-slate-600"
          >
            Project status
          </label>

          <select
            id="project-status"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          >
            <option value="All">All projects</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default ProjectFilters;
