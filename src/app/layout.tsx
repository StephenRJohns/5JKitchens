import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "5JKitchens — Artisan Handcrafted Butters & Dairy",
    template: "%s | 5JKitchens",
  },
  description:
    "5JKitchens crafts small-batch artisan butters, buttermilk, and ranch dressing using the finest ingredients. Experience culinary craftsmanship.",
  keywords: ["artisan butter", "compound butter", "buttermilk", "ranch dressing", "small batch", "handcrafted"],
  openGraph: {
    title: "5JKitchens — Artisan Handcrafted Butters & Dairy",
    description: "Small-batch artisan butters, buttermilk, and ranch dressing. Experience culinary craftsmanship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Header />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
