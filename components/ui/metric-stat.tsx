import { CountUp } from "./count-up";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  label: string;
  className?: string;
  countTo?: number;
  countSuffix?: string;
};

export function MetricStat({
  value,
  label,
  className,
  countTo,
  countSuffix,
}: Props) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {countTo !== undefined ? (
          <CountUp to={countTo} suffix={countSuffix ?? ""} />
        ) : (
          value
        )}
      </span>
      <span className="text-xs uppercase tracking-wider text-muted">
        {label}
      </span>
    </div>
  );
}
