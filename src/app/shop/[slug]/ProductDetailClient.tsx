"use client";

import Link from "next/link";
import { useState } from "react";
import { Product, getRelatedProducts } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  const related = getRelatedProducts(product, 3);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryLabel: Record<string, string> = {
    butter: "Compound Butter",
    dairy: "Artisan Dairy",
    dressing: "House Dressing",
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-cream-50 border-b border-cream-200 px-4 sm:px-6 lg:px-8 py-3" aria-label="Breadcrumb">
        <div className="container-max">
          <ol className="flex items-center gap-2 text-sm font-sans text-bark-400">
            <li><Link href="/" className="hover:text-bark-600 transition-colors">Home</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li><Link href="/shop" className="hover:text-bark-600 transition-colors">Shop</Link></li>
            <li aria-hidden="true"><span>/</span></li>
            <li className="text-bark-700 font-semibold" aria-current="page">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Product Detail */}
      <section className="section-padding" aria-label="Product details">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Product Image */}
            <div className="lg:sticky lg:top-24">
              <div className="rounded-sm overflow-hidden shadow-lg border border-cream-200">
                <ProductImage product={product} size="lg" className="h-96 lg:h-[480px]" />
              </div>
              <div className="mt-4 flex justify-center">
                <span className="inline-block px-4 py-1 bg-cream-200 text-bark-600 text-xs font-sans font-bold uppercase tracking-widest rounded-full">
                  {categoryLabel[product.category]}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-3 mb-4" aria-hidden="true">
                <div className="h-px w-10 bg-bark-300" />
                <span className="font-sans text-xs uppercase tracking-[0.25em] text-bark-400">
                  {categoryLabel[product.category]}
                </span>
              </div>

              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-bark-800 mb-3">
                {product.name}
              </h1>

              <p className="font-serif text-2xl text-bark-600 font-semibold mb-6">
                ${product.price.toFixed(2)}
              </p>

              <p className="font-sans text-bark-500 leading-relaxed mb-8 text-lg">
                {product.fullDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8" aria-label="Product tags">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-cream-200 text-bark-500 text-xs font-sans uppercase tracking-wide rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex items-center border-2 border-cream-300 rounded-sm" role="group" aria-label="Quantity selector">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-bark-600 hover:bg-cream-100 transition-colors text-lg font-bold"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span
                    className="px-6 py-3 text-bark-800 font-semibold font-sans text-lg min-w-[3rem] text-center"
                    aria-live="polite"
                    aria-label={`Quantity: ${quantity}`}
                  >
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-bark-600 hover:bg-cream-100 transition-colors text-lg font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`btn-primary flex-1 transition-all duration-300 ${
                    added ? "bg-sage-600 border-sage-600" : ""
                  }`}
                  aria-live="polite"
                >
                  {added ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
              </div>

              <p className="text-bark-400 text-sm font-sans">
                Free shipping on orders over $50. Local pickup available.
              </p>

              <div className="border-t border-cream-200 mt-8 pt-8">
                <h2 className="font-serif text-lg font-semibold text-bark-700 mb-4">Product Details</h2>
                <dl className="space-y-2 font-sans text-sm">
                  <div className="flex gap-3">
                    <dt className="text-bark-400 w-24 flex-shrink-0">Category</dt>
                    <dd className="text-bark-700 capitalize">{product.category}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-bark-400 w-24 flex-shrink-0">SKU</dt>
                    <dd className="text-bark-700">5JK-{product.id.padStart(4, "0")}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="text-bark-400 w-24 flex-shrink-0">Origin</dt>
                    <dd className="text-bark-700">Small-batch, handcrafted in our kitchen</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-padding bg-cream-50" aria-labelledby="related-heading">
          <div className="container-max">
            <div className="text-center mb-10">
              <h2 id="related-heading" className="font-serif text-3xl font-bold text-bark-800 mb-2">
                You Might Also Like
              </h2>
              <p className="text-bark-400 font-sans">More handcrafted goods from our kitchen.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
