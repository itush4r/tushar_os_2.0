import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function SectionLabel({ className, children }: Props) {
  return (
    <p
      className={cn(
        "text-[12px] font-medium uppercase tracking-[0.18em] text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}
