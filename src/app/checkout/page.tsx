"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  return (
    <div className="section-padding min-h-[70vh]">
      <div className="container-max max-w-2xl mx-auto text-center">
        <div className="bg-white border border-cream-200 rounded-sm shadow-sm p-10">
          <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <svg className="w-8 h-8 text-bark-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>

          <h1 className="font-serif text-3xl font-bold text-bark-800 mb-3">Checkout</h1>
          <p className="text-bark-500 font-sans mb-6 leading-relaxed">
            This is a demo storefront. Checkout functionality is a placeholder — no real payment will be processed.
          </p>

          {items.length > 0 && (
            <div className="bg-cream-50 border border-cream-200 rounded-sm p-4 mb-8 text-left">
              <h2 className="font-serif text-lg font-semibold text-bark-700 mb-3">Order Summary</h2>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.product.id} className="flex justify-between text-sm font-sans text-bark-600">
                    <span>{item.product.name} × {item.quantity}</span>
                    <span className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-cream-300 mt-3 pt-3 flex justify-between font-semibold text-bark-800">
                <span className="font-sans text-sm uppercase tracking-wide">Total</span>
                <span className="font-serif">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/cart" className="btn-secondary">
              Back to Cart
            </Link>
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
