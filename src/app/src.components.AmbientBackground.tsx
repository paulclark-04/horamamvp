```tsx
// src/components/AmbientBackground.tsx
export default function AmbientBackground() {
  // The PDFs show a very dark base with a soft purple/blue haze near the top.
  // We reproduce that with fixed, blurred radial gradients.
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#05060A]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.55),rgba(3,7,18,0)_70%)] blur-3xl" />
      <div className="absolute -top-24 left-[15%] h-[420px] w-[620px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.38),rgba(3,7,18,0)_70%)] blur-3xl" />
      <div className="absolute -top-10 right-[10%] h-[360px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),rgba(3,7,18,0)_70%)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(255,255,255,0)_18%,rgba(255,255,255,0)_80%,rgba(255,255,255,0.02))]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),rgba(0,0,0,0)_55%)]" />
    </div>
  );
}
```