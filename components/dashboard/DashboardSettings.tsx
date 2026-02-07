"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import type { Theme } from "@/lib/theme";

const SETTINGS_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  {
    value: "dark",
    label: "Dark mode",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  },
  {
    value: "light",
    label: "Light mode",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    ),
  },
  {
    value: "system",
    label: "Same as system (default)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
];

export const DashboardSettings = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSelectTheme = (value: Theme) => {
    setTheme(value);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {open && (
        <div
          ref={panelRef}
          className="w-56 rounded-2xl border border-white/[0.08] bg-white/[0.04] py-2 shadow-2xl shadow-black/20 backdrop-blur-2xl"
          role="menu"
          aria-label="Settings"
        >
          <p className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            Settings · Page style
          </p>
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === opt.value}
              onClick={() => handleSelectTheme(opt.value)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-200 transition-colors hover:bg-white/[0.06]"
            >
              <span className="text-slate-400">{opt.icon}</span>
              <span>{opt.label}</span>
              {theme === opt.value && (
                <span className="ml-auto text-violet-400" aria-hidden>
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      )}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        data-settings-fab
        className="flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-xl transition-[filter,box-shadow] focus:outline-none"
        style={{
          backgroundColor: "var(--settings-btn-bg)",
          borderColor: "var(--settings-btn-border)",
          color: "var(--settings-btn-icon)",
          boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
        }}
        aria-label="Open settings (page style: dark, light, or system)"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {SETTINGS_ICON}
      </button>
    </div>
  );
};
