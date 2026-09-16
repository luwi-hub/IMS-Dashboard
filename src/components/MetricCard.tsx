import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function MetricCard({ title, value, trend, trendUp, className }: MetricCardProps) {
  return (
    <div className={cn("bg-white p-6 rounded-xl border border-slate-200 shadow-sm", className)}>
      <h3 className="text-slate-500 font-medium text-sm mb-2">{title}</h3>
      <div className="flex items-end gap-3">
        <div className="text-3xl font-bold text-slate-800">{value}</div>
        {trend && (
          <div
            className={cn(
              "text-sm font-medium mb-1 px-2 py-0.5 rounded-full",
              trendUp ? "text-emerald-700 bg-emerald-100" : "text-rose-700 bg-rose-100"
            )}
          >
            {trendUp ? "+" : "-"}{trend}
          </div>
        )}
      </div>
    </div>
  );
}
