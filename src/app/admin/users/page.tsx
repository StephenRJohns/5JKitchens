import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import UserTable from "./UserTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [users, subscribers] = await Promise.all([
    prisma.user.findMany({
      select: { id: true, username: true, email: true, role: true, forcePasswordChange: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.subscriber.findMany({ select: { email: true } }),
  ]);

  const subscribedEmails = subscribers.map((s) => s.email);

  return (
    <AdminShell>
      <div className="px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-bark-800">Users</h1>
          <p className="text-bark-500 text-sm mt-1">Manage user accounts and access.</p>
        </div>
        <UserTable initialUsers={users} subscribedEmails={subscribedEmails} />
      </div>
    </AdminShell>
  );
}
