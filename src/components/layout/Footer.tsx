import Link from "next/link";
import FullLogo from "../ui/FullLogo";
import {
  FacebookIconAlt,
  InstagramIcon,
  LineIconAlt,
  MailIcon,
  WhatsAppIcon,
} from "../ui/SocialMediaIcon";
import type { ContactData, SocialLink } from "@/lib/wordpress";

const NAV_LINKS = [
  { label: "HOME", href: "#" },
  { label: "PROJECT CONCEPT", href: "#about" },
  { label: "PROJECT INFO", href: "#information" },
  { label: "UNIT TYPE", href: "#unit" },
  { label: "GALLERY", href: "#gallery" },
  { label: "LOCATION", href: "#location" },
  { label: "CONTACT US", href: "#contact" },
];

const SOCIAL_ICON_MAP: Record<
  SocialLink["platform"] | "email",
  React.FC<{ className?: string }>
> = {
  facebook: FacebookIconAlt,
  instagram: InstagramIcon,
  whatsapp: WhatsAppIcon,
  line: LineIconAlt,
  email: MailIcon,
};

export default function Footer({ contact }: { contact: ContactData }) {
  // Build social links from contact data + email
  const socialLinks: { platform: string; url: string }[] = [
    ...contact.socials,
    ...(contact.email
      ? [{ platform: "email" as const, url: `mailto:${contact.email}` }]
      : []),
  ];

  return (
    <footer>
      {/* Main footer */}
      <div className="bg-accent text-warm-200 pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8">
            {/* Left side: Logo + Nav + Address */}
            <div className="flex-1">
              {/* Logo */}
              <Link
                href="#"
                className="inline-flex flex-col items-start gap-1 mb-10"
              >
                <FullLogo className="text-warm-200 h-10" />
              </Link>

              {/* Nav links grid */}
              <nav className="mb-12">
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-3">
                  {NAV_LINKS.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className="font-body text-xs tracking-[0.2em] text-warm-300 hover:text-gold transition-colors duration-300"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Address + Phone */}
              <div>
                {contact.address.length > 0 && (
                  <p className="font-body text-sm tracking-[0.1em] text-warm-300 mb-2">
                    {contact.address.join(" ")}
                  </p>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-body text-lg lg:text-xl font-bold tracking-[0.1em] text-white hover:text-gold transition-colors duration-300"
                  >
                    CALL {contact.phone}
                  </a>
                )}
              </div>
            </div>

            {/* Right side: Social icons stacked vertically */}
            {socialLinks.length > 0 && (
              <div className="flex lg:flex-col items-center gap-5 lg:gap-4 lg:pt-2">
                {socialLinks.map((item) => {
                  const Icon =
                    SOCIAL_ICON_MAP[
                      item.platform as keyof typeof SOCIAL_ICON_MAP
                    ];
                  if (!Icon) return null;
                  return (
                    <a
                      key={item.platform}
                      href={item.url}
                      aria-label={item.platform}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-warm-400/40 flex items-center justify-center text-warm-300 hover:text-gold hover:border-gold transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 translate-x-[2.5%] translate-y-[2.5%]" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-warm-100 py-4">
        <div className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
          <p className="font-body text-xs text-brown-500 text-center">
            <Link
              href="/privacy"
              className="hover:text-accent transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            {/* <span className="mx-2">·</span>
            <Link
              href="#"
              className="hover:text-accent transition-colors duration-300"
            >
              Terms and Conditions
            </Link> */}
            <span className="mx-2">·</span>
            <span>© 2026 Kailani Private Property Co.,Ltd.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
