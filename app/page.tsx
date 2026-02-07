import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background — same as dashboard */}
      <div className="fixed inset-0 -z-10" aria-hidden>
        <div className="absolute top-[-40%] left-[-20%] w-[80%] aspect-square rounded-full bg-violet-500/20 blur-[128px] pointer-events-none" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] aspect-square rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-30%] left-[30%] w-[50%] aspect-square rounded-full bg-fuchsia-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[#030712]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16 flex items-center justify-between sm:mb-24">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 backdrop-blur-xl">
              <span
                className="text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                P
              </span>
            </div>
            <span
              className="text-xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Personal Finance
            </span>
          </div>
        </header>

        {/* Hero */}
        <main className="text-center">
          <h1
            className="mx-auto max-w-2xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            Track spending. See insights. Stay in control.
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-lg text-slate-400 sm:text-xl">
            One place to log income and expenses, view spending by category, and get simple advice to keep your finances on track.
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

        {/* Feature cards — glass style */}
        <section className="mt-24 grid gap-6 sm:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]">
            <span className="text-2xl" aria-hidden>◇</span>
            <h2 className="mt-4 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Transactions
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Log income and expenses by category. Everything in one timeline.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]">
            <span className="text-2xl" aria-hidden>◇</span>
            <h2 className="mt-4 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Spending by category
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              See where your money goes with a clear breakdown and charts.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-2xl transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]">
            <span className="text-2xl" aria-hidden>◇</span>
            <h2 className="mt-4 text-lg font-semibold text-white" style={{ fontFamily: "var(--font-syne)" }}>
              Insights
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Simple tips to improve habits and compare to last month.
            </p>
          </div>
        </section>

        {/* Secondary CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Go to dashboard
            <span className="text-slate-500" aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
