import { createFileRoute, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Converter } from "@/components/Converter";
import { AdSlot } from "@/components/AdSlot";
import { getCurrency } from "@/lib/currencies";

function parsePair(pair: string): { from: string; to: string } {
  const m = pair.toLowerCase().match(/^([a-z]{3})-to-([a-z]{3})$/);
  if (!m) throw notFound();
  const from = m[1].toUpperCase();
  const to = m[2].toUpperCase();
  if (!getCurrency(from) || !getCurrency(to)) throw notFound();
  return { from, to };
}

export const Route = createFileRoute("/convert/$pair")({
  loader: ({ params }) => parsePair(params.pair),
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Currency Converter" }] };
    const { from, to } = loaderData;
    const fc = getCurrency(from)!;
    const tc = getCurrency(to)!;
    const title = `${from} to ${to} Converter — Live ${fc.name} to ${tc.name} Rate`;
    const desc = `Convert ${fc.name} (${from}) to ${tc.name} (${to}) at live mid-market exchange rates. Free and updated every minute.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ConvertPage,
});

function ConvertPage() {
  const { from, to } = Route.useLoaderData();
  const fc = getCurrency(from)!;
  const tc = getCurrency(to)!;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {fc.flag} {from} to {tc.flag} {to}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Convert {fc.name} to {tc.name} at the live mid-market exchange rate.
        </p>

        <div className="mt-6">
          <AdSlot label="Sponsored" />
        </div>

        <div className="mt-6">
          <Converter initialFrom={from} initialTo={to} initialAmount={100} />
        </div>

        <article className="prose prose-sm mt-10 max-w-none text-muted-foreground">
          <h2 className="text-xl font-bold text-foreground">
            About {from} to {to}
          </h2>
          <p>
            This converter uses live mid-market exchange rates to show you the true value of your
            money when changing {fc.name} ({from}) into {tc.name} ({to}). Rates refresh
            automatically every minute.
          </p>
        </article>

        <div className="mt-10">
          <AdSlot label="Sponsored" height="h-32" />
        </div>
      </main>
      <Footer />
    </div>
  );
}