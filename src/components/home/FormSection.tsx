"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "../ui/Logo";
import useScrollReveal from "@/hooks/useScrollReveal";

const HEAR_ABOUT_OPTIONS = [
  "Google Search",
  "Social Media",
  "Friend / Referral",
  "Property Agent",
  "Billboard / Signage",
  "News / Article",
  "Other",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function FormSection() {
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { ref, isVisible } = useScrollReveal();

  const v = isVisible ? "reveal--visible" : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accepted) {
      setErrorMsg("Please accept the Privacy Policy.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)
        .value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      mobile: (form.elements.namedItem("mobile") as HTMLInputElement).value,
      hearAbout: (form.elements.namedItem("hearAbout") as HTMLSelectElement)
        .value,
      // Honeypot
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
      setAccepted(false);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-accent py-14 lg:py-28">
      <div
        ref={ref}
        className="max-w-[var(--container-narrow)] mx-auto px-6 lg:px-10"
      >
        {/* Heading */}
        <div className="text-center mb-8 lg:mb-16">
          <Logo className={`mx-auto mb-2 text-white h-3 reveal ${v}`} />

          <h2
            className={`font-display text-warm-100 text-3xl lg:text-4xl tracking-[0.2em] uppercase mb-4 reveal reveal-delay-1 ${v}`}
          >
            Register
          </h2>
          <p
            className={`font-body text-xs lg:text-sm tracking-[0.15em] uppercase text-warm-300 reveal reveal-delay-2 ${v}`}
          >
            Register for more information with exclusive privileges.
          </p>
        </div>

        {/* Success Message */}
        {status === "success" && (
          <div className="text-center mb-10">
            <p className="font-body text-sm tracking-[0.05em] text-warm-200">
              Thank you for registering. We will contact you shortly.
            </p>
          </div>
        )}

        {/* Error Message */}
        {status === "error" && errorMsg && (
          <div className="text-center mb-6">
            <p className="font-body text-sm tracking-[0.05em] text-red-400">
              {errorMsg}
            </p>
          </div>
        )}

        {/* Form */}
        {status !== "success" && (
          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-10">
            {/* Honeypot — hidden from real users */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Row 1: First Name / Last Name */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 reveal reveal-delay-2 ${v}`}
            >
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  required
                  className="w-full py-3 bg-transparent border-b border-warm-400/40 text-warm-100 text-sm font-body placeholder:text-warm-400 outline-none focus:border-warm-200 transition-colors duration-300"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  required
                  className="w-full py-3 bg-transparent border-b border-warm-400/40 text-warm-100 text-sm font-body placeholder:text-warm-400 outline-none focus:border-warm-200 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Row 2: Email / Mobile */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 reveal reveal-delay-3 ${v}`}
            >
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  required
                  className="w-full py-3 bg-transparent border-b border-warm-400/40 text-warm-100 text-sm font-body placeholder:text-warm-400 outline-none focus:border-warm-200 transition-colors duration-300"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number*"
                  required
                  className="w-full py-3 bg-transparent border-b border-warm-400/40 text-warm-100 text-sm font-body placeholder:text-warm-400 outline-none focus:border-warm-200 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Row 3: How did you hear about us */}
            <div className={`reveal reveal-delay-4 ${v}`}>
              <div className="relative">
                <select
                  name="hearAbout"
                  defaultValue=""
                  className="w-full py-3 bg-transparent border-b border-warm-400/40 text-sm font-body text-warm-400 outline-none appearance-none cursor-pointer focus:border-warm-200 transition-colors duration-300"
                >
                  <option value="" disabled>
                    How did you hear about us?
                  </option>
                  {HEAR_ABOUT_OPTIONS.map((option) => (
                    <option
                      key={option}
                      value={option}
                      className="bg-accent text-warm-100"
                    >
                      {option}
                    </option>
                  ))}
                </select>
                {/* Dropdown arrow */}
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-warm-400"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Register button */}
            <div
              className={`flex justify-center pt-4 reveal reveal-delay-5 ${v}`}
            >
              <button
                type="submit"
                disabled={status === "submitting"}
                className="font-display text-lg lg:text-xl tracking-[0.15em] text-warm-200 border border-warm-400/50 rounded-full px-12 lg:px-20 py-3 lg:py-3.5 hover:bg-warm-200 hover:text-accent transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Submitting..." : "Register"}
              </button>
            </div>

            {/* Privacy policy checkbox */}
            <div
              className={`flex items-start gap-3 pt-2 reveal reveal-delay-5 ${v}`}
            >
              <input
                type="checkbox"
                id="privacy"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 shrink-0 appearance-none border border-warm-400/50 bg-transparent checked:bg-warm-200 checked:border-warm-200 cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-accent checked:after:text-[10px] checked:after:font-bold"
              />
              <label
                htmlFor="privacy"
                className="font-body text-[10px] lg:text-xs tracking-[0.05em] uppercase text-warm-400 leading-relaxed cursor-pointer"
              >
                Accept I have read and accept the{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-warm-200 transition-colors duration-300"
                >
                  Privacy Policy
                </Link>{" "}
                which contains the details of the protection of my personal
                data.
              </label>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
