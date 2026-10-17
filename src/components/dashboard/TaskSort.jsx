import { FaSortAmountDown } from "react-icons/fa";

const TaskSort = ({ sortBy, setSortBy }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <FaSortAmountDown className="text-violet-600" />
          Sort Tasks
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Organize your tasks your way.
        </p>
      </div>

      <select
        id="task-sort"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        aria-label="Sort tasks"
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 sm:w-auto"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="dueDateAsc">Due date: earliest first</option>
        <option value="dueDateDesc">Due date: latest first</option>
        <option value="priorityDesc">Priority: high to low</option>
        <option value="priorityAsc">Priority: low to high</option>
        <option value="titleAsc">Name: A to Z</option>
        <option value="titleDesc">Name: Z to A</option>
      </select>
    </div>
  );
};

export default TaskSort;
