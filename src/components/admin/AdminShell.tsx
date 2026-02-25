"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const HELP_SECTIONS = [
  {
    title: "Users",
    icon: (
      <svg className="w-5 h-5 text-bark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    items: [
      { label: "Add User", desc: "Click the \"Add User\" button to create a new account. Set a username, email, password, and role (User or Admin)." },
      { label: "Edit User", desc: "Click the pencil icon in the Actions column to edit a user's details. Leave the password field blank to keep the existing password." },
      { label: "Delete User", desc: "Click the trash icon and confirm to permanently remove a user account. This cannot be undone." },
      { label: "Newsletter Toggle", desc: "Click the subscriber badge in the Newsletter column to subscribe or unsubscribe that user from the newsletter mailing list." },
    ],
  },
  {
    title: "Newsletter",
    icon: (
      <svg className="w-5 h-5 text-bark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    items: [
      { label: "Subject", desc: "Enter a clear subject line that will appear in the recipient's inbox." },
      { label: "Message", desc: "Write the body of your newsletter. Plain text is supported." },
      { label: "Attachments", desc: "Optionally attach one or more files (PDFs, images, etc.) that will be included in the email." },
      { label: "Send", desc: "Click \"Send Newsletter\" to deliver the email to all current subscribers. The button shows the subscriber count before you send." },
    ],
  },
  {
    title: "Roles & Access",
    icon: (
      <svg className="w-5 h-5 text-bark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    items: [
      { label: "Admin role", desc: "Admin users have full access to the admin panel including user management and newsletter sending." },
      { label: "User role", desc: "Standard users can log into the storefront but cannot access the admin panel." },
      { label: "Session", desc: "Admin sessions last 7 days. Use the Logout button in the sidebar to end your session immediately." },
    ],
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [helpOpen, setHelpOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    {
      href: "/admin/users",
      label: "Users",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      href: "/admin/newsletter",
      label: "Newsletter",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-bark-800 text-cream-200 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-bark-700">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 flex-shrink-0" aria-hidden="true">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="19" fill="#FAF5E8" opacity="0.15" />
                <text x="20" y="26" textAnchor="middle" fill="#FAF5E8" fontSize="12" fontFamily="serif" fontWeight="bold">5J</text>
              </svg>
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-cream-100 block leading-none">5JKitchens</span>
              <span className="text-bark-400 text-[10px] uppercase tracking-widest">Admin Panel</span>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Admin navigation">
          {navLinks.map(({ href, label, icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-sans font-semibold transition-colors ${
                  active
                    ? "bg-bark-600 text-cream-100"
                    : "text-bark-300 hover:bg-bark-700 hover:text-cream-200"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-bark-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-sans font-semibold text-bark-300 hover:bg-bark-700 hover:text-cream-200 rounded-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto bg-cream-100">
        {/* Top bar */}
        <div className="flex items-center justify-end px-8 py-3 bg-white border-b border-cream-200 shadow-sm">
          <button
            onClick={() => setHelpOpen(true)}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-sans font-semibold text-bark-600 border border-cream-300 bg-cream-50 hover:bg-cream-100 hover:border-bark-400 rounded-sm transition-colors"
            aria-label="Open admin help"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </button>
        </div>

        {children}
      </main>

      {/* Help Modal */}
      {helpOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bark-900 bg-opacity-60 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Admin help"
          onClick={(e) => { if (e.target === e.currentTarget) setHelpOpen(false); }}
        >
          <div className="bg-white w-full max-w-2xl shadow-2xl rounded-sm max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-bark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="font-serif text-xl font-bold text-bark-800">Admin Panel Help</h2>
              </div>
              <button
                onClick={() => setHelpOpen(false)}
                className="text-bark-400 hover:text-bark-700 transition-colors"
                aria-label="Close help"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 py-5 space-y-6">
              <p className="text-bark-500 text-sm font-sans">
                Welcome to the 5JKitchens admin panel. Use the sidebar to navigate between sections. Below is a guide to each feature.
              </p>

              {HELP_SECTIONS.map((section) => (
                <div key={section.title}>
                  <div className="flex items-center gap-2 mb-3">
                    {section.icon}
                    <h3 className="font-serif text-lg font-bold text-bark-800">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item.label} className="flex gap-3">
                        <span className="mt-0.5 w-2 h-2 rounded-full bg-bark-400 flex-shrink-0 mt-1.5" aria-hidden="true" />
                        <div>
                          <span className="text-sm font-bold text-bark-700 font-sans">{item.label} — </span>
                          <span className="text-sm text-bark-500 font-sans">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="bg-cream-50 border border-cream-200 rounded-sm px-4 py-3 text-xs text-bark-400 font-sans">
                Need more help? Contact your system administrator or refer to the project documentation.
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end px-6 py-4 border-t border-cream-200 flex-shrink-0">
              <button onClick={() => setHelpOpen(false)} className="btn-primary">
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
