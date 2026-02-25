"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductImage from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="bg-white rounded-sm shadow-sm card-hover group border border-cream-200 flex flex-col">
      <Link href={`/shop/${product.slug}`} className="block overflow-hidden" aria-label={`View ${product.name}`}>
        <ProductImage product={product} size="md" className="transition-transform duration-500 group-hover:scale-105" />
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/shop/${product.slug}`}>
            <h3 className="font-serif text-lg font-semibold text-bark-800 hover:text-bark-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-bark-600 font-semibold font-sans whitespace-nowrap">
            ${product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-bark-500 text-sm font-sans leading-relaxed mb-4 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => addItem(product)}
            className="btn-primary flex-1 text-center"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
          <Link
            href={`/shop/${product.slug}`}
            className="btn-secondary px-4"
            aria-label={`View details for ${product.name}`}
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
