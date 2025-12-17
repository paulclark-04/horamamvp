import type { ReactNode } from "react";

export function AdminKpiCard({
  label,
  value,
  icon,
  badge,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
        <div className="text-gray-800">{icon}</div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="text-theme-sm text-gray-500">{label}</span>
          <h4 className="mt-2 truncate text-title-sm font-bold text-gray-800">
            {value}
          </h4>
        </div>

        {badge ? <div className="shrink-0">{badge}</div> : null}
      </div>
    </div>
  );
}

