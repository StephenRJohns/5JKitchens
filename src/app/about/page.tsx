import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Learn about 5JKitchens — small-batch artisan butters, buttermilk, and ranch crafted with care.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-bark-800 text-cream-100 py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="aboutgrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#FAF5E8" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#aboutgrid)" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-3" aria-hidden="true">
            <div className="h-px w-10 bg-bark-400" />
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-bark-400">Our Story</span>
            <div className="h-px w-10 bg-bark-400" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-3">About 5JKitchens</h1>
          <p className="text-bark-300 font-sans max-w-md mx-auto">
            Where every product begins with passion and ends on your table.
          </p>
        </div>
      </div>

      {/* Story sections */}
      <article className="section-padding">
        <div className="container-max max-w-3xl mx-auto">
          <div className="prose-bark space-y-12">

            <section>
              <h2 className="font-serif text-3xl font-bold text-bark-800 mb-6">How It Began</h2>
              <div className="mb-8 rounded-sm overflow-hidden shadow-md border border-cream-200">
                <Image
                  src="/5JK.png"
                  alt="The 5JKitchens team crafting compound butters in the kitchen"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <div className="space-y-4 font-sans text-bark-600 leading-relaxed text-lg">
                <p>
                  5JKitchens began not in a commercial kitchen, but at a folding table at the Saturday farmer&apos;s market. Armed with a single batch of cultured butter made from cream sourced just forty miles away, we offered free samples and hoped for the best.
                </p>
                <p>
                  By 10am, every log was sold. By the following Saturday, we had a line. That was the beginning.
                </p>
              </div>
            </section>

            <div className="border-l-4 border-bark-400 pl-6 my-8">
              <blockquote className="font-serif text-2xl italic text-bark-700 leading-relaxed">
                &ldquo;The best food is simple, made with care, and worth sharing. That&apos;s the only philosophy we&apos;ve ever needed.&rdquo;
              </blockquote>
              <p className="font-sans text-bark-400 text-sm mt-3">— The 5JKitchens Team</p>
            </div>

            <section>
              <h2 className="font-serif text-3xl font-bold text-bark-800 mb-6">How We Make It</h2>
              <div className="space-y-4 font-sans text-bark-600 leading-relaxed text-lg">
                <p>
                  Everything we make starts with the cream — sourced from a small herd of pasture-raised cows at a family-owned dairy we&apos;ve worked with from the very beginning. No anonymous commodity cream. We know where it comes from, and it shows in every bite.
                </p>
                <p>
                  Our compound butters are made in batches of no more than twenty logs at a time. Each flavor is developed through dozens of test batches before it earns a place in our lineup. We&apos;re particular like that.
                </p>
                <p>
                  Our buttermilk is traditionally cultured for 24 hours — the old way, the right way. And our ranch dressing uses that same buttermilk as its base, with fresh herbs from our kitchen garden.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-3xl font-bold text-bark-800 mb-6">Our Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Real Ingredients",
                    desc: "No stabilizers, no gums, no artificial anything. If it doesn't belong in your grandmother's kitchen, it doesn't belong in ours.",
                  },
                  {
                    title: "Small Batches",
                    desc: "We deliberately cap production. Freshness and quality require it. We'd rather sell out than compromise.",
                  },
                  {
                    title: "Local First",
                    desc: "Our dairy comes from within 50 miles. Our herbs are grown by our neighbors. We invest in our community.",
                  },
                  {
                    title: "Honest Work",
                    desc: "No shortcuts, no gimmicks. Just people who love good food, making it the right way, every single day.",
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-cream-50 border border-cream-200 p-5 rounded-sm">
                    <h3 className="font-serif text-lg font-semibold text-bark-800 mb-2">{title}</h3>
                    <p className="text-bark-500 font-sans text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="text-center pt-4">
              <Link href="/shop" className="btn-primary">
                Shop Our Products
              </Link>
            </div>
          </div>
        </div>
      </article>

    </>
  );
}
