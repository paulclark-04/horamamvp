import type { ReactNode } from "react";

export function AdminTable({
  children,
  className,
  tableClassName,
}: {
  children: ReactNode;
  className?: string;
  tableClassName?: string;
}) {
  return (
    <div
      className={[
        "overflow-hidden rounded-xl border border-gray-200 bg-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="max-w-full overflow-x-auto">
        <table
          className={["min-w-full text-left", tableClassName]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </table>
      </div>
    </div>
  );
}

