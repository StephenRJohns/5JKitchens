"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
];

interface ShippingForm {
  firstName: string; lastName: string; email: string; phone: string;
  address1: string; address2: string; city: string; state: string;
  zip: string; country: string;
}

const emptyForm: ShippingForm = {
  firstName: "", lastName: "", email: "", phone: "",
  address1: "", address2: "", city: "", state: "", zip: "", country: "US",
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<ShippingForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  const shipping = subtotal >= 50 ? 0 : 7.99;
  const total = subtotal + shipping;

  const set = (field: keyof ShippingForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Partial<ShippingForm> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.address1.trim()) e.address1 = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state.trim()) e.state = "Required";
    if (!form.zip.trim()) e.zip = "Required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    setApiError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, items, subtotal }),
    });
    setSubmitting(false);
    if (res.ok) {
      const data = await res.json();
      setOrderId(data.orderId);
      clearCart();
    } else {
      const data = await res.json();
      setApiError(data.error || "Something went wrong. Please try again.");
    }
  };

  // Order confirmed screen
  if (orderId) {
    return (
      <div className="section-padding min-h-[70vh] flex items-center justify-center">
        <div className="bg-white border border-cream-200 shadow-sm rounded-sm max-w-lg w-full mx-4 p-10 text-center animate-fade-in">
          <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <svg className="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-bold text-bark-800 mb-3">Order Received!</h1>
          <p className="text-bark-500 font-sans mb-2 leading-relaxed">
            Thank you, {form.firstName}! Your order has been placed.
          </p>
          <p className="text-bark-400 text-sm font-sans mb-6">
            Order <span className="font-mono text-bark-600">#{orderId.slice(-8).toUpperCase()}</span> — a confirmation will be sent to <strong>{form.email}</strong>.
          </p>
          <p className="text-bark-400 text-xs font-sans bg-cream-50 border border-cream-200 rounded-sm px-4 py-2 mb-8">
            This is a demo storefront — no payment was charged and no goods will ship.
          </p>
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="section-padding min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl font-bold text-bark-800 mb-3">Your cart is empty</h1>
        <p className="text-bark-500 font-sans mb-8">Add some products before checking out.</p>
        <Link href="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-bark-700 text-cream-100 py-12 px-4 text-center">
        <h1 className="font-serif text-4xl font-bold">Checkout</h1>
        <p className="text-bark-300 font-sans mt-2">Enter your shipping details below.</p>
      </div>

      <section className="section-padding">
        <div className="container-max">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              {/* Shipping Form */}
              <div className="lg:col-span-2 space-y-6">

                {/* Contact */}
                <fieldset className="bg-white border border-cream-200 shadow-sm p-6">
                  <legend className="font-serif text-xl font-bold text-bark-800 mb-5">Contact Information</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="First Name *" error={errors.firstName}>
                      <input type="text" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} autoComplete="given-name" className={input(errors.firstName)} />
                    </Field>
                    <Field label="Last Name *" error={errors.lastName}>
                      <input type="text" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} autoComplete="family-name" className={input(errors.lastName)} />
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" className={input(errors.email)} />
                    </Field>
                    <Field label="Phone Number" error={errors.phone}>
                      <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" className={input(errors.phone)} />
                    </Field>
                  </div>
                </fieldset>

                {/* Shipping Address */}
                <fieldset className="bg-white border border-cream-200 shadow-sm p-6">
                  <legend className="font-serif text-xl font-bold text-bark-800 mb-5">Shipping Address</legend>
                  <div className="space-y-4">
                    <Field label="Address Line 1 *" error={errors.address1}>
                      <input type="text" value={form.address1} onChange={(e) => set("address1", e.target.value)} autoComplete="address-line1" placeholder="Street address, P.O. box" className={input(errors.address1)} />
                    </Field>
                    <Field label="Address Line 2" error={errors.address2}>
                      <input type="text" value={form.address2} onChange={(e) => set("address2", e.target.value)} autoComplete="address-line2" placeholder="Apartment, suite, unit, building (optional)" className={input(errors.address2)} />
                    </Field>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Field label="City *" error={errors.city} className="sm:col-span-1">
                        <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" className={input(errors.city)} />
                      </Field>
                      <Field label="State *" error={errors.state}>
                        <select value={form.state} onChange={(e) => set("state", e.target.value)} autoComplete="address-level1" className={input(errors.state)}>
                          <option value="">Select…</option>
                          {US_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </Field>
                      <Field label="ZIP Code *" error={errors.zip}>
                        <input type="text" value={form.zip} onChange={(e) => set("zip", e.target.value)} autoComplete="postal-code" maxLength={10} className={input(errors.zip)} />
                      </Field>
                    </div>
                    <Field label="Country" error={errors.country}>
                      <select value={form.country} onChange={(e) => set("country", e.target.value)} autoComplete="country" className={input(errors.country)}>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </Field>
                  </div>
                </fieldset>

                <div className="bg-cream-50 border border-cream-200 rounded-sm px-4 py-3 text-bark-400 text-xs font-sans">
                  No payment information is collected. This is a demo storefront — no charges will be made.
                </div>

                {apiError && (
                  <p className="text-rust-600 bg-rust-100 border border-rust-200 px-4 py-3 rounded-sm text-sm font-sans" role="alert">
                    {apiError}
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <aside aria-label="Order summary">
                <div className="bg-white border border-cream-200 shadow-sm p-6 sticky top-24">
                  <h2 className="font-serif text-xl font-semibold text-bark-800 mb-5">Order Summary</h2>
                  <ul className="space-y-3 mb-5">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex justify-between text-sm font-sans text-bark-600 gap-2">
                        <span className="truncate">{item.product.name} <span className="text-bark-400">× {item.quantity}</span></span>
                        <span className="font-semibold whitespace-nowrap">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="space-y-2 border-t border-cream-200 pt-4 font-sans text-sm">
                    <div className="flex justify-between">
                      <dt className="text-bark-500">Subtotal</dt>
                      <dd className="font-semibold">${subtotal.toFixed(2)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-bark-500">Shipping</dt>
                      <dd className={shipping === 0 ? "text-sage-600 font-semibold" : "font-semibold"}>
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </dd>
                    </div>
                    <div className="flex justify-between border-t border-cream-200 pt-3 mt-1">
                      <dt className="font-bold text-bark-800">Total</dt>
                      <dd className="font-serif font-bold text-bark-800 text-lg">${total.toFixed(2)}</dd>
                    </div>
                  </dl>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full mt-6 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Placing Order…
                      </>
                    ) : "Place Order"}
                  </button>
                  <Link href="/cart" className="btn-secondary w-full text-center block mt-3">
                    Back to Cart
                  </Link>
                </div>
              </aside>

            </div>
          </form>
        </div>
      </section>
    </>
  );
}

// Helper components
function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-bark-600 uppercase tracking-wide mb-1">{label}</label>
      {children}
      {error && <p className="text-rust-500 text-xs mt-1" role="alert">{error}</p>}
    </div>
  );
}

function input(error?: string) {
  return `w-full px-3 py-2.5 border font-sans text-sm text-bark-800 bg-cream-50 focus:outline-none focus:ring-1 rounded-sm ${
    error ? "border-rust-400 focus:border-rust-500 focus:ring-rust-400" : "border-cream-300 focus:border-bark-500 focus:ring-bark-500"
  }`;
}
