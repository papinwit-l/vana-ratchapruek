// components/home/LeadFormSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import useScrollReveal from "@/hooks/useScrollReveal";

const HOUSE_TYPES = [
  { value: "l", label: "Type L — Luxury Collection" },
  { value: "m", label: "Type M — Premium Collection" },
  { value: "s", label: "Type S — Classic Collection" },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function LeadFormSection() {
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!accepted) {
    //   setErrorMsg("Please accept the Privacy Policy.");
    //   setStatus("error");
    //   return;
    // }

    // setStatus("submitting");
    // setErrorMsg("");

    // const form = e.currentTarget;
    // const data = {
    //   firstName: (form.elements.namedItem("firstName") as HTMLInputElement)
    //     .value,
    //   lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
    //   email: (form.elements.namedItem("email") as HTMLInputElement).value,
    //   mobile: (form.elements.namedItem("mobile") as HTMLInputElement).value,
    //   lineId: (form.elements.namedItem("lineId") as HTMLInputElement).value,
    //   houseType: (form.elements.namedItem("houseType") as HTMLSelectElement)
    //     .value,
    //   company: (form.elements.namedItem("company") as HTMLInputElement).value,
    // };

    // try {
    //   const res = await fetch("/api/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });

    //   if (!res.ok) {
    //     const json = await res.json();
    //     throw new Error(json.error || "Something went wrong.");
    //   }

    //   setStatus("success");
    //   form.reset();
    //   setAccepted(false);
    // } catch (err) {
    //   setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    //   setStatus("error");
    // }
  };

  return (
    <section id="lead-form" className="bg-primary py-14 lg:py-20">
      <div ref={ref} className="max-w-2xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className={`text-center mb-8 lg:mb-12 reveal ${v}`}>
          <h2 className="section-heading text-on-primary text-3xl lg:text-4xl">
            Register
          </h2>
          <p className="text-xs tracking-[0.15em] uppercase text-on-primary-muted mt-3">
            Register for more information with exclusive privileges.
          </p>
        </div>

        {/* Success */}
        {status === "success" && (
          <div className="text-center py-8">
            <h3 className="font-display text-xl text-on-primary mb-2">
              Thank You
            </h3>
            <p className="text-sm text-on-primary-muted">
              We will contact you shortly with exclusive project details.
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && errorMsg && (
          <div className="text-center mb-6">
            <p className="text-sm text-red-400">{errorMsg}</p>
          </div>
        )}

        {/* Form */}
        {status !== "success" && (
          <form
            onSubmit={handleSubmit}
            className={`space-y-6 lg:space-y-8 reveal reveal-delay-1 ${v}`}
          >
            {/* Honeypot */}
            <div className="absolute opacity-0 -z-10" aria-hidden="true">
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Name row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <input
                type="text"
                name="firstName"
                required
                placeholder="First Name*"
                className="input-underline"
              />
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last Name*"
                className="input-underline"
              />
            </div>

            {/* Contact row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <input
                type="email"
                name="email"
                required
                placeholder="Email*"
                className="input-underline"
              />
              <input
                type="tel"
                name="mobile"
                required
                placeholder="Mobile Number*"
                className="input-underline"
              />
            </div>

            {/* LINE + House type row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <input
                type="text"
                name="lineId"
                placeholder="LINE ID (Optional)"
                className="input-underline"
              />
              <div className="relative">
                <select
                  name="houseType"
                  defaultValue=""
                  className="input-underline appearance-none cursor-pointer pr-6"
                >
                  <option value="" disabled>
                    Preferred House Type
                  </option>
                  {HOUSE_TYPES.map((type) => (
                    <option
                      key={type.value}
                      value={type.value}
                      className="bg-primary text-on-primary"
                    >
                      {type.label}
                    </option>
                  ))}
                </select>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-on-primary-muted"
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

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="font-display text-lg tracking-[0.15em] text-on-primary border border-accent-border rounded-full px-16 lg:px-20 py-3 hover:bg-accent hover:text-primary transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? "Submitting..." : "Register"}
              </button>
            </div>

            {/* Privacy */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 shrink-0 appearance-none border border-accent-border bg-transparent checked:bg-accent checked:border-accent cursor-pointer relative checked:after:content-['✓'] checked:after:absolute checked:after:inset-0 checked:after:flex checked:after:items-center checked:after:justify-center checked:after:text-primary checked:after:text-[10px] checked:after:font-bold"
              />
              <label
                htmlFor="privacy"
                className="text-[10px] lg:text-[11px] tracking-wide text-on-primary-muted leading-relaxed cursor-pointer"
              >
                Accept I have read and accept the{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 hover:text-accent transition-colors duration-300"
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
