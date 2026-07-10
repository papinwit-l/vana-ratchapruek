// components/ui/ThemeSwitcher.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { THEMES, type Theme } from "@/config/theme";
import { Settings } from "lucide-react";

const THEME_META: Record<Theme, { label: string; colors: string[] }> = {
  "forest-gold": {
    label: "Deep Forest & Gold",
    colors: ["#1B3A2D", "#2A5A42", "#C4A265", "#F5F0E8"],
  },
  "earth-sage": {
    label: "Warm Earth & Sage",
    colors: ["#5C6B52", "#8A9A7E", "#B8956A", "#F2EDE4"],
  },
  "charcoal-bronze": {
    label: "Charcoal & Bronze",
    colors: ["#1E1E1C", "#2F2F2C", "#C9A96E", "#F4F1EB"],
  },
  "garden-sand": {
    label: "Garden Teal & Sand",
    colors: ["#2C4A3E", "#3E6354", "#E8C9A0", "#FAFAF6"],
  },
  "light-botanical": {
    label: "Light & Botanical",
    colors: ["#3A5A40", "#4E7350", "#D4B896", "#F7F4EE"],
  },
  "teak-evergreen": {
    label: "Teak & Evergreen",
    colors: ["#354B45", "#4A6960", "#D4A574", "#F0E6D8"],
  },
  "full-green": {
    label: "Full Green Spectrum",
    colors: ["#1A2F28", "#2D4A3E", "#88B09A", "#F5F7F2"],
  },
  "meadow-champagne": {
    label: "Meadow & Champagne",
    colors: ["#2E3C35", "#4A5E52", "#D9C5A0", "#FBF8F3"],
  },
  "forest-terracotta": {
    label: "Forest & Terracotta",
    colors: ["#3B4A3F", "#536656", "#C07A50", "#FCF9F5"],
  },
  "misty-khaki": {
    label: "Misty Forest & Khaki",
    colors: ["#1F3329", "#3A5445", "#B8A88A", "#F3EFE7"],
  },
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Only show in development
  if (process.env.NEXT_PUBLIC_SHOW_THEME_SWITCHER !== "true") return null;

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div ref={panelRef} className="relative">
      {/* Gear button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
          open
            ? "bg-accent text-primary"
            : "text-on-primary/50 hover:text-on-primary"
        }`}
        aria-label="Theme settings"
      >
        <Settings
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {/* Popover panel */}
      {open && (
        <div className="absolute right-0 top-full mt-3 w-64 bg-primary border border-accent-border rounded-sm shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-accent-border">
            <p className="text-[10px] tracking-[2px] uppercase text-accent">
              Color Palette
            </p>
          </div>

          {/* Palette list */}
          <div className="max-h-80 overflow-y-auto">
            {THEMES.map((t) => {
              const meta = THEME_META[t];
              const isActive = theme === t;

              return (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors duration-200 cursor-pointer ${
                    isActive ? "bg-accent/10" : "hover:bg-on-primary/5"
                  }`}
                >
                  {/* Color swatches */}
                  <div className="flex shrink-0 rounded-sm overflow-hidden">
                    {meta.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-6"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Label */}
                  <span
                    className={`text-[11px] tracking-wide text-left ${
                      isActive ? "text-accent" : "text-on-primary-muted"
                    }`}
                  >
                    {meta.label}
                  </span>

                  {/* Active dot */}
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-accent ml-auto shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
