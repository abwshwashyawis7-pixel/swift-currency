import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftRight, Loader2, RefreshCcw, TrendingUp } from "lucide-react";
import { CurrencyDropdown } from "./CurrencyDropdown";
import { getRates } from "@/lib/rates.functions";
import { getCurrency } from "@/lib/currencies";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  initialFrom?: string;
  initialTo?: string;
  initialAmount?: number;
}

export function Converter({
  initialFrom = "USD",
  initialTo = "EUR",
  initialAmount = 100,
}: Props) {
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [amount, setAmount] = useState<string>(String(initialAmount));
  const [swapping, setSwapping] = useState(false);

  const { data, isLoading, isFetching, refetch, dataUpdatedAt } = useQuery({
    queryKey: ["rates", from],
    queryFn: () => getRates({ data: { base: from } }),
    staleTime: 60_000,
    refetchInterval: 60_000,
  });

  const rate = data?.rates?.[to];
  const numAmount = Number(amount) || 0;
  const result = useMemo(() => (rate ? numAmount * rate : null), [rate, numAmount]);

  useEffect(() => {
    if (typeof window === "undefined" || result == null) return;
    try {
      const history = JSON.parse(localStorage.getItem("conv_history") || "[]");
      history.unshift({ from, to, amount: numAmount, result, ts: Date.now() });
      localStorage.setItem("conv_history", JSON.stringify(history.slice(0, 10)));
    } catch {}
  }, [result, from, to, numAmount]);

  const swap = () => {
    setSwapping(true);
    setFrom(to);
    setTo(from);
    setTimeout(() => setSwapping(false), 300);
  };

  const fromCur = getCurrency(from);
  const toCur = getCurrency(to);

  return (
    <div
      className="rounded-3xl border border-border bg-card p-6 sm:p-8"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="grid gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Amount
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-4 text-2xl font-semibold tabular-nums outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring"
            placeholder="0.00"
          />
        </div>

        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <CurrencyDropdown value={from} onChange={setFrom} label="From" />
          <button
            type="button"
            onClick={swap}
            aria-label="Swap currencies"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:border-primary hover:text-primary active:scale-95 sm:mt-5"
          >
            <ArrowLeftRight
              className={`h-5 w-5 transition-transform duration-300 ${swapping ? "rotate-180" : ""}`}
            />
          </button>
          <CurrencyDropdown value={to} onChange={setTo} label="To" />
        </div>

        <div
          className="mt-2 rounded-2xl border border-border p-5"
          style={{ background: "var(--gradient-card)" }}
        >
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-48" />
            </div>
          ) : result == null ? (
            <p className="text-sm text-destructive">
              Couldn't load live rates. Try again in a moment.
            </p>
          ) : (
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {numAmount.toLocaleString()} {fromCur?.code} =
                </p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
                  {result.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  })}{" "}
                  <span className="text-xl text-muted-foreground">{toCur?.code}</span>
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-secondary" />
                  1 {fromCur?.code} = {rate?.toLocaleString(undefined, { maximumFractionDigits: 6 })}{" "}
                  {toCur?.code}
                </p>
              </div>
              <button
                type="button"
                onClick={() => refetch()}
                disabled={isFetching}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
              >
                {isFetching ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <RefreshCcw className="h-3.5 w-3.5" />
                )}
                Refresh
              </button>
            </div>
          )}
          {dataUpdatedAt > 0 && (
            <p className="mt-3 text-[10px] uppercase tracking-wider text-muted-foreground">
              Updated {new Date(dataUpdatedAt).toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}