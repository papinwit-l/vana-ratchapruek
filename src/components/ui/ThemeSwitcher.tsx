"use client";

import { useTheme } from "@/components/theme-provider";
import { THEMES, type Theme } from "@/config/theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  // Only show in development or with ?theme query param
  if (process.env.NODE_ENV === "production") return null;

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className="text-[10px] tracking-wider bg-primary border border-accent-border text-on-primary rounded px-2 py-1 outline-none cursor-pointer"
    >
      {THEMES.map((t) => (
        <option key={t} value={t} className="bg-primary text-on-primary">
          {t.replace(/-/g, " ")}
        </option>
      ))}
    </select>
  );
}
