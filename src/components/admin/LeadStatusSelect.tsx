"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

// ============================================================================
// TYPES
// ============================================================================

type StatusOption = {
  value: string;
  label: string;
  color: string;
  bgColor: string;
  dotColor: string;
};

// ============================================================================
// CONSTANTS
// ============================================================================

const STATUS_OPTIONS: StatusOption[] = [
  {
    value: "new",
    label: "Nouveau",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    dotColor: "bg-blue-500",
  },
  {
    value: "contacted",
    label: "Contacté",
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
    dotColor: "bg-amber-500",
  },
  {
    value: "qualified",
    label: "Qualifié",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
    dotColor: "bg-green-500",
  },
  {
    value: "lost",
    label: "Perdu",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
    dotColor: "bg-red-500",
  },
];

// ============================================================================
// ICONS
// ============================================================================

const CheckIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function LeadStatusSelect({
  leadId,
  currentStatus,
  onStatusChange,
}: {
  leadId: string;
  currentStatus: string | null;
  onStatusChange: (leadId: string, newStatus: string) => Promise<{ success: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus || "new");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const currentOption = STATUS_OPTIONS.find((o) => o.value === status) || STATUS_OPTIONS[0];

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) {
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    setMessage(null);

    startTransition(async () => {
      const result = await onStatusChange(leadId, newStatus);

      if (result.success) {
        setStatus(newStatus);
        setMessage({ type: "success", text: "Statut mis à jour" });
        setTimeout(() => setMessage(null), 2000);
        router.refresh();
      } else {
        setMessage({ type: "error", text: result.error || "Erreur lors de la mise à jour" });
        setTimeout(() => setMessage(null), 3000);
      }
    });
  };

  return (
    <div className="relative">
      {/* Current Status Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${currentOption.bgColor} ${currentOption.color} ${
          isPending ? "opacity-50 cursor-wait" : "hover:shadow-md cursor-pointer"
        }`}
      >
        {isPending ? (
          <SpinnerIcon />
        ) : (
          <span className={`h-2 w-2 rounded-full ${currentOption.dotColor}`} />
        )}
        <span>{currentOption.label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute left-0 top-full z-20 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Changer le statut
            </p>
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                className={`flex w-full items-center gap-3 px-3 py-2 text-sm transition-colors ${
                  option.value === status
                    ? `${option.bgColor} ${option.color} font-medium`
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${option.dotColor}`} />
                <span className="flex-1 text-left">{option.label}</span>
                {option.value === status && (
                  <CheckIcon />
                )}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Success/Error Message */}
      {message && (
        <div
          className={`absolute left-0 top-full mt-2 rounded-lg px-3 py-2 text-xs font-medium shadow-lg ${
            message.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
