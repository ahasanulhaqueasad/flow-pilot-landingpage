import { useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";

const CalendarView = ({ tasks = [], onAddTask }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10),
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
  }, [year, month]);

  const formatDate = (day) => {
    const date = new Date(year, month, day);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  };

  const selectedTasks = tasks.filter((task) => task.dueDate === selectedDate);

  const today = new Date();
  const todayKey = formatDateFor(today);

  function formatDateFor(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Calendar</h2>
          <p className="text-sm opacity-60">Manage your tasks by date</p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onAddTask?.(selectedDate)}
        >
          <FiPlus /> Add Task
        </button>
      </div>

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="flex items-center justify-between gap-2 p-4">
          <h3 className="text-lg font-semibold">{monthName}</h3>

          <div className="flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              aria-label="Previous month"
            >
              <FiChevronLeft />
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>

            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              aria-label="Next month"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 border-t border-base-300">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-xs font-semibold opacity-60 sm:p-3"
            >
              {day}
            </div>
          ))}

          {days.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-16 border-t border-base-200 sm:min-h-24"
                />
              );
            }

            const dateKey = formatDate(day);
            const dayTasks = tasks.filter((task) => task.dueDate === dateKey);
            const isSelected = selectedDate === dateKey;
            const isToday = todayKey === dateKey;

            return (
              <button
                type="button"
                key={dateKey}
                onClick={() => setSelectedDate(dateKey)}
                className={`min-h-16 border-t border-base-200 p-1 text-left transition hover:bg-base-200 sm:min-h-24 sm:p-2 ${
                  isSelected
                    ? "bg-primary/10 ring-1 ring-inset ring-primary"
                    : ""
                }`}
              >
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                    isToday ? "bg-primary text-primary-content" : ""
                  }`}
                >
                  {day}
                </span>

                {dayTasks.length > 0 && (
                  <div className="mt-1 space-y-1">
                    <span className="block truncate rounded bg-primary/15 px-1 py-0.5 text-xs">
                      {dayTasks.length} task{dayTasks.length > 1 ? "s" : ""}
                    </span>
                    <div className="hidden space-y-1 sm:block">
                      {dayTasks.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          className="truncate text-xs opacity-70"
                        >
                          {task.title}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card border border-base-300 bg-base-100 p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">
          Tasks for{" "}
          {new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h3>

        {selectedTasks.length === 0 ? (
          <p className="text-sm opacity-60">
            No tasks scheduled for this date.
          </p>
        ) : (
          <div className="space-y-3">
            {selectedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between gap-3 rounded-lg bg-base-200 p-3"
              >
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs opacity-60">
                    {task.completed ? "Completed" : "Pending"}
                    {task.priority ? ` • ${task.priority} priority` : ""}
                  </p>
                </div>
                <span
                  className={`badge ${
                    task.completed ? "badge-success" : "badge-warning"
                  }`}
                >
                  {task.completed ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarView;
