import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdSlot } from "@/components/AdSlot";
import { getRates } from "@/lib/rates.functions";
import { CURRENCIES } from "@/lib/currencies";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/rates")({
  head: () => ({
    meta: [
      { title: "Live Exchange Rates — All Currencies | RateFlow" },
      {
        name: "description",
        content:
          "Browse live mid-market exchange rates for 150+ currencies, updated every minute.",
      },
      { property: "og:title", content: "Live Exchange Rates" },
      { property: "og:description", content: "Mid-market rates for major currencies." },
    ],
  }),
  component: RatesPage,
});

function RatesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["rates", "USD"],
    queryFn: () => getRates({ data: { base: "USD" } }),
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Live exchange rates
        </h1>
        <p className="mt-2 text-muted-foreground">Base currency: USD · Updated live</p>

        <div className="my-6">
          <AdSlot label="Sponsored" />
        </div>

        <div
          className="overflow-hidden rounded-2xl border border-border bg-card"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Currency</th>
                <th className="px-4 py-3 text-right">1 USD =</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 10 }).map((_, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-3"><Skeleton className="h-4 w-32" /></td>
                      <td className="px-4 py-3"><Skeleton className="ml-auto h-4 w-20" /></td>
                    </tr>
                  ))
                : CURRENCIES.filter((c) => c.code !== "USD").map((c) => {
                    const r = data?.rates?.[c.code];
                    return (
                      <tr key={c.code} className="border-t border-border transition-colors hover:bg-muted/30">
                        <td className="px-4 py-3">
                          <span className="mr-2 text-lg">{c.flag}</span>
                          <span className="font-semibold text-foreground">{c.code}</span>{" "}
                          <span className="text-muted-foreground">· {c.name}</span>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-foreground">
                          {r ? r.toLocaleString(undefined, { maximumFractionDigits: 4 }) : "—"}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}