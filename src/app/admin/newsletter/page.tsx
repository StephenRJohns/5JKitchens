import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import NewsletterCompose from "./NewsletterCompose";

export const dynamic = "force-dynamic";

export default async function AdminNewsletterPage() {
  const subscriberCount = await prisma.subscriber.count();

  return (
    <AdminShell>
      <div className="px-8 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-bark-800">Newsletter</h1>
          <p className="text-bark-500 text-sm mt-1">
            Send an email to all <strong>{subscriberCount}</strong> newsletter subscriber{subscriberCount !== 1 ? "s" : ""}.
          </p>
        </div>
        <NewsletterCompose subscriberCount={subscriberCount} />
      </div>
    </AdminShell>
  );
}
