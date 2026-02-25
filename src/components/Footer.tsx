import Link from "next/link";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-bark-800 text-bark-200">
      <Newsletter variant="footer" />

      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8" aria-hidden="true">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="20" r="19" fill="#FAF5E8" opacity="0.15" />
                  <text x="20" y="26" textAnchor="middle" fill="#FAF5E8" fontSize="12" fontFamily="serif" fontWeight="bold">5J</text>
                </svg>
              </div>
              <span className="font-serif text-lg font-bold text-cream-100">5JKitchens</span>
            </div>
            <p className="text-bark-300 text-sm leading-relaxed font-sans mb-4">
              Handcrafted, small-batch butters and dairy made with love and the finest ingredients. Experience culinary craftsmanship.
            </p>
            {/* Social icons */}
            <div className="flex gap-3" aria-label="Social media links">
              {["instagram", "facebook", "pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full border border-bark-600 flex items-center justify-center text-bark-400 hover:text-cream-200 hover:border-cream-400 transition-colors"
                  aria-label={`Follow us on ${social}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-cream-200 font-semibold mb-4">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/shop", label: "Shop All" },
                  { href: "/about", label: "Our Story" },
                  { href: "/cart", label: "Your Cart" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-bark-300 hover:text-cream-200 text-sm font-sans transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-cream-200 font-semibold mb-4">Stay in Touch</h3>
            <p className="text-bark-300 text-sm mb-4 font-sans">
              Get the latest recipes, new products, and seasonal specials delivered to your inbox.
            </p>
            <Newsletter variant="footer" />
          </div>
        </div>

        <div className="border-t border-bark-700 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-bark-400 text-xs font-sans">
            &copy; {new Date().getFullYear()} 5JKitchens. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a key={item} href="#" className="text-bark-400 hover:text-bark-200 text-xs font-sans transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
