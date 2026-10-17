import { useMemo, useState } from "react";
import {
  FiUsers,
  FiSearch,
  FiUserPlus,
  FiMail,
  FiTrash2,
} from "react-icons/fi";

const initialMembers = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Member",
    status: "Active",
  },
  {
    id: 3,
    name: "David Lee",
    email: "david@example.com",
    role: "Member",
    status: "Away",
  },
];

const Team = () => {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [error, setError] = useState("");

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query),
    );
  }, [members, search]);

  const addMember = (event) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail) {
      setError("Name and email are required.");
      return;
    }

    const emailExists = members.some(
      (member) => member.email.toLowerCase() === cleanEmail,
    );

    if (emailExists) {
      setError("This email is already in the team.");
      return;
    }

    setMembers((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: cleanName,
        email: cleanEmail,
        role,
        status: "Active",
      },
    ]);

    setName("");
    setEmail("");
    setRole("Member");
    setError("");
    setShowForm(false);
  };

  const removeMember = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this member?",
    );

    if (confirmed) {
      setMembers((current) => current.filter((member) => member.id !== id));
    }
  };

  const activeCount = members.filter(
    (member) => member.status === "Active",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="mt-1 text-sm opacity-60">
            Manage your team members and roles.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            setError("");
            setShowForm((current) => !current);
          }}
        >
          <FiUserPlus />
          Add Member
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="card border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-60">Total Members</p>
              <p className="mt-2 text-3xl font-bold">{members.length}</p>
            </div>
            <FiUsers className="text-2xl opacity-60" />
          </div>
        </div>

        <div className="card border border-base-300 bg-base-100 p-5 shadow-sm">
          <div>
            <p className="text-sm opacity-60">Active Members</p>
            <p className="mt-2 text-3xl font-bold">{activeCount}</p>
          </div>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={addMember}
          className="card border border-base-300 bg-base-100 p-5 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold">Add Team Member</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-control w-full">
              <span className="label-text mb-2">Full Name</span>
              <input
                className="input input-bordered w-full"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter full name"
                required
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-2">Email</span>
              <input
                className="input input-bordered w-full"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                required
              />
            </label>

            <label className="form-control w-full sm:col-span-2">
              <span className="label-text mb-2">Role</span>
              <select
                className="select select-bordered w-full"
                value={role}
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
                <option value="Project Manager">Project Manager</option>
              </select>
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-3 text-sm text-error">
              {error}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="submit" className="btn btn-primary">
              Save Member
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setShowForm(false);
                setError("");
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="card border border-base-300 bg-base-100 shadow-sm">
        <div className="border-b border-base-300 p-4">
          <label className="input input-bordered flex items-center gap-2">
            <FiSearch className="opacity-50" />
            <input
              className="grow"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search members..."
            />
          </label>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="p-8 text-center">
            <FiUsers className="mx-auto mb-3 text-3xl opacity-40" />
            <p className="font-semibold">No members found</p>
            <p className="mt-1 text-sm opacity-60">
              Try another search or add a member.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="w-10 rounded-full bg-primary/10 text-primary">
                            <span>
                              {member.name
                                .split(" ")
                                .map((part) => part[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <p className="flex items-center gap-1 text-xs opacity-60">
                            <FiMail />
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-outline">{member.role}</span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          member.status === "Active"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-ghost btn-sm text-error"
                        onClick={() => removeMember(member.id)}
                        aria-label={`Remove ${member.name}`}
                        title="Remove member"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
