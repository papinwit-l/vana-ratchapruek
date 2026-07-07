"use client";

import { useTheme, Theme } from "@/components/theme-provider";
import { THEMES } from "@/config/theme";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value as Theme)}
      className="p-2 border border-white text-white rounded bg-transparent"
    >
      {THEMES.map((t) => (
        <option key={t} value={t} className="text-black">
          {t.replace("-", " ")}
        </option>
      ))}
    </select>
  );
}
