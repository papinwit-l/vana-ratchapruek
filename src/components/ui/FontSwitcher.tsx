"use client";

import { useState, useRef, useEffect } from "react";
import { useFontPair } from "@/components/font-provider";
import { FONT_PAIRS, type FontPairId } from "@/config/fonts";
import { Type } from "lucide-react";

export function FontSwitcher() {
  const { fontPair, setFontPair } = useFontPair();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  if (
    process.env.NEXT_PUBLIC_SHOW_THEME_SWITCHER !== "true" &&
    process.env.NODE_ENV === "production"
  )
    return null;

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
      {/* Type button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
          open
            ? "bg-accent text-primary"
            : "text-on-primary/50 hover:text-on-primary"
        }`}
        aria-label="Font settings"
      >
        <Type
          className={`w-4 h-4 transition-transform duration-300 ${open ? "scale-110" : ""}`}
          strokeWidth={1.5}
        />
      </button>

      {/* Popover panel */}
      {open && (
        <div className="absolute right-0 top-full mt-3 w-72 bg-primary border border-accent-border rounded-sm shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-accent-border">
            <p className="text-[10px] tracking-[2px] uppercase text-accent">
              Font Pairing
            </p>
          </div>

          {/* Font list */}
          <div className="max-h-96 overflow-y-auto">
            {FONT_PAIRS.map((pair) => {
              const isActive = fontPair === pair.id;

              return (
                <button
                  key={pair.id}
                  onClick={() => {
                    setFontPair(pair.id);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 transition-colors duration-200 cursor-pointer ${
                    isActive ? "bg-accent/10" : "hover:bg-on-primary/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[11px] tracking-wide ${
                        isActive ? "text-accent" : "text-on-primary-muted"
                      }`}
                    >
                      {pair.label}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] tracking-wider text-on-primary-muted/50 uppercase">
                        {pair.tag}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      )}
                    </div>
                  </div>
                  {/* Font preview */}
                  <span
                    className="text-xl text-on-primary block leading-snug"
                    style={{ fontFamily: pair.display, fontWeight: 300 }}
                  >
                    {pair.preview}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
