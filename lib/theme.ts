export type Theme = "dark" | "light" | "system";

export const THEME_STORAGE_KEY = "personal-finance-theme";

export const getSystemTheme = (): "dark" | "light" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark" || stored === "light" || stored === "system")
    return stored;
  return "system";
};

export const applyTheme = (theme: Theme) => {
  const resolved =
    theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.remove("dark", "light");
  document.documentElement.classList.add(resolved);
};
