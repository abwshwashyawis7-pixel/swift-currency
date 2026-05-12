import { cn } from "@/lib/utils";

interface Props {
  label?: string;
  className?: string;
  height?: string;
}

export function AdSlot({ label = "Advertisement", className, height = "h-24" }: Props) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center rounded-2xl border border-dashed border-border bg-muted/40 text-xs uppercase tracking-widest text-muted-foreground",
        height,
        className,
      )}
      data-ad-slot
    >
      {label}
    </div>
  );
}