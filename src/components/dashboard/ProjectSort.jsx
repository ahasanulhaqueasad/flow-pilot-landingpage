import { FaSortAmountDown } from "react-icons/fa";

const ProjectSort = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <FaSortAmountDown className="text-violet-600" />
          Sort Projects
        </h3>

        <p className="mt-1 text-sm text-slate-500">Organize your projects.</p>
      </div>

      <select
        id="project-sort"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        aria-label="Sort projects"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 sm:w-auto"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="nameAsc">Name: A to Z</option>
        <option value="nameDesc">Name: Z to A</option>
        <option value="progressDesc">Progress: highest first</option>
        <option value="progressAsc">Progress: lowest first</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
};

export default ProjectSort;
