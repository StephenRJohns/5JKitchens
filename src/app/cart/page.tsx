"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="section-padding text-center min-h-[60vh] flex flex-col items-center justify-center">
        <svg className="w-20 h-20 text-cream-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="font-serif text-3xl font-bold text-bark-800 mb-3">Your Cart is Empty</h1>
        <p className="text-bark-500 font-sans mb-8 max-w-sm">
          Looks like you haven&apos;t added anything yet. Browse our handcrafted goods and fill your cart with something delicious.
        </p>
        <Link href="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  const shipping = subtotal >= 50 ? 0 : 7.99;
  const total = subtotal + shipping;

  return (
    <>
      <div className="bg-bark-700 text-cream-100 py-12 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold">Your Cart</h1>
        <p className="text-bark-300 font-sans mt-2">{items.length} {items.length === 1 ? "item" : "items"}</p>
      </div>

      <section className="section-padding" aria-label="Cart contents">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-semibold text-bark-800">Items</h2>
                <button
                  onClick={clearCart}
                  className="text-sm font-sans text-bark-400 hover:text-rust-500 transition-colors underline"
                >
                  Clear cart
                </button>
              </div>

              {items.map((item) => (
                <article
                  key={item.product.id}
                  className="bg-white border border-cream-200 p-4 flex gap-4 shadow-sm"
                >
                  <Link href={`/shop/${item.product.slug}`} className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-sm" aria-label={`View ${item.product.name}`}>
                    <ProductImage product={item.product} size="sm" className="h-24" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/shop/${item.product.slug}`}>
                          <h3 className="font-serif text-lg font-semibold text-bark-800 hover:text-bark-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-bark-400 text-sm font-sans">${item.product.price.toFixed(2)} each</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-bark-300 hover:text-rust-500 transition-colors p-1"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-cream-300 rounded-sm" role="group" aria-label="Quantity">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-bark-600 hover:bg-cream-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-4 py-1.5 font-sans font-semibold text-bark-800 min-w-[2.5rem] text-center text-sm" aria-label={`Quantity: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-bark-600 hover:bg-cream-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-serif text-lg font-bold text-bark-700">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Order Summary */}
            <aside aria-label="Order summary">
              <div className="bg-white border border-cream-200 p-6 shadow-sm sticky top-24">
                <h2 className="font-serif text-xl font-semibold text-bark-800 mb-6">Order Summary</h2>

                <dl className="space-y-3 font-sans text-sm mb-6">
                  <div className="flex justify-between">
                    <dt className="text-bark-500">Subtotal</dt>
                    <dd className="text-bark-700 font-semibold">${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-bark-500">Shipping</dt>
                    <dd className={shipping === 0 ? "text-sage-600 font-semibold" : "text-bark-700 font-semibold"}>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </dd>
                  </div>
                  {shipping > 0 && (
                    <div className="text-bark-400 text-xs bg-cream-100 p-2 rounded">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                  )}
                  <div className="flex justify-between border-t border-cream-200 pt-3 mt-3">
                    <dt className="font-bold text-bark-800 text-base">Total</dt>
                    <dd className="font-serif font-bold text-bark-800 text-xl">${total.toFixed(2)}</dd>
                  </div>
                </dl>

                <Link href="/checkout" className="btn-primary w-full text-center block mb-3">
                  Proceed to Checkout
                </Link>
                <Link href="/shop" className="btn-secondary w-full text-center block">
                  Continue Shopping
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
