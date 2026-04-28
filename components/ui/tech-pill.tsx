import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function TechPill({ className, children }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
