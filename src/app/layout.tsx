import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getContact } from "@/lib/wordpress";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import { Theme, THEMES } from "@/config/theme";

// ─── Fonts ───
// --font-display → used by .font-display, .section-heading in global.css
// --font-body   → used by body, .btn-cta, .input-underline in global.css
const acciaPiano = localFont({
  src: [
    { path: "../../public/fonts/AcciaPiano-Light.ttf", weight: "300" },
    { path: "../../public/fonts/AcciaPiano-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/AcciaPiano-Medium.ttf", weight: "500" },
  ],
  variable: "--font-display",
  display: "swap",
});

const instrumentSans = localFont({
  src: [
    { path: "../../public/fonts/InstrumentSans-Regular.ttf", weight: "400" },
    { path: "../../public/fonts/InstrumentSans-SemiBold.ttf", weight: "600" },
    { path: "../../public/fonts/InstrumentSans-Bold.ttf", weight: "700" },
  ],
  variable: "--font-body",
  display: "swap",
});

const myriadPro = localFont({
  src: [{ path: "../../public/fonts/MyriadPro-Regular.otf", weight: "400" }],
  variable: "--font-alt",
  display: "swap",
});

// ─── Theme ───
// Change this value to swap palettes globally
// Options: forest-gold | earth-sage | charcoal-bronze | garden-sand |
//          light-botanical | teak-evergreen | full-green |
//          meadow-champagne | forest-terracotta | misty-khaki
// const THEME = "forest-gold";
const THEME = "earth-sage";

// ─── Metadata ───
export const metadata: Metadata = {
  title: "VANA Ratchapruek - Westville | Balance of Urbanized Living",
  description:
    "VANA Ratchapruek - Westville by Asset Five. Luxury single-detached homes starting from 19.9 MB on Ratchapruek Road, Bangkok.",
  keywords: [
    "VANA",
    "Ratchapruek",
    "Westville",
    "Asset Five",
    "บ้านเดี่ยว",
    "ราชพฤกษ์",
    "luxury home",
    "Bangkok",
  ],
};

// ─── Layout ───
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactData = await getContact();

  const cookieStore = await cookies();
  const savedTheme = cookieStore.get("theme")?.value;

  // This will now work perfectly because THEMES is a real array on the server
  const activeTheme: Theme =
    savedTheme && (THEMES as readonly string[]).includes(savedTheme)
      ? (savedTheme as Theme)
      : "forest-gold";

  return (
    <html
      lang="th"
      data-theme={activeTheme}
      className={`${acciaPiano.variable} ${instrumentSans.variable} ${myriadPro.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider initialTheme={activeTheme}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer contact={contactData} />
        </ThemeProvider>
      </body>
    </html>
  );
}
