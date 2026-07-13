export const FONT_PAIRS = [
  {
    id: "noto-serif-sarabun",
    label: "Noto Serif Thai + Sarabun",
    tag: "recommended",
    display: "'Noto Serif Thai', serif",
    body: "'Sarabun', sans-serif",
    preview: "วนา VANA",
  },
  {
    id: "cormorant-prompt",
    label: "Cormorant + Prompt",
    tag: "elegant",
    display: "'Cormorant Garamond', serif",
    body: "'Prompt', sans-serif",
    preview: "วนา VANA",
  },
  {
    id: "playfair-jamjuree",
    label: "Playfair + Bai Jamjuree",
    tag: "modern luxury",
    display: "'Playfair Display', serif",
    body: "'Bai Jamjuree', sans-serif",
    preview: "วนา VANA",
  },
  {
    id: "kanit-noto-sans",
    label: "Kanit + Noto Sans Thai",
    tag: "all-Thai",
    display: "'Kanit', sans-serif",
    body: "'Noto Sans Thai', sans-serif",
    preview: "วนา VANA",
  },
  {
    id: "noto-serif-ibm-plex",
    label: "Noto Serif + IBM Plex",
    tag: "corporate",
    display: "'Noto Serif Thai', serif",
    body: "'IBM Plex Sans Thai', sans-serif",
    preview: "วนา VANA",
  },
] as const;

export type FontPairId = (typeof FONT_PAIRS)[number]["id"];
