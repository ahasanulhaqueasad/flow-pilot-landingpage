import { useMemo, useState } from "react";

import TaskCard from "./TaskCard";
import TaskFilters from "./TaskFilters";
import TaskSort from "./TaskSort";
import TaskProgress from "./TaskProgress";
import TaskState from "./TaskState";

const getLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getPriorityValue = (priority) => {
  const priorities = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  return priorities[priority] || 2;
};

const TaskList = ({
  tasks = [],
  projects = [],
  onEdit,
  onDelete,
  onToggleComplete,
  onAddTask,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
  });

  const [sortBy, setSortBy] = useState("newest");

  const filteredTasks = useMemo(() => {
    const today = getLocalDate();
    const search = searchTerm.trim().toLowerCase();

    const result = tasks.filter((task) => {
      const matchesSearch =
        (task.title || "").toLowerCase().includes(search) ||
        (task.description || "").toLowerCase().includes(search);

      const matchesPriority =
        filters.priority === "All" || task.priority === filters.priority;

      let matchesStatus = true;

      if (filters.status === "Completed") {
        matchesStatus = Boolean(task.completed);
      } else if (filters.status === "Pending") {
        matchesStatus = !task.completed;
      } else if (filters.status === "Overdue") {
        matchesStatus =
          !task.completed && Boolean(task.dueDate) && task.dueDate < today;
      }

      return matchesSearch && matchesPriority && matchesStatus;
    });

    const priorityOrder = (task) => getPriorityValue(task.priority);

    result.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return Number(a.id) - Number(b.id);

        case "dueDateAsc":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);

        case "dueDateDesc":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return b.dueDate.localeCompare(a.dueDate);

        case "priorityDesc":
          return priorityOrder(b) - priorityOrder(a);

        case "priorityAsc":
          return priorityOrder(a) - priorityOrder(b);

        case "titleAsc":
          return (a.title || "").localeCompare(b.title || "");

        case "titleDesc":
          return (b.title || "").localeCompare(a.title || "");

        case "newest":
        default:
          return Number(b.id) - Number(a.id);
      }
    });

    return result;
  }, [tasks, searchTerm, filters, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      status: "All",
      priority: "All",
    });
    setSortBy("newest");
  };

  return (
    <div className="space-y-6">
      {/* Task progress summary */}
      <TaskProgress tasks={tasks} />

      {/* Search and filters */}
      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Sorting */}
      <TaskSort sortBy={sortBy} setSortBy={setSortBy} />

      {/* Task count */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-slate-900">Your Tasks</h2>

        <p className="text-sm text-slate-500">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
      </div>

      {/* Task list */}
      {loading ? (
        <TaskState type="loading" />
      ) : filteredTasks.length === 0 ? (
        tasks.length === 0 ? (
          <TaskState type="empty" onAddTask={onAddTask} />
        ) : (
          <TaskState type="no-results" onResetFilters={resetFilters} />
        )
      ) : (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {filteredTasks.map((task) => {
            const project = projects.find(
              (item) => String(item.id) === String(task.projectId),
            );

            return (
              <TaskCard
                key={task.id}
                task={task}
                project={project}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
