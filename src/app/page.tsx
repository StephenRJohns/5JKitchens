import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Newsletter from "@/components/Newsletter";

export const metadata: Metadata = {
  title: "5JKitchens — Artisan Handcrafted Butters & Dairy",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden bg-bark-800 text-cream-100 min-h-[85vh] flex items-center"
        aria-labelledby="hero-heading"
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FAF5E8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Warm glow */}
        <div
          className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 70% 40%, #C0683A 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            {/* Pre-heading */}
            <div className="flex items-center gap-3 mb-6" aria-hidden="true">
              <div className="h-px w-12 bg-cream-400" />
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-cream-400">
                Small-Batch Artisan Kitchen Goods
              </span>
            </div>

            <h1 id="hero-heading" className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-cream-100 leading-[1.05] mb-6">
              Experience<br />
              <span className="italic">Culinary</span><br />
              Craftsmanship.
            </h1>

            <p className="font-sans text-lg text-cream-300 max-w-xl leading-relaxed mb-10">
              Handcrafted butters, cultured buttermilk, and homestyle ranch — made in small batches with the finest ingredients. Taste the difference that care makes.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary bg-cream-200 text-bark-800 hover:bg-cream-100">
                Shop Now
              </Link>
              <Link href="/about" className="btn-secondary border-cream-400 text-cream-300 hover:bg-cream-200 hover:text-bark-800 hover:border-cream-200">
                Our Story
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,80 C360,10 1080,10 1440,80 L1440,80 L0,80 Z" fill="#FAF5E8" />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding" aria-labelledby="products-heading">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
              <div className="h-px w-16 bg-bark-300" />
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-bark-400" fill="currentColor" aria-hidden="true">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              <div className="h-px w-16 bg-bark-300" />
            </div>
            <h2 id="products-heading" className="font-serif text-4xl lg:text-5xl font-bold text-bark-800 mb-4">
              Our Products
            </h2>
            <p className="text-bark-500 font-sans max-w-lg mx-auto leading-relaxed">
              Every jar, every log, every bottle — made by hand in small batches from the freshest ingredients.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        className="bg-bark-800 text-cream-100 section-padding relative overflow-hidden"
        aria-labelledby="story-heading"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#FAF5E8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Illustration */}
            <div className="relative">
              <div className="rounded-sm overflow-hidden max-w-md mx-auto shadow-xl border border-bark-600">
                <Image
                  src="/5JK.png"
                  alt="The 5JKitchens team crafting compound butters in the kitchen"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-cream-500 opacity-30" aria-hidden="true" />
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-3 mb-6" aria-hidden="true">
                <div className="h-px w-12 bg-bark-500" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-bark-400">Our Story</span>
              </div>
              <h2 id="story-heading" className="font-serif text-4xl lg:text-5xl font-bold text-cream-100 mb-6 leading-tight">
                Made By Hand.<br />Made With Heart.
              </h2>
              <div className="space-y-4 font-sans text-bark-300 leading-relaxed">
                <p>
                  5JKitchens began at a farmer&apos;s market table with a single recipe: a classic cultured butter made with cream from a single dairy farm just forty miles away. People kept coming back. So did we.
                </p>
                <p>
                  Today we still make everything in small batches — by hand, in our kitchen — using the same commitment to quality that got us here. No shortcuts. No mystery ingredients. Just honest, delicious food made the way it deserves to be.
                </p>
                <p>
                  Every compound butter, every bottle of buttermilk, every jar of ranch is a reflection of our belief that the best food is simple, carefully made, and worth sharing.
                </p>
              </div>
              <Link href="/about" className="btn-secondary border-cream-500 text-cream-300 hover:bg-cream-200 hover:text-bark-800 hover:border-cream-200 mt-8 inline-block">
                Read Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="section-padding bg-cream-50" aria-label="Why choose 5JKitchens">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              {
                icon: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M24 4C14 4 8 12 8 20c0 12 16 24 16 24s16-12 16-24c0-8-6-16-16-16z" />
                    <circle cx="24" cy="20" r="5" />
                  </svg>
                ),
                title: "Locally Sourced",
                desc: "Cream and dairy from farms within 50 miles of our kitchen.",
              },
              {
                icon: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M24 6l4 12h14L30 26l4 13-14-9-14 9 4-13L2 18h14z" />
                  </svg>
                ),
                title: "Small Batch",
                desc: "Every product made in small quantities for maximum freshness and quality.",
              },
              {
                icon: (
                  <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M8 40V20q0-12 10-14h12q10 2 10 14v20" />
                    <path d="M16 24l4 4 8-12" />
                  </svg>
                ),
                title: "No Additives",
                desc: "Real ingredients only. No preservatives, stabilizers, or artificial flavors.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-4">
                <div className="text-bark-500">{icon}</div>
                <h3 className="font-serif text-xl font-semibold text-bark-800">{title}</h3>
                <p className="text-bark-500 font-sans text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
}
