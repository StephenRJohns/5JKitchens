"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductImage from "./ProductImage";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-bark-900 bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-cream-50 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-300 bg-white">
          <div>
            <h2 className="font-serif text-xl font-semibold text-bark-800">Your Cart</h2>
            <p className="text-bark-400 text-sm font-sans">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-bark-500 hover:text-bark-800 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <svg className="w-16 h-16 text-cream-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <div>
                <p className="font-serif text-lg text-bark-600">Your cart is empty</p>
                <p className="text-bark-400 text-sm mt-1">Add some delicious products to get started.</p>
              </div>
              <button onClick={closeCart} className="btn-secondary mt-2">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product.id} className="flex gap-4 bg-white p-3 rounded-sm border border-cream-200">
                  <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                    <ProductImage product={item.product} size="sm" className="h-16" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/shop/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-serif text-sm font-semibold text-bark-800 hover:text-bark-600 truncate"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-bark-300 hover:text-rust-500 transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-bark-500 text-sm">${item.product.price.toFixed(2)} each</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-cream-300 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 text-bark-600 hover:bg-cream-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-sm font-sans font-semibold text-bark-800 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 text-bark-600 hover:bg-cream-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-bark-700 font-semibold text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-cream-300 px-6 py-5 bg-white space-y-4">
            <div className="flex items-center justify-between text-bark-800">
              <span className="font-sans font-semibold uppercase tracking-wide text-sm">Subtotal</span>
              <span className="font-serif text-xl font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-bark-400 text-xs font-sans">Shipping and taxes calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </Link>
            <button onClick={closeCart} className="btn-secondary w-full text-center">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
