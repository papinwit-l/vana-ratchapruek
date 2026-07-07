export const THEMES = [
  "forest-gold",
  "earth-sage",
  "charcoal-bronze",
  "garden-sand",
  "light-botanical",
  "teak-evergreen",
  "full-green",
  "meadow-champagne",
  "forest-terracotta",
  "misty-khaki",
] as const;

export type Theme = (typeof THEMES)[number];
