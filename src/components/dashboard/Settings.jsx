import { useEffect, useState } from "react";
import {
  FiUser,
  FiSettings,
  FiBell,
  FiShield,
  FiSave,
  FiLogOut,
} from "react-icons/fi";

const SETTINGS_KEY = "flowpilot-settings";

const defaultSettings = {
  displayName: "",
  theme: "light",
  taskReminders: true,
  projectUpdates: true,
  weeklySummary: false,
};

const Settings = ({ user, onLogout }) => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);

      return saved
        ? { ...defaultSettings, ...JSON.parse(saved) }
        : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const root = document.documentElement;

    if (settings.theme === "system") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", settings.theme);
    }
  }, [settings.theme]);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSavedMessage("");
  };

  const saveSettings = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

      setSavedMessage("Settings saved successfully.");
    } catch {
      setSavedMessage("Unable to save settings. Check your browser storage.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm opacity-60">
          Customize your FlowPilot experience.
        </p>
      </div>

      <form onSubmit={saveSettings} className="space-y-6">
        {/* Profile */}
        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="flex items-center gap-3 border-b border-base-300 p-5">
            <FiUser className="text-xl" />
            <div>
              <h2 className="font-semibold">Profile</h2>
              <p className="text-sm opacity-60">Your account information</p>
            </div>
          </div>

          <div className="space-y-4 p-5">
            <div className="flex items-center gap-4">
              <div className="avatar placeholder">
                <div className="w-14 rounded-full bg-primary text-primary-content">
                  <span className="text-xl">
                    {(user?.displayName || user?.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-semibold">
                  {user?.displayName || "FlowPilot User"}
                </p>
                <p className="text-sm opacity-60">
                  {user?.email || "No email available"}
                </p>
              </div>
            </div>

            <label className="form-control w-full">
              <span className="label-text mb-2">Display Name</span>

              <input
                className="input input-bordered w-full"
                value={settings.displayName}
                onChange={(event) =>
                  updateSetting("displayName", event.target.value)
                }
                placeholder={user?.displayName || "Enter display name"}
              />

              <span className="mt-1 text-xs opacity-60">
                This preference is saved locally; it does not change your
                Firebase profile.
              </span>
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-2">Email Address</span>

              <input
                className="input input-bordered w-full"
                value={user?.email || ""}
                readOnly
              />
            </label>
          </div>
        </section>

        {/* Appearance */}
        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="flex items-center gap-3 border-b border-base-300 p-5">
            <FiSettings className="text-xl" />
            <div>
              <h2 className="font-semibold">Appearance</h2>
              <p className="text-sm opacity-60">Choose your preferred theme</p>
            </div>
          </div>

          <div className="p-5">
            <label className="form-control w-full max-w-sm">
              <span className="label-text mb-2">Theme</span>

              <select
                className="select select-bordered w-full"
                value={settings.theme}
                onChange={(event) => updateSetting("theme", event.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">Use system preference</option>
              </select>
            </label>
          </div>
        </section>

        {/* Notifications */}
        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="flex items-center gap-3 border-b border-base-300 p-5">
            <FiBell className="text-xl" />
            <div>
              <h2 className="font-semibold">Notifications</h2>
              <p className="text-sm opacity-60">
                Set your notification preferences
              </p>
            </div>
          </div>

          <div className="divide-y divide-base-300 px-5">
            {[
              {
                key: "taskReminders",
                title: "Task reminders",
                description: "Preferences for upcoming task deadlines.",
              },
              {
                key: "projectUpdates",
                title: "Project updates",
                description: "Preferences for project activity.",
              },
              {
                key: "weeklySummary",
                title: "Weekly summary",
                description: "Preference for a weekly progress summary.",
              },
            ].map((item) => (
              <label
                key={item.key}
                className="flex cursor-pointer items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm opacity-60">{item.description}</p>
                </div>

                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={settings[item.key]}
                  onChange={(event) =>
                    updateSetting(item.key, event.target.checked)
                  }
                />
              </label>
            ))}
          </div>
        </section>

        {/* Account & Security */}
        <section className="card border border-base-300 bg-base-100 shadow-sm">
          <div className="flex items-center gap-3 border-b border-base-300 p-5">
            <FiShield className="text-xl" />
            <div>
              <h2 className="font-semibold">Account & Security</h2>
              <p className="text-sm opacity-60">Manage your current session</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Sign out</p>
              <p className="text-sm opacity-60">
                Sign out of your current account on this device.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-outline btn-error"
              onClick={onLogout}
              disabled={!onLogout}
            >
              <FiLogOut />
              Sign Out
            </button>
          </div>
        </section>

        {/* Save Settings */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p role="status" className="text-sm opacity-70">
            {savedMessage}
          </p>

          <button type="submit" className="btn btn-primary">
            <FiSave />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
