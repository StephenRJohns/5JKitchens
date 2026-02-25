import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about 5JKitchens — small-batch artisan butters, buttermilk, and ranch crafted with care.",
};

const values = [
  {
    title: "Real Ingredients",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    desc: "No stabilizers, no gums, no artificial anything. If it doesn't belong in your grandmother's kitchen, it doesn't belong in ours.",
  },
  {
    title: "Small Batches",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    desc: "We deliberately cap production. Freshness and quality require it. We'd rather sell out than compromise.",
  },
  {
    title: "Local First",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    desc: "Our dairy comes from within 50 miles. Our herbs are grown by our neighbors. We invest in our community.",
  },
  {
    title: "Honest Work",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    desc: "No shortcuts, no gimmicks. Just people who love good food, making it the right way, every single day.",
  },
];

const process = [
  {
    step: "01",
    title: "Source",
    desc: "We start with cream from a single small-herd dairy within 50 miles — pasture-raised, family-owned, and the same partner since day one.",
  },
  {
    step: "02",
    title: "Craft",
    desc: "Each butter is made in batches of no more than twenty logs. Every flavor earns its place through dozens of test batches before it reaches you.",
  },
  {
    step: "03",
    title: "Culture",
    desc: "Our buttermilk is traditionally cultured for a full 24 hours — the old way, the right way — and forms the base of our ranch dressing.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-bark-800 text-cream-100 py-24 lg:py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="aboutgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FAF5E8" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutgrid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <div className="h-px w-12 bg-bark-500" />
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-bark-400">Our Story</span>
            <div className="h-px w-12 bg-bark-500" />
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Made with Care,<br className="hidden sm:block" /> Shared with Love
          </h1>
          <p className="text-bark-300 font-sans text-lg leading-relaxed">
            From a folding table at the farmer&apos;s market to your kitchen — the story of 5JKitchens.
          </p>
        </div>
      </div>

      {/* How It Began — image + text side by side */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="rounded-sm overflow-hidden shadow-lg border border-cream-200">
              <Image
                src="/5JK.png"
                alt="The 5JKitchens team crafting compound butters in the kitchen"
                width={700}
                height={700}
                className="w-full h-auto"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5" aria-hidden="true">
                <div className="h-px w-8 bg-bark-400" />
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bark-400">How It Began</span>
              </div>
              <h2 className="font-serif text-4xl font-bold text-bark-800 mb-6 leading-tight">
                A Folding Table.<br /> A Single Batch.
              </h2>
              <div className="space-y-4 font-sans text-bark-600 leading-relaxed text-base">
                <p>
                  5JKitchens began not in a commercial kitchen, but at a folding table at the Saturday farmer&apos;s market. Armed with a single batch of cultured butter made from cream sourced just forty miles away, we offered free samples and hoped for the best.
                </p>
                <p>
                  By 10am, every log was sold. By the following Saturday, we had a line. That was the beginning — and the only sign we needed that people were hungry for food made the right way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pullquote */}
      <section className="bg-bark-700 py-16 lg:py-20 px-4">
        <div className="container-max max-w-3xl text-center">
          <svg className="w-10 h-10 text-bark-500 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-serif text-2xl lg:text-3xl italic text-cream-200 leading-relaxed mb-6">
            The best food is simple, made with care, and worth sharing. That&apos;s the only philosophy we&apos;ve ever needed.
          </blockquote>
          <p className="font-sans text-bark-400 text-sm uppercase tracking-widest">— The 5JKitchens Team</p>
        </div>
      </section>

      {/* How We Make It — numbered steps */}
      <section className="section-padding bg-cream-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
              <div className="h-px w-10 bg-bark-300" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bark-400">Process</span>
              <div className="h-px w-10 bg-bark-300" />
            </div>
            <h2 className="font-serif text-4xl font-bold text-bark-800">How We Make It</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map(({ step, title, desc }) => (
              <div key={step} className="bg-white border border-cream-200 shadow-sm p-8 rounded-sm relative">
                <span className="font-serif text-6xl font-bold text-cream-300 absolute top-4 right-6 leading-none select-none" aria-hidden="true">
                  {step}
                </span>
                <h3 className="font-serif text-2xl font-bold text-bark-800 mb-4 relative">{title}</h3>
                <p className="font-sans text-bark-500 leading-relaxed text-sm relative">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true">
              <div className="h-px w-10 bg-bark-300" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bark-400">What We Stand For</span>
              <div className="h-px w-10 bg-bark-300" />
            </div>
            <h2 className="font-serif text-4xl font-bold text-bark-800">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {values.map(({ title, icon, desc }) => (
              <div key={title} className="flex gap-4 p-6 bg-cream-50 border border-cream-200 rounded-sm">
                <div className="w-10 h-10 bg-bark-100 rounded-full flex items-center justify-center flex-shrink-0 text-bark-600 mt-0.5">
                  {icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-bark-800 mb-1">{title}</h3>
                  <p className="text-bark-500 font-sans text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bark-800 py-20 px-4 text-center">
        <div className="container-max max-w-xl">
          <div className="flex items-center justify-center gap-4 mb-5" aria-hidden="true">
            <div className="h-px w-10 bg-bark-600" />
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-bark-500" fill="currentColor" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <div className="h-px w-10 bg-bark-600" />
          </div>
          <h2 className="font-serif text-4xl font-bold text-cream-100 mb-4">Taste the Difference</h2>
          <p className="text-bark-300 font-sans mb-8 leading-relaxed">
            Every product we make is an invitation to slow down and enjoy something made right. Come find your new favorite.
          </p>
          <Link href="/shop" className="btn-primary bg-cream-200 text-bark-800 hover:bg-cream-100 border-cream-200 hover:border-cream-100">
            Shop Our Products
          </Link>
        </div>
      </section>
    </>
  );
}
