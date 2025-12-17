function normalizeStatus(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

export function LeadStatusBadge({
  status,
  className,
}: {
  status: string | null | undefined;
  className?: string;
}) {
  const normalized = normalizeStatus(status);

  const config: Record<string, { label: string; className: string }> = {
    new: { label: "Nouveau", className: "bg-brand-50 text-brand-500" },
    contacted: {
      label: "Contacté",
      className: "bg-warning-50 text-warning-600",
    },
    qualified: {
      label: "Qualifié",
      className: "bg-success-50 text-success-600",
    },
    lost: { label: "Perdu", className: "bg-error-50 text-error-600" },
  };

  const { label, className: toneClassName } = config[normalized] ?? {
    label: status?.trim() || "—",
    className: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-theme-xs font-medium",
        toneClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </span>
  );
}

