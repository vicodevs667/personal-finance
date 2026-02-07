import Link from "next/link";
import { AmbientBackground } from "@/components/ui/AmbientBackground";
import { BrandHeader } from "@/components/ui/BrandHeader";
import { GlassCard } from "@/components/ui/GlassCard";

const FEATURE_CARDS = [
  {
    title: "Transactions",
    description:
      "Log income and expenses by category. Everything in one timeline.",
  },
  {
    title: "Spending by category",
    description:
      "See where your money goes with a clear breakdown and charts.",
  },
  {
    title: "Insights",
    description:
      "Simple tips to improve habits and compare to last month.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-16 sm:mb-24">
          <BrandHeader />
        </header>

        <main className="text-center">
          <h1
            className="mx-auto max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Track spending. See insights. Stay in control.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-slate-400 sm:text-xl">
            One place to log income and expenses, view spending by category, and
            get simple advice to keep your finances on track.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/dashboard"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500/90 to-cyan-500 px-6 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#030712]"
            >
              Open dashboard
            </Link>
          </div>
        </main>

        <section className="mt-24 grid gap-6 sm:grid-cols-3" aria-label="Features">
          {FEATURE_CARDS.map((card) => (
            <GlassCard key={card.title} className="p-6">
              <span className="text-2xl" aria-hidden>
                ◇
              </span>
              <h2
                className="mt-4 text-lg font-semibold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                {card.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400">{card.description}</p>
            </GlassCard>
          ))}
        </section>

        <div className="mt-20 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Go to dashboard
            <span className="text-slate-500" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
