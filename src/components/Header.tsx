"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAdmin = pathname.startsWith("/admin");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="bg-white border-b border-cream-300 sticky top-0 z-30 shadow-sm">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="5J Kitchens Home">
            <div className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center" aria-hidden="true">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="20" r="19" fill="#5C3B1E" />
                <text x="20" y="26" textAnchor="middle" fill="#FAF5E8" fontSize="12" fontFamily="serif" fontWeight="bold">5J</text>
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg lg:text-xl font-bold text-bark-800 group-hover:text-bark-600 transition-colors leading-none block">
                5J Kitchens
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-bark-400 hidden lg:block">
                Artisan Kitchen Goods
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm font-bold uppercase tracking-widest text-bark-600 hover:text-bark-800 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-bark-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button — hidden on admin pages */}
            {!isAdmin && (
              <button
                onClick={openCart}
                className="relative p-2 text-bark-700 hover:text-bark-900 transition-colors"
                aria-label={`Open cart, ${totalItems} items`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-9H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-bark-600 text-cream-100 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center font-sans leading-none"
                    aria-hidden="true"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-bark-700"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          className="md:hidden bg-white border-t border-cream-200 px-4 py-4 space-y-2"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 font-sans font-bold uppercase tracking-widest text-sm text-bark-600 hover:text-bark-800 border-b border-cream-100 last:border-0"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
