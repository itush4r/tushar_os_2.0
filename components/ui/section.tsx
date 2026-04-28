import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, className, children }: Props) {
  return (
    <section id={id} className={cn("py-20 sm:py-24", className)}>
      {children}
    </section>
  );
}
