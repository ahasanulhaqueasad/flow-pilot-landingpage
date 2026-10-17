import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../firebase";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import ProjectList from "../components/dashboard/ProjectList";
import ProjectStats from "../components/dashboard/ProjectStats";
import ProjectModal from "../components/dashboard/ProjectModal";
import TaskList from "../components/dashboard/TaskList";
import TaskModal from "../components/dashboard/TaskModal";
import TaskProgress from "../components/dashboard/TaskProgress";
import ConfirmDialog from "../components/dashboard/ConfirmDialog";

import CalendarView from "../components/dashboard/CalendarView";
import Team from "../components/dashboard/Team";
import Analytics from "../components/dashboard/Analytics";
import Settings from "../components/dashboard/Settings";

const PROJECTS_KEY = "flowpilot-projects";
const TASKS_KEY = "flowpilot-tasks";

const initialProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website and improve user experience.",
    progress: 75,
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Develop a responsive mobile application.",
    progress: 55,
  },
  {
    id: 3,
    name: "Marketing Campaign",
    description: "Plan and execute the upcoming marketing campaign.",
    progress: 90,
  },
  {
    id: 4,
    name: "Dashboard UI",
    description: "Build a modern project management dashboard.",
    progress: 35,
  },
];

const initialTasks = [
  {
    id: 101,
    title: "Review project requirements",
    description: "Review the project scope and requirements.",
    priority: "High",
    dueDate: "2026-10-20",
    projectId: 1,
    completed: false,
  },
  {
    id: 102,
    title: "Prepare dashboard design",
    description: "Prepare the initial dashboard design.",
    priority: "Medium",
    dueDate: "2026-10-22",
    projectId: 4,
    completed: false,
  },
  {
    id: 103,
    title: "Organize project files",
    description: "Organize files and folders.",
    priority: "Low",
    dueDate: "2026-10-25",
    projectId: 2,
    completed: true,
  },
];

