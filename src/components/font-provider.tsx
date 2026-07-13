"use client";

import { FONT_PAIRS, type FontPairId } from "@/config/fonts";
import { createContext, useContext, useState, useEffect } from "react";

const FontContext = createContext<
  { fontPair: FontPairId; setFontPair: (id: FontPairId) => void } | undefined
>(undefined);

export function FontProvider({
  children,
  initialFont,
}: {
  children: React.ReactNode;
  initialFont: FontPairId;
}) {
  const [fontPair, setFontPairState] = useState<FontPairId>(initialFont);

  const setFontPair = (newFont: FontPairId) => {
    setFontPairState(newFont);
    document.cookie = `fontPair=${newFont}; path=/; max-age=31536000; SameSite=Lax`;
    applyFontPair(newFont);
  };

  useEffect(() => {
    applyFontPair(fontPair);
  }, []);

  return (
    <FontContext.Provider value={{ fontPair, setFontPair }}>
      {children}
    </FontContext.Provider>
  );
}

function applyFontPair(id: FontPairId) {
  const pair = FONT_PAIRS.find((p) => p.id === id);
  if (!pair) return;
  document.documentElement.style.setProperty("--font-display", pair.display);
  document.documentElement.style.setProperty("--font-body", pair.body);
}

export function useFontPair() {
  const context = useContext(FontContext);
  if (!context) throw new Error("useFontPair must be used within FontProvider");
  return context;
}
