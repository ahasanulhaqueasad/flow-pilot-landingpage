import { FaSearch, FaBell, FaBars } from "react-icons/fa";

const DashboardHeader = ({
  activeMenu,
  user,
  searchTerm,
  setSearchTerm,
  setSidebarOpen,
}) => {
  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  const profileLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Page title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="rounded-xl border border-slate-200 p-2.5 lg:hidden"
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>

        <div>
          <h1 className="text-xl font-extrabold text-slate-900">
            {activeMenu}
          </h1>

          <p className="hidden text-xs text-slate-400 sm:block">
            Workspace / {activeMenu}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Desktop search */}
        <label className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 md:flex">
          <FaSearch className="text-slate-400" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search projects..."
            className="w-36 bg-transparent text-sm outline-none lg:w-48"
          />
        </label>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => alert("Notifications will be added later.")}
          className="relative rounded-xl border border-slate-200 p-3 text-slate-500 hover:bg-violet-50"
        >
          <FaBell />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User profile */}
        <div className="hidden items-center gap-2 sm:flex">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
              {profileLetter}
            </div>
          )}

          <span className="max-w-32 truncate text-sm font-bold">
            {displayName}
          </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
