import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Currency News & Market Updates | RateFlow" },
      { name: "description", content: "Latest currency market news and FX insights." },
      { property: "og:title", content: "Currency News" },
      { property: "og:description", content: "FX market updates and analysis." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Currency news</h1>
        <p className="mt-3 text-muted-foreground">
          Market commentary and FX updates coming soon.
        </p>
      </main>
      <Footer />
    </div>
  ),
});