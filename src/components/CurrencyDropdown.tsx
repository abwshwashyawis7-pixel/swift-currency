import { useState, useMemo } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CURRENCIES, getCurrency } from "@/lib/currencies";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (code: string) => void;
  label?: string;
}

export function CurrencyDropdown({ value, onChange, label }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const current = getCurrency(value);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-3 text-left transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring",
          )}
        >
          <span className="flex items-center gap-2 truncate">
            <span className="text-2xl leading-none">{current?.flag ?? "💱"}</span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">{current?.code ?? value}</span>
              <span className="truncate text-xs text-muted-foreground">{current?.name}</span>
            </span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0">
          <div className="border-b border-border p-2">
            <div className="flex items-center gap-2 rounded-md bg-muted px-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search currency..."
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
          </div>
          <ul className="max-h-72 overflow-auto py-1">
            {filtered.map((c) => (
              <li key={c.code}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(c.code);
                    setOpen(false);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-accent/40"
                >
                  <span className="text-xl">{c.flag}</span>
                  <span className="flex-1">
                    <span className="font-semibold text-foreground">{c.code}</span>{" "}
                    <span className="text-muted-foreground">{c.name}</span>
                  </span>
                  {c.code === value && <Check className="h-4 w-4 text-primary" />}
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="px-3 py-6 text-center text-sm text-muted-foreground">
                No currencies found
              </li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}