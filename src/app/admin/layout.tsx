import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin | 5JKitchens", robots: "noindex,nofollow" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-100 font-sans">
      {children}
    </div>
  );
}
