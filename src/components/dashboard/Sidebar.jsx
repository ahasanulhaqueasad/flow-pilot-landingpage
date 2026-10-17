import {
  FaLayerGroup,
  FaThLarge,
  FaFolder,
  FaCheckSquare,
  FaCalendarAlt,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  { name: "Overview", icon: FaThLarge },
  { name: "Projects", icon: FaFolder },
  { name: "Tasks", icon: FaCheckSquare },
  { name: "Calendar", icon: FaCalendarAlt },
  { name: "Team", icon: FaUsers },
  { name: "Analytics", icon: FaChartBar },
  { name: "Settings", icon: FaCog },
];

const Sidebar = ({
  activeMenu,
  setActiveMenu,
  sidebarOpen,
  setSidebarOpen,
  projectCount = 0,
  user,
  onLogout,
  loggingOut = false,
}) => {
  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex h-dvh w-64 max-w-[85vw] flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300 ease-in-out
          lg:sticky lg:top-0 lg:z-20 lg:h-screen
          lg:w-64 lg:max-w-none lg:shrink-0 lg:translate-x-0
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <button
            type="button"
            onClick={() => handleMenuClick("Overview")}
            className="flex min-w-0 items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-xl text-white shadow-lg shadow-violet-200">
              <FaLayerGroup />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Flow<span className="text-violet-600">Pilot</span>
              </h1>

              <p className="text-xs text-slate-400">Workspace</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <FaTimes />
          </button>
        </div>

        {/* Workspace label */}
        <div className="px-5 pb-3 pt-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Workspace
          </p>
        </div>

        {/* Navigation */}
        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 pb-4"
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => handleMenuClick(item.name)}
                aria-current={isActive ? "page" : undefined}
                className={`
                  flex w-full items-center gap-3
                  rounded-xl px-4 py-3 text-sm font-semibold
                  transition-colors duration-200
                  ${
                    isActive
                      ? "bg-violet-600 text-white shadow-md shadow-violet-200"
                      : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"
                  }
                `}
              >
                <Icon className="shrink-0 text-base" />

                <span className="flex-1 text-left">{item.name}</span>

                {item.name === "Projects" && (
                  <span
                    className={`
                      rounded-lg px-2 py-0.5 text-xs
                      ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      }
                    `}
                  >
                    {projectCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 space-y-3 border-t border-slate-100 p-4">
          {/* Back to website */}
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <FaHome />
            <span className="flex-1 text-left">Back to Website</span>
            <FaExternalLinkAlt className="text-xs" />
          </button>

          {/* User profile */}
          <div className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-700">
              {(user?.displayName || user?.email || "U")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800">
                {user?.displayName || "User"}
              </p>

              <p className="truncate text-xs text-slate-500">
                {user?.email || "Signed in"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            disabled={loggingOut}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingOut ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              <FaSignOutAlt />
            )}

            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
