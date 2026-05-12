import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Zap, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Converter } from "@/components/Converter";
import { AdSlot } from "@/components/AdSlot";
import { POPULAR_PAIRS, getCurrency } from "@/lib/currencies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RateFlow — Live Currency Converter & Exchange Rates" },
      {
        name: "description",
        content:
          "Convert any currency in real-time with live mid-market exchange rates. Fast, free, and mobile-friendly.",
      },
      { property: "og:title", content: "RateFlow — Live Currency Converter" },
      {
        property: "og:description",
        content: "Real-time exchange rates for 150+ currencies.",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "RateFlow",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-20">
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                Live mid-market rates
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Convert currencies at the{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "var(--gradient-hero)" }}
                >
                  real exchange rate
                </span>
              </h1>
              <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
                Fast, accurate currency conversion for 150+ currencies. Updated every minute,
                trusted by travelers and traders worldwide.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-accent" /> Real-time</span>
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-secondary" /> No signup</span>
              </div>
            </div>
            <div>
              <Converter />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AdSlot label="Sponsored" />
        </div>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Popular conversions</h2>
            <Link to="/rates" className="text-sm font-medium text-primary hover:underline">
              See all rates →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_PAIRS.map(([f, t]) => {
              const fc = getCurrency(f);
              const tc = getCurrency(t);
              return (
                <Link
                  key={`${f}-${t}`}
                  to="/convert/$pair"
                  params={{ pair: `${f.toLowerCase()}-to-${t.toLowerCase()}` }}
                  className="group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <div className="flex items-center gap-2 text-2xl">
                    <span>{fc?.flag}</span>
                    <span className="text-muted-foreground">→</span>
                    <span>{tc?.flag}</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-foreground">
                    {f} to {t}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {fc?.name} → {tc?.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <AdSlot label="Sponsored" height="h-32" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
