"use client";

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
};

export const GlassCard = ({ children, className = "", glow = false }: GlassCardProps) => {
  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl border border-white/[0.08]
        bg-white/[0.04] shadow-2xl shadow-black/20
        backdrop-blur-2xl transition-all duration-300
        hover:border-white/[0.12] hover:bg-white/[0.06]
        ${glow ? "shadow-[0_0_60px_-12px_var(--glow-violet)]" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
