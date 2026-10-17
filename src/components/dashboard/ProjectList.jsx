import { useMemo, useState } from "react";

import ProjectCard from "./ProjectCard";
import ProjectFilters from "./ProjectFilters";
import ProjectSort from "./ProjectSort";
import TaskState from "./TaskState";

const getProjectStatus = (project) => {
  const progress = Number(project.progress) || 0;

  if (progress >= 100) return "Completed";
  if (progress <= 0) return "Not Started";

  return "In Progress";
};

const ProjectList = ({
  projects = [],
  onEdit,
  onDelete,
  onProgressChange,
  onAddProject,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filteredProjects = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const result = projects.filter((project) => {
      const name = (project.name || "").toLowerCase();
      const description = (project.description || "").toLowerCase();

      const matchesSearch =
        name.includes(search) || description.includes(search);

      const matchesStatus =
        statusFilter === "All" || getProjectStatus(project) === statusFilter;

      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return Number(a.id) - Number(b.id);

        case "nameAsc":
          return (a.name || "").localeCompare(b.name || "");

        case "nameDesc":
          return (b.name || "").localeCompare(a.name || "");

        case "progressDesc":
          return (Number(b.progress) || 0) - (Number(a.progress) || 0);

        case "progressAsc":
          return (Number(a.progress) || 0) - (Number(b.progress) || 0);

        case "status":
          return getProjectStatus(a).localeCompare(getProjectStatus(b));

        case "newest":
        default:
          return Number(b.id) - Number(a.id);
      }
    });

    return result;
  }, [projects, searchTerm, statusFilter, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setSortBy("newest");
  };

  return (
    <div className="space-y-6">
      {/* Search and filters */}
      <ProjectFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Sorting */}
      <ProjectSort sortBy={sortBy} setSortBy={setSortBy} />

      {/* Project count */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-slate-900">Your Projects</h2>

        <p className="text-sm text-slate-500">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>
      </div>

      {/* Project list */}
      {loading ? (
        <TaskState type="loading" message="Loading projects..." />
      ) : filteredProjects.length === 0 ? (
        projects.length === 0 ? (
          <TaskState
            type="empty"
            message="No projects yet"
            description="Create your first project to organize your work."
            onAddTask={onAddProject}
          />
        ) : (
          <TaskState
            type="no-results"
            message="No matching projects"
            description="Try another project name or change the filters."
            onResetFilters={resetFilters}
          />
        )
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
              onProgressChange={onProgressChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
