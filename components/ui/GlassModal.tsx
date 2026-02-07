"use client";

import { useEffect, useCallback } from "react";

type GlassModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export const GlassModal = ({
  open,
  onClose,
  children,
  title,
}: GlassModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "glass-modal-title" : undefined}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <h2
            id="glass-modal-title"
            className="sr-only"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            {title}
          </h2>
        )}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          aria-label="Close modal"
        >
          <span className="text-lg leading-none" aria-hidden>
            ×
          </span>
        </button>
        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
};
