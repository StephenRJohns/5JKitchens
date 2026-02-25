"use client";

import { useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  forcePasswordChange: boolean;
  createdAt: Date | string;
}

interface UserTableProps {
  initialUsers: User[];
  subscribedEmails: string[];
}

const emptyForm = { username: "", email: "", password: "", role: "user", forcePasswordChange: false };

export default function UserTable({ initialUsers, subscribedEmails }: UserTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [subscribed, setSubscribed] = useState<Set<string>>(new Set(subscribedEmails));
  const [showAdd, setShowAdd] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const openAdd = () => { setForm(emptyForm); setError(""); setShowAdd(true); };
  const openEdit = (u: User) => {
    setForm({ username: u.username, email: u.email, password: "", role: u.role, forcePasswordChange: u.forcePasswordChange });
    setError("");
    setEditUser(u);
  };
  const closeModals = () => { setShowAdd(false); setEditUser(null); setDeleteUser(null); setError(""); };

  const handleSaveAdd = async () => {
    setSaving(true); setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      const newUser = await res.json();
      setUsers((prev) => [...prev, newUser]);
      closeModals();
    } else {
      const d = await res.json();
      setError(d.error || "Failed to create user.");
    }
  };

  const handleSaveEdit = async () => {
    if (!editUser) return;
    setSaving(true); setError("");
    const res = await fetch(`/api/admin/users/${editUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      const updated = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      closeModals();
    } else {
      const d = await res.json();
      setError(d.error || "Failed to update user.");
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    setSaving(true);
    const res = await fetch(`/api/admin/users/${deleteUser.id}`, { method: "DELETE" });
    setSaving(false);
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== deleteUser.id));
      closeModals();
    }
  };

  const handleToggleNewsletter = async (user: User) => {
    const res = await fetch(`/api/admin/users/${user.id}/newsletter`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setSubscribed((prev) => {
        const next = new Set(prev);
        if (data.subscribed) next.add(user.email);
        else next.delete(user.email);
        return next;
      });
    }
  };

  const handleForcePassword = async (user: User) => {
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ forcePasswordChange: true }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    }
  };

  return (
    <>
      {/* Add button */}
      <div className="flex justify-end mb-4">
        <button onClick={openAdd} className="btn-primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-cream-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="bg-cream-100 border-b border-cream-200">
                <th className="text-left px-4 py-3 text-bark-600 font-bold uppercase tracking-wide text-xs">Username</th>
                <th className="text-left px-4 py-3 text-bark-600 font-bold uppercase tracking-wide text-xs">Email</th>
                <th className="text-left px-4 py-3 text-bark-600 font-bold uppercase tracking-wide text-xs">Role</th>
                <th className="text-left px-4 py-3 text-bark-600 font-bold uppercase tracking-wide text-xs">Force PW</th>
                <th className="text-left px-4 py-3 text-bark-600 font-bold uppercase tracking-wide text-xs">Newsletter</th>
                <th className="text-left px-4 py-3 text-bark-600 font-bold uppercase tracking-wide text-xs">Created</th>
                <th className="text-right px-4 py-3 text-bark-600 font-bold uppercase tracking-wide text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {users.length === 0 && (
                <tr><td colSpan={7} className="text-center py-10 text-bark-400">No users found.</td></tr>
              )}
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-cream-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-bark-800">{u.username}</td>
                  <td className="px-4 py-3 text-bark-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      u.role === "admin" ? "bg-bark-100 text-bark-700" : "bg-cream-200 text-bark-500"
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.forcePasswordChange ? (
                      <span className="inline-flex items-center gap-1 text-rust-500 text-xs font-semibold">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        Yes
                      </span>
                    ) : (
                      <span className="text-bark-300 text-xs">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleNewsletter(u)}
                      title={subscribed.has(u.email) ? "Unsubscribe from newsletter" : "Subscribe to newsletter"}
                      aria-label={subscribed.has(u.email) ? `Unsubscribe ${u.username} from newsletter` : `Subscribe ${u.username} to newsletter`}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold transition-colors ${
                        subscribed.has(u.email)
                          ? "bg-sage-100 text-sage-700 hover:bg-rust-100 hover:text-rust-600"
                          : "bg-cream-200 text-bark-400 hover:bg-sage-100 hover:text-sage-700"
                      }`}
                    >
                      {subscribed.has(u.email) ? "✓ Subscribed" : "Off"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-bark-400 text-xs">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      {!u.forcePasswordChange && (
                        <button
                          onClick={() => handleForcePassword(u)}
                          title="Force password change on next login"
                          className="p-1.5 text-bark-400 hover:text-rust-500 transition-colors"
                          aria-label={`Force password change for ${u.username}`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => openEdit(u)}
                        title="Edit user"
                        className="p-1.5 text-bark-400 hover:text-bark-700 transition-colors"
                        aria-label={`Edit ${u.username}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteUser(u)}
                        title="Delete user"
                        className="p-1.5 text-bark-400 hover:text-rust-500 transition-colors"
                        aria-label={`Delete ${u.username}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {(showAdd || editUser) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bark-900 bg-opacity-60 px-4" role="dialog" aria-modal="true" aria-label={showAdd ? "Add user" : "Edit user"}>
          <div className="bg-white w-full max-w-md shadow-2xl rounded-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200">
              <h2 className="font-serif text-xl font-bold text-bark-800">{showAdd ? "Add User" : "Edit User"}</h2>
              <button onClick={closeModals} className="text-bark-400 hover:text-bark-700" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { id: "f-username", label: "Username", field: "username", type: "text", required: showAdd },
                { id: "f-email", label: "Email", field: "email", type: "email", required: showAdd },
                { id: "f-password", label: showAdd ? "Password" : "New Password (leave blank to keep)", field: "password", type: "password", required: showAdd },
              ].map(({ id, label, field, type, required }) => (
                <div key={field}>
                  <label htmlFor={id} className="block text-xs font-bold text-bark-600 uppercase tracking-wide mb-1">{label}{required && " *"}</label>
                  <input
                    id={id}
                    type={type}
                    value={(form as Record<string, string | boolean>)[field] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-bark-800 text-sm focus:outline-none focus:border-bark-500 rounded-sm"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="f-role" className="block text-xs font-bold text-bark-600 uppercase tracking-wide mb-1">Role</label>
                <select
                  id="f-role"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-cream-300 bg-cream-50 text-bark-800 text-sm focus:outline-none focus:border-bark-500 rounded-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.forcePasswordChange}
                  onChange={(e) => setForm((f) => ({ ...f, forcePasswordChange: e.target.checked }))}
                  className="w-4 h-4 accent-bark-600"
                />
                <span className="text-sm text-bark-700">Force password change on next login</span>
              </label>
              {error && <p className="text-sm text-rust-500 bg-rust-100 border border-rust-200 px-3 py-2 rounded-sm" role="alert">{error}</p>}
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-cream-200">
              <button onClick={closeModals} className="btn-secondary">Cancel</button>
              <button onClick={showAdd ? handleSaveAdd : handleSaveEdit} disabled={saving} className="btn-primary disabled:opacity-60">
                {saving ? "Saving…" : showAdd ? "Create User" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bark-900 bg-opacity-60 px-4" role="dialog" aria-modal="true" aria-label="Confirm delete">
          <div className="bg-white w-full max-w-sm shadow-2xl rounded-sm p-6 text-center">
            <svg className="w-12 h-12 text-rust-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="font-serif text-xl font-bold text-bark-800 mb-2">Delete User?</h2>
            <p className="text-bark-500 text-sm mb-6">
              Are you sure you want to delete <strong>{deleteUser.username}</strong>? This cannot be undone.
            </p>
            <div className="flex justify-center gap-3">
              <button onClick={closeModals} className="btn-secondary">Cancel</button>
              <button
                onClick={handleDelete}
                disabled={saving}
                className="btn-primary bg-rust-500 border-rust-500 hover:bg-rust-600 disabled:opacity-60"
              >
                {saving ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
