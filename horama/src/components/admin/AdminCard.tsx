import type { ReactNode } from "react";

export function AdminCard({
  title,
  description,
  action,
  children,
  className,
  headerClassName,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}) {
  const hasHeader = Boolean(title || description || action);

  return (
    <div
      className={[
        "rounded-2xl border border-gray-200 bg-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasHeader && (
        <div
          className={[
            "flex items-start justify-between gap-4 px-6 py-5",
            headerClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-base font-medium text-gray-800">
                {title}
              </h3>
            )}
            {description && (
              <p className="mt-1 text-theme-sm text-gray-500">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div
        className={[
          hasHeader ? "border-t border-gray-100" : "",
          "p-4 sm:p-6",
          bodyClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </div>
    </div>
  );
}

