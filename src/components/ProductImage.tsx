"use client";

import { Product } from "@/data/products";

interface ProductImageProps {
  product: Product;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-full h-40",
  md: "w-full h-56",
  lg: "w-full h-80",
};

export default function ProductImage({ product, size = "md", className = "" }: ProductImageProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`${sizeClass} ${className} flex items-center justify-center relative overflow-hidden`}
      style={{ backgroundColor: product.bgColor }}
      aria-label={`${product.name} product image`}
    >
      {/* Decorative rings */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-20"
        style={{ color: product.color }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Main product visual */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <ProductSVGIcon product={product} />
        <span
          className="text-xs font-sans font-bold tracking-widest uppercase opacity-60"
          style={{ color: product.color }}
        >
          5JKitchens
        </span>
      </div>
    </div>
  );
}

function ProductSVGIcon({ product }: { product: Product }) {
  const color = product.color;

  switch (product.category) {
    case "butter":
      return (
        <svg viewBox="0 0 80 60" className="w-20 h-16" aria-hidden="true">
          {/* Butter block */}
          <rect x="10" y="20" width="60" height="30" rx="3" fill={color} opacity="0.9" />
          <rect x="10" y="20" width="60" height="8" rx="3" fill={color} />
          {/* Highlight */}
          <rect x="14" y="24" width="30" height="3" rx="1" fill="white" opacity="0.4" />
          {/* Wrapper paper */}
          <rect x="8" y="18" width="64" height="4" rx="2" fill="#F5F0E0" opacity="0.8" />
          <rect x="8" y="18" width="64" height="4" rx="2" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5" />
          {/* Label */}
          <rect x="20" y="28" width="40" height="14" rx="2" fill="white" opacity="0.3" />
          <text x="40" y="37" textAnchor="middle" fill="white" fontSize="5" fontFamily="serif" fontWeight="bold">
            {product.name.split(" ")[0]}
          </text>
        </svg>
      );
    case "dairy":
      return (
        <svg viewBox="0 0 60 80" className="w-16 h-20" aria-hidden="true">
          {/* Bottle */}
          <path d="M20 55 L18 70 Q18 75 22 75 L38 75 Q42 75 42 70 L40 55 Z" fill={color} opacity="0.85" />
          <path d="M22 30 L20 55 L40 55 L38 30 Z" fill={color} />
          <path d="M22 30 Q22 20 26 18 L34 18 Q38 20 38 30 Z" fill={color} opacity="0.9" />
          <rect x="26" y="14" width="8" height="6" rx="2" fill={color} />
          {/* Highlight */}
          <path d="M24 35 L23 55 L27 55 L28 35 Z" fill="white" opacity="0.25" />
          {/* Label */}
          <rect x="22" y="50" width="16" height="18" rx="1" fill="white" opacity="0.3" />
          <text x="30" y="61" textAnchor="middle" fill="white" fontSize="4" fontFamily="serif">5JK</text>
        </svg>
      );
    case "dressing":
      return (
        <svg viewBox="0 0 60 80" className="w-16 h-20" aria-hidden="true">
          {/* Jar */}
          <rect x="14" y="30" width="32" height="40" rx="4" fill={color} opacity="0.85" />
          {/* Lid */}
          <rect x="12" y="24" width="36" height="10" rx="3" fill={color} />
          <rect x="14" y="22" width="32" height="5" rx="2" fill={color} opacity="0.7" />
          {/* Highlight */}
          <rect x="18" y="34" width="8" height="28" rx="2" fill="white" opacity="0.2" />
          {/* Label */}
          <rect x="18" y="42" width="24" height="20" rx="2" fill="white" opacity="0.3" />
          <text x="30" y="53" textAnchor="middle" fill="white" fontSize="4" fontFamily="serif">Ranch</text>
          <text x="30" y="59" textAnchor="middle" fill="white" fontSize="3.5" fontFamily="serif">5JKitchens</text>
        </svg>
      );
  }
}
