import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export function Container({ className, children }: Props) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-6", className)}>
      {children}
    </div>
  );
}
