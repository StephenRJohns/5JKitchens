"use client";

import { useState, useMemo } from "react";
import { products, Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

type Category = "all" | Product["category"];
type SortKey = "default" | "price-asc" | "price-desc" | "name-asc";

export default function ShopPage() {
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    const list = category === "all" ? products : products.filter((p) => p.category === category);
    switch (sort) {
      case "price-asc": return [...list].sort((a, b) => a.price - b.price);
      case "price-desc": return [...list].sort((a, b) => b.price - a.price);
      case "name-asc": return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default: return list;
    }
  }, [category, sort]);

  const categories: { key: Category; label: string }[] = [
    { key: "all", label: "All Products" },
    { key: "butter", label: "Butters" },
    { key: "dairy", label: "Dairy" },
    { key: "dressing", label: "Dressings" },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="bg-bark-700 text-cream-100 py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="shopgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#FAF5E8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#shopgrid)" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-3" aria-hidden="true">
            <div className="h-px w-10 bg-bark-400" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-bark-400">5J Kitchens</span>
            <div className="h-px w-10 bg-bark-400" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">Shop All Products</h1>
          <p className="text-bark-300 font-sans max-w-md mx-auto">
            Handcrafted in small batches — made fresh, made with love.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-cream-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-16 lg:top-20 z-20">
        <div className="container-max flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`px-4 py-1.5 text-sm font-sans font-bold uppercase tracking-wide transition-all border ${
                  category === key
                    ? "bg-bark-700 text-cream-100 border-bark-700"
                    : "bg-transparent text-bark-600 border-bark-300 hover:border-bark-600"
                }`}
                aria-pressed={category === key}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-bark-500 text-sm font-sans whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-cream-300 bg-cream-50 text-bark-700 text-sm font-sans px-3 py-1.5 focus:outline-none focus:border-bark-500 rounded-sm"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="section-padding" aria-live="polite" aria-label="Products">
        <div className="container-max">
          {filtered.length === 0 ? (
            <p className="text-center text-bark-500 font-sans py-16">No products found.</p>
          ) : (
            <>
              <p className="text-bark-400 text-sm font-sans mb-6" aria-live="polite">
                Showing {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
