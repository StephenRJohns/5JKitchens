"use client";

import { useState } from "react";

interface NewsletterProps {
  variant?: "hero" | "footer";
}

export default function Newsletter({ variant = "hero" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validate = (value: string) => {
    if (!value.trim()) return "Email address is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setErrorMsg(err);
      setStatus("error");
      return;
    }
    // Simulate success (no backend)
    setStatus("success");
    setEmail("");
    setErrorMsg("");
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} noValidate aria-label="Newsletter signup">
        {status === "success" ? (
          <p className="text-sage-300 text-sm font-sans">Thank you for subscribing!</p>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrorMsg(""); }}
                placeholder="Your email address"
                className="flex-1 px-3 py-2 bg-bark-700 border border-bark-500 text-cream-200 placeholder-bark-400 text-sm font-sans focus:outline-none focus:border-cream-400 rounded-sm"
                aria-label="Email address"
                aria-describedby={status === "error" ? "newsletter-error-footer" : undefined}
              />
              <button type="submit" className="btn-primary py-2 px-4 text-xs whitespace-nowrap">
                Subscribe
              </button>
            </div>
            {status === "error" && (
              <p id="newsletter-error-footer" className="text-rust-300 text-xs font-sans" role="alert">
                {errorMsg}
              </p>
            )}
          </div>
        )}
      </form>
    );
  }

  return (
    <section className="bg-bark-700 py-16 lg:py-20 px-4" aria-labelledby="newsletter-heading">
      <div className="container-max text-center">
        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
          <div className="h-px w-16 bg-bark-500" />
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-cream-400" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
          <div className="h-px w-16 bg-bark-500" />
        </div>

        <h2 id="newsletter-heading" className="font-serif text-3xl lg:text-4xl text-cream-100 mb-3">
          Join Our Table
        </h2>
        <p className="text-bark-300 font-sans max-w-lg mx-auto mb-8 leading-relaxed">
          Be the first to hear about new flavors, seasonal specials, and recipes straight from our kitchen. No spam — ever.
        </p>

        {status === "success" ? (
          <div className="bg-bark-600 border border-sage-600 rounded-sm px-8 py-6 inline-block animate-fade-in">
            <svg className="w-8 h-8 text-sage-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-cream-200 font-serif text-lg">You&apos;re on the list!</p>
            <p className="text-bark-300 text-sm mt-1">Check your inbox for a welcome note.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            aria-label="Newsletter signup form"
          >
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setErrorMsg(""); }}
                placeholder="your@email.com"
                className="w-full px-5 py-3 bg-bark-800 border border-bark-500 text-cream-200 placeholder-bark-400 font-sans focus:outline-none focus:border-cream-400 focus:ring-1 focus:ring-cream-400 transition-all rounded-sm"
                aria-label="Email address"
                aria-describedby={status === "error" ? "newsletter-error" : undefined}
              />
              {status === "error" && (
                <p id="newsletter-error" className="text-rust-300 text-xs mt-1 text-left font-sans" role="alert">
                  {errorMsg}
                </p>
              )}
            </div>
            <button type="submit" className="btn-primary whitespace-nowrap bg-cream-200 text-bark-800 hover:bg-cream-100 hover:text-bark-900">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