function readLocalData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (saved === null) return fallback;

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.error(`Could not read ${key}:`, error);
    return fallback;
  }
}

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const [activeMenu, setActiveMenu] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [projectList, setProjectList] = useState(() =>
    readLocalData(PROJECTS_KEY, initialProjects),
  );

  const [taskList, setTaskList] = useState(() =>
    readLocalData(TASKS_KEY, initialTasks),
  );

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const [projectToEdit, setProjectToEdit] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    type: "",
    id: null,
    title: "",
    message: "",
  });

  const [actionError, setActionError] = useState("");

  // Firebase authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthLoading(false);
      },
      (error) => {
        console.error("Authentication error:", error);
        setAuthLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  // Persist projects
  useEffect(() => {
    try {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectList));
    } catch (error) {
      console.error("Could not save projects:", error);
    }
  }, [projectList]);

  // Persist tasks
  useEffect(() => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(taskList));
    } catch (error) {
      console.error("Could not save tasks:", error);
    }
  }, [taskList]);

  // Search projects
  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return projectList;

    return projectList.filter((project) =>
      `${project.name || ""} ${project.description || ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [projectList, searchTerm]);

  // Search tasks
  const filteredTasks = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return taskList;

    return taskList.filter((task) => {
      const project = projectList.find(
        (item) => String(item.id) === String(task.projectId),
      );

      return `${task.title || ""} ${task.description || ""} ${
        project?.name || ""
      }`
        .toLowerCase()
        .includes(query);
    });
  }, [taskList, projectList, searchTerm]);

  // Project modal
  const handleAddProject = useCallback(() => {
    setActionError("");
    setProjectToEdit(null);
    setProjectModalOpen(true);
  }, []);

  const handleEditProject = useCallback((project) => {
    setActionError("");
    setProjectToEdit(project);
    setProjectModalOpen(true);
  }, []);

  const handleCloseProjectModal = useCallback(() => {
    setProjectModalOpen(false);
    setProjectToEdit(null);
  }, []);

  // Create or update project
  const handleSaveProject = useCallback(
    (formData) => {
      if (!formData?.name?.trim()) {
        setActionError("Please enter a project name.");
        return;
      }

      setActionError("");

      const progress = Math.min(
        100,
        Math.max(0, Number(formData.progress) || 0),
      );

      if (projectToEdit) {
        setProjectList((previous) =>
          previous.map((project) =>
            project.id === projectToEdit.id
              ? {
                  ...project,
                  ...formData,
                  id: project.id,
                  name: formData.name.trim(),
                  progress,
                }
              : project,
          ),
        );
      } else {
        setProjectList((previous) => [
          {
            ...formData,
            id: Date.now(),
            name: formData.name.trim(),
            progress,
          },
          ...previous,
        ]);
      }

      setProjectModalOpen(false);
      setProjectToEdit(null);
    },
    [projectToEdit],
  );

  // Update project progress
  const handleProgressChange = useCallback((projectId, progress) => {
    const nextProgress = Math.min(100, Math.max(0, Number(progress) || 0));

    setProjectList((previous) =>
      previous.map((project) =>
        String(project.id) === String(projectId)
          ? { ...project, progress: nextProgress }
          : project,
      ),
    );
  }, []);

  // Task modal
  const handleAddTask = useCallback(() => {
    setActionError("");
    setTaskToEdit(null);
    setTaskModalOpen(true);
  }, []);

  const handleEditTask = useCallback((task) => {
    setActionError("");
    setTaskToEdit(task);
    setTaskModalOpen(true);
  }, []);

  const handleCloseTaskModal = useCallback(() => {
    setTaskModalOpen(false);
    setTaskToEdit(null);
  }, []);

  // Create or update task
  const handleSaveTask = useCallback(
    (formData) => {
      if (!formData?.title?.trim()) {
        setActionError("Please enter a task title.");
        return;
      }

      setActionError("");

      const normalizedTask = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description?.trim() || "",
        projectId: formData.projectId || "",
        priority: formData.priority || "Medium",
        completed: Boolean(formData.completed),
      };

      if (taskToEdit) {
        setTaskList((previous) =>
          previous.map((task) =>
            task.id === taskToEdit.id
              ? { ...task, ...normalizedTask, id: task.id }
              : task,
          ),
        );
      } else {
        setTaskList((previous) => [
          { id: Date.now(), ...normalizedTask },
          ...previous,
        ]);
      }

      setTaskModalOpen(false);
      setTaskToEdit(null);
    },
    [taskToEdit],
  );

  // Complete or reopen task
  const handleToggleComplete = useCallback((taskId) => {
    setTaskList((previous) =>
      previous.map((task) =>
        String(task.id) === String(taskId)
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }, []);

  // Delete project confirmation
  const handleDeleteProject = useCallback((project) => {
    setConfirmDialog({
      isOpen: true,
      type: "project",
      id: project.id,
      title: "Delete project?",
      message: `Are you sure you want to delete "${project.name}"? Assigned tasks will become unassigned.`,
    });
  }, []);

  // Delete task confirmation
  const handleDeleteTask = useCallback((task) => {
    setConfirmDialog({
      isOpen: true,
      type: "task",
      id: task.id,
      title: "Delete task?",
      message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
    });
  }, []);

  const handleCancelDelete = useCallback(() => {
    setConfirmDialog({
      isOpen: false,
      type: "",
      id: null,
      title: "",
      message: "",
    });
  }, []);

  const handleConfirmDelete = useCallback(() => {
    const { type, id } = confirmDialog;

    if (type === "project") {
      setProjectList((previous) =>
        previous.filter((project) => String(project.id) !== String(id)),
      );

      setTaskList((previous) =>
        previous.map((task) =>
          String(task.projectId) === String(id)
            ? { ...task, projectId: "" }
            : task,
        ),
      );
    }

    if (type === "task") {
      setTaskList((previous) =>
        previous.filter((task) => String(task.id) !== String(id)),
      );
    }

    handleCancelDelete();
  }, [confirmDialog, handleCancelDelete]);

  // Logout
  const handleLogout = useCallback(async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setActionError("");

    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
      setActionError("Could not log out. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  }, [loggingOut]);

  // Sidebar menu selection
  const handleMenuChange = useCallback((menu) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
    setSearchTerm("");
    setActionError("");
  }, []);

  const normalizedMenu = activeMenu.trim().toLowerCase();

  const renderContent = () => {
    switch (normalizedMenu) {
      case "projects":
        return (
          <div className="space-y-8">
            <ProjectStats projects={filteredProjects} />

            <ProjectList
              projects={filteredProjects}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onProgressChange={handleProgressChange}
              onAddProject={handleAddProject}
            />
          </div>
        );

      case "tasks":
        return (
          <TaskList
            tasks={filteredTasks}
            projects={projectList}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
            onAddTask={handleAddTask}
          />
        );

      case "calendar":
        return <CalendarView tasks={taskList} onAddTask={handleAddTask} />;

      case "team":
        return <Team />;

      case "analytics":
        return <Analytics projects={projectList} tasks={taskList} />;

      case "settings":
        return <Settings user={user} onLogout={handleLogout} />;

      case "overview":
      default:
        return (
          <div className="space-y-8">
            <ProjectStats projects={projectList} />

            <TaskProgress tasks={taskList} />

            <ProjectList
              projects={filteredProjects}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onProgressChange={handleProgressChange}
              onAddProject={handleAddProject}
            />

            <TaskList
              tasks={filteredTasks}
              projects={projectList}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              onAddTask={handleAddTask}
            />
          </div>
        );
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <span className="loading loading-spinner loading-lg text-indigo-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isOverview = normalizedMenu === "overview";

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-slate-50 text-slate-800">
      <div className="flex min-h-screen w-full">
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={handleMenuChange}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          projectCount={projectList.length}
          user={user}
          onLogout={handleLogout}
          loggingOut={loggingOut}
        />

        <main className="min-w-0 w-0 flex-1">
          <DashboardHeader
            activeMenu={activeMenu}
            user={user}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="mx-auto w-full max-w-[1800px] space-y-6 p-4 sm:p-6 lg:p-8">
            {isOverview && <WelcomeBanner user={user} />}

            {actionError && (
              <div
                role="alert"
                className="flex items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <p>{actionError}</p>

                <button
                  type="button"
                  onClick={() => setActionError("")}
                  className="font-semibold"
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {activeMenu}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {normalizedMenu === "calendar"
                    ? "View your tasks by date."
                    : normalizedMenu === "team"
                      ? "Manage your team members."
                      : normalizedMenu === "analytics"
                        ? "Track your project and task performance."
                        : normalizedMenu === "settings"
                          ? "Customize your FlowPilot experience."
                          : "Manage your projects and tasks in one place."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
                >
                  + New project
                </button>

                <button
                  type="button"
                  onClick={handleAddTask}
                  className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                >
                  + New task
                </button>
              </div>
            </div>

            {renderContent()}
          </div>
        </main>
      </div>

      <ProjectModal
        isOpen={projectModalOpen}
        onClose={handleCloseProjectModal}
        onSave={handleSaveProject}
        projectToEdit={projectToEdit}
      />

      <TaskModal
        isOpen={taskModalOpen}
        onClose={handleCloseTaskModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
        projects={projectList}
      />

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default Dashboard;
