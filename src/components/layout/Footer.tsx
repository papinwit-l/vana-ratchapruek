// components/layout/Footer.tsx
import Link from "next/link";
import { FacebookIcon, InstagramIcon, LineIcon } from "../ui/SocialMediaIcon";

const NAV_LINKS = [
  { label: "HOME", href: "#hero" },
  { label: "CONCEPT", href: "#concept" },
  { label: "PROJECT INFO", href: "#project-info" },
  { label: "HOUSE TYPES", href: "#house-types" },
  { label: "GALLERY", href: "#gallery" },
  { label: "LOCATION", href: "#location" },
  { label: "CONTACT", href: "#lead-form" },
];

const CONTACT_LINKS = [
  { label: "02-026-3512", href: "tel:02-026-3512" },
  { label: "Feedback & Complaints", href: "mailto:cs@assetfive.co.th" },
  { label: "Property Offer", href: "mailto:land@assetfive.co.th" },
  { label: "Information Request", href: "mailto:info@assetfive.co.th" },
  { label: "Careers", href: "mailto:hr@assetfive.co.th" },
];

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/assetfive/",
    Icon: FacebookIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/asset_five/",
    Icon: InstagramIcon,
  },
  { label: "LINE", href: "https://lin.ee/whGimOI", Icon: LineIcon },
];

export default function Footer() {
  return (
    <footer>
      {/* Main footer */}
      <div className="bg-footer-bg pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {/* Top: Logo + Company */}
          <div className="mb-12">
            <Link
              href="#hero"
              className="inline-flex flex-col items-start gap-0 mb-4"
            >
              <span className="font-display text-2xl tracking-[4px] text-on-primary">
                VANA
              </span>
              <span className="text-[10px] tracking-[2px] uppercase text-accent">
                Ratchapruek — Westville
              </span>
            </Link>
            <p className="text-xs tracking-wide text-on-primary-muted mt-2 max-w-lg">
              Asset Five Group Public Company Limited
              <br />
              199 S OASIS Building, 12th Floor, Unit 1210–1212, Vibhavadi
              Rangsit Rd., Chom Phon, Chatuchak, Bangkok 10900
            </p>
          </div>

          {/* Grid: Nav + Contact + Follow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8">
            {/* Nav */}
            <div>
              <h4 className="text-[11px] tracking-[3px] uppercase text-accent mb-5">
                Explore
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs tracking-[0.2em] text-on-primary-muted hover:text-accent transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[11px] tracking-[3px] uppercase text-accent mb-5">
                Contact Us
              </h4>
              <ul className="space-y-2.5">
                {CONTACT_LINKS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-xs tracking-[0.1em] text-on-primary-muted hover:text-accent transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow + Sales */}
            <div>
              <h4 className="text-[11px] tracking-[3px] uppercase text-accent mb-5">
                Follow Us
              </h4>
              <div className="flex items-center gap-3 mb-8">
                {SOCIALS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-9 h-9 rounded-full border border-accent-border flex items-center justify-center text-on-primary-muted hover:text-accent hover:border-accent transition-all duration-300"
                  >
                    <item.Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <h4 className="text-[11px] tracking-[3px] uppercase text-accent mb-3">
                Sales Office
              </h4>
              <p className="text-xs text-on-primary-muted leading-6">
                Open daily 09:00 – 18:00
                <br />
                Tel:{" "}
                <a
                  href="tel:1775"
                  className="hover:text-accent transition-colors duration-300"
                >
                  1775
                </a>
                <br />
                LINE: @assetfive
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary py-4">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[11px] text-on-primary-muted">
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">·</span>
            <span>© 2026 Asset Five Group Public Company Limited.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
