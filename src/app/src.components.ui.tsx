```tsx
// src/components/ui.tsx
import { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { IconArrowRight } from "./icons";

export function GlassCard({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-white/[0.04] shadow-glass backdrop-blur-md",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className = "",
}: PropsWithChildren<{ onClick?: () => void; className?: string }>) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-400",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  className = "",
}: PropsWithChildren<{ onClick?: () => void; className?: string }>) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/90 transition hover:bg-white/[0.06]",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function Pill({
  icon,
  children,
  className = "",
}: PropsWithChildren<{ icon: ReactNode; className?: string }>) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/80 backdrop-blur-md",
        className,
      ].join(" ")}
    >
      <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-sky-200">
        {icon}
      </div>
      <div className="leading-snug">{children}</div>
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={["text-center", className].join(" ")}>
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function CTAButtonRight({
  label,
  onClick,
}: {
  label: string;
  onClick?: () => void;
}) {
  return (
    <PrimaryButton onClick={onClick} className="px-4">
      <span>{label}</span>
      <IconArrowRight className="h-4 w-4" />
    </PrimaryButton>
  );
}

export function Accordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <GlassCard className="p-4 md:p-6">
      <div className="space-y-4">
        {items.map((it, idx) => {
          const open = idx === openIndex;
          return (
            <div
              key={it.q}
              className="rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <button
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
                onClick={() => setOpenIndex(open ? -1 : idx)}
              >
                <span className="text-sm font-semibold text-sky-400">
                  {it.q}
                </span>
                <span className="text-white/30">{open ? "×" : "+"}</span>
              </button>
              {open ? (
                <div className="px-4 pb-4 text-sm leading-relaxed text-white/70">
                  {it.a}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

export function SoftDivider() {
  return <div className="my-16 h-px w-full bg-white/10" />;
}

export function FeatureRow({
  title,
  body,
  cta,
  imageAlt,
  imageSrc,
  reverse,
}: {
  title: string;
  body: string;
  cta: { label: string; onClick?: () => void };
  imageAlt: string;
  imageSrc?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={[
        "grid items-center gap-8 md:grid-cols-2 md:gap-12",
        reverse ? "md:[&>*:first-child]:order-2" : "",
      ].join(" ")}
    >
      <div>
        <h3 className="text-3xl font-semibold leading-tight md:text-4xl">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
          {body}
        </p>
        <div className="mt-6">
          <PrimaryButton onClick={cta.onClick}>{cta.label}</PrimaryButton>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-glass backdrop-blur-md">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/[0.03]">
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={imageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.35),rgba(3,7,18,0)_70%)]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```