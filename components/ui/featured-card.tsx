import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function FeaturedCard({ className, children }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-accent/30 bg-gradient-to-b from-accent/5 to-surface p-6 transition-colors",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      {children}
    </div>
  );
}
