import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-sm font-bold text-foreground">RateFlow</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Live currency conversion with mid-market rates.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Converter</Link></li>
            <li><Link to="/rates" className="hover:text-foreground">Live rates</Link></li>
            <li><Link to="/tools" className="hover:text-foreground">Tools</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Popular</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/convert/$pair" params={{ pair: "usd-to-eur" }} className="hover:text-foreground">USD → EUR</Link></li>
            <li><Link to="/convert/$pair" params={{ pair: "usd-to-gbp" }} className="hover:text-foreground">USD → GBP</Link></li>
            <li><Link to="/convert/$pair" params={{ pair: "eur-to-gbp" }} className="hover:text-foreground">EUR → GBP</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Legal</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 sm:px-6">
        <p className="mx-auto max-w-6xl text-center text-xs text-muted-foreground">
          Disclaimer: Rates shown are mid-market and for informational purposes only. Not financial advice.
        </p>
      </div>
    </footer>
  );
}