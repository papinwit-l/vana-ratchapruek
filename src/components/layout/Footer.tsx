// components/layout/Footer.tsx
import Link from "next/link";
import type { ContactData, SocialLink } from "@/lib/wordpress";

const NAV_LINKS = [
  { label: "HOME", href: "#hero" },
  { label: "CONCEPT", href: "#concept" },
  { label: "PROJECT INFO", href: "#project-info" },
  { label: "HOUSE TYPES", href: "#house-types" },
  { label: "GALLERY", href: "#gallery" },
  { label: "LOCATION", href: "#location" },
  { label: "CONTACT", href: "#lead-form" },
];

export default function Footer({ contact }: { contact: ContactData }) {
  return (
    <footer>
      {/* Main footer */}
      <div
        className="pt-16 pb-12 lg:pt-20 lg:pb-16"
        style={{ background: "var(--color-footer-bg)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8">
            {/* Left: Brand + Nav + Contact */}
            <div className="flex-1">
              {/* Logo */}
              <Link
                href="#hero"
                className="inline-flex flex-col items-start gap-0 mb-10"
              >
                <span
                  className="font-[family-name:var(--font-display)] text-2xl tracking-[4px]"
                  style={{ color: "var(--color-text-on-primary)" }}
                >
                  VANA
                </span>
                <span
                  className="text-[10px] tracking-[2px] uppercase"
                  style={{ color: "var(--color-accent)" }}
                >
                  Ratchapruek — Westville
                </span>
              </Link>

              {/* Nav */}
              <nav className="mb-12">
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
                  {NAV_LINKS.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="text-xs tracking-[0.2em] transition-colors duration-300"
                        style={{ color: "var(--color-text-on-primary-muted)" }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Address + Phone */}
              <div>
                {contact?.address?.length > 0 && (
                  <p
                    className="text-sm tracking-[0.1em] mb-2"
                    style={{ color: "var(--color-text-on-primary-muted)" }}
                  >
                    {contact.address.join(" ")}
                  </p>
                )}
                {contact?.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-lg lg:text-xl font-bold tracking-[0.1em] transition-colors duration-300"
                    style={{ color: "var(--color-text-on-primary)" }}
                  >
                    CALL {contact.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Right: Sales info */}
            <div className="lg:text-right">
              <h4
                className="text-[11px] tracking-[3px] uppercase mb-5"
                style={{ color: "var(--color-accent)" }}
              >
                Sales Office
              </h4>
              <p
                className="text-sm leading-8"
                style={{ color: "var(--color-text-on-primary-muted)" }}
              >
                Open daily 09:00 – 18:00
                <br />
                Tel: 1775
                <br />
                LINE: @assetfive
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4" style={{ background: "var(--color-primary)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p
            className="text-xs"
            style={{ color: "var(--color-text-on-primary-muted)" }}
          >
            <Link
              href="/privacy"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              Privacy Policy
            </Link>
            <span className="mx-2">·</span>
            <span>© 2026 Asset Five Public Company Limited.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
