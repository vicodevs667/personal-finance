"use client";

type BrandHeaderProps = {
  rightElement?: React.ReactNode;
};

export const BrandHeader = ({ rightElement }: BrandHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-violet-500/30 to-cyan-500/30 backdrop-blur-xl"
          aria-hidden
        >
          <span
            className="text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            P
          </span>
        </div>
        <span
          className="text-xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          Personal Finance
        </span>
      </div>
      {rightElement !== undefined ? rightElement : null}
    </header>
  );
};
