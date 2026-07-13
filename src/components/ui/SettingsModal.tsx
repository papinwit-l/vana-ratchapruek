// components/ui/SettingsModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme-provider";
import { useFontPair } from "@/components/font-provider";
import { THEMES, type Theme } from "@/config/theme";
import { FONT_PAIRS, type FontPairId } from "@/config/fonts";
import { Settings, X } from "lucide-react";

import { createPortal } from "react-dom";

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

export function SettingsModal() {
  const { theme, setTheme } = useTheme();
  const { fontPair, setFontPair } = useFontPair();
  const [open, setOpen] = useState(false);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <>
      {/* Trigger button — stays in header */}
      <button
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-full flex items-center justify-center text-on-primary/50 hover:text-on-primary transition-all duration-300 cursor-pointer"
        aria-label="Design settings"
      >
        <Settings className="w-4 h-4" strokeWidth={1.5} />
      </button>

      {/* Modal — portalled to body, escapes header transforms */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpen(false)}
          >
            <div
              className="absolute top-1/16 bg-primary border border-accent-border w-[calc(100%-2rem)] max-w-lg max-h-[85vh] overflow-y-auto rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-accent-border sticky top-0 bg-primary z-10">
                <p className="text-sm tracking-[2px] uppercase text-accent">
                  Design Settings
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-primary-muted hover:text-on-primary transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Color Palette */}
              <div className="px-6 pt-5 pb-2">
                <p className="text-[10px] tracking-[3px] uppercase text-on-primary-muted mb-4">
                  Color Palette
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {THEMES.map((t) => {
                    const meta = THEME_META[t];
                    const isActive = theme === t;

                    return (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors duration-200 cursor-pointer ${
                          isActive
                            ? "bg-accent/15 border border-accent/30"
                            : "border border-transparent hover:bg-on-primary/5"
                        }`}
                      >
                        {/* Swatches */}
                        <div className="flex shrink-0 rounded-sm overflow-hidden">
                          {meta.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-4 h-5"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        {/* Label */}
                        <span
                          className={`text-[11px] tracking-wide text-left leading-tight ${
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

              {/* Divider */}
              <div className="mx-6 my-4 border-t border-accent-border" />

              {/* Font Pairing */}
              <div className="px-6 pb-6">
                <p className="text-[10px] tracking-[3px] uppercase text-on-primary-muted mb-4">
                  Font Pairing
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {FONT_PAIRS.map((pair) => {
                    const isActive = fontPair === pair.id;

                    return (
                      <button
                        key={pair.id}
                        onClick={() => setFontPair(pair.id)}
                        className={`flex items-center justify-between px-3 py-3 rounded-sm transition-colors duration-200 cursor-pointer ${
                          isActive
                            ? "bg-accent/15 border border-accent/30"
                            : "border border-transparent hover:bg-on-primary/5"
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[11px] tracking-wide ${
                                isActive
                                  ? "text-accent"
                                  : "text-on-primary-muted"
                              }`}
                            >
                              {pair.label}
                            </span>
                            <span className="text-[9px] tracking-wider text-on-primary-muted/40 uppercase">
                              {pair.tag}
                            </span>
                          </div>
                          {/* Preview */}
                          <span
                            className="text-xl text-on-primary block leading-snug"
                            style={{
                              fontFamily: pair.display,
                              fontWeight: 300,
                            }}
                          >
                            {pair.preview}
                          </span>
                        </div>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 ml-3" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>,
          document.getElementById("modal-root")!,
        )}
    </>
  );
}
