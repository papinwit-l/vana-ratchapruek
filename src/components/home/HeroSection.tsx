// components/home/HeroSection.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const AUTO_PLAY_INTERVAL = 6000;

type HeroSlide = {
  src: string;
  alt: string;
};

type HeroData = {
  slides: HeroSlide[];
  title?: string;
  subtitle?: string;
  tagline?: string;
  price?: string;
  price_unit?: string;
};

// Fallback if WP data isn't ready yet
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    src: "/images/banner/banner-image-01.png",
    alt: "VANA Ratchapruek exterior",
  },
  { src: "/images/banner/banner-image-02.png", alt: "VANA Ratchapruek garden" },
  {
    src: "/images/banner/banner-image-03.png",
    alt: "VANA Ratchapruek interior",
  },
];

export default function HeroSection({ data }: { data: HeroData }) {
  const slides = data?.slides?.length ? data.slides : FALLBACK_SLIDES;
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning],
  );

  const next = useCallback(() => {
    goTo(current === slides.length - 1 ? 0 : current + 1);
  }, [current, goTo, slides.length]);

  const prev = useCallback(() => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  }, [current, goTo, slides.length]);

  useEffect(() => {
    const timer = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToForm = () => {
    document
      .getElementById("lead-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-dvh min-h-[600px] overflow-hidden"
    >
      {/* ── Slides ── */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Gradient overlay ── */}
      <div className="hero-overlay-bottom absolute inset-0 z-20 pointer-events-none" />

      {/* ── Content ── */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-6 pt-20">
        {/* Eyebrow — pill with subtle fill, NO shadow */}
        <p className="text-[11px] font-semibold tracking-[6px] uppercase mb-6 text-accent border border-accent/30 bg-black/40 rounded-full px-6 py-2">
          {data?.subtitle || "Asset Five Presents"}
        </p>

        {/* Title */}
        <h1 className="font-display text-[clamp(48px,8vw,88px)] font-light tracking-[6px] leading-none mb-2 text-on-primary hero-text-shadow">
          {data?.title || "VANA"}
        </h1>

        {/* Subtitle */}
        <p className="text-[clamp(12px,2vw,16px)] font-semibold tracking-[8px] uppercase mb-8 text-accent-hover hero-text-shadow-sm">
          Ratchapruek — Westville
        </p>

        {/* Tagline */}
        <p className="font-display text-[clamp(16px,2.5vw,22px)] italic font-normal mb-10 text-on-primary-muted hero-text-shadow-sm">
          {data?.tagline || "Balance of Urbanized Living"}
        </p>

        {/* Price badge */}
        {data?.price && (
          <div className="inline-flex items-baseline gap-2 rounded-full px-8 py-3 mb-10 bg-black/25 border border-accent-border backdrop-blur-sm">
            <span className="text-[13px] tracking-[2px] uppercase text-accent">
              Starting from
            </span>
            <span className="font-display text-[28px] font-semibold text-on-primary hero-text-shadow-sm">
              {data.price}
            </span>
            <span className="text-sm text-accent-hover">
              {data.price_unit || "MB*"}
            </span>
          </div>
        )}

        {/* CTA */}
        <button onClick={scrollToForm} className="btn-cta">
          Register Interest
        </button>
      </div>

      {/* ── Arrows ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <svg
          width="16"
          height="28"
          viewBox="0 0 24 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="lg:w-5 lg:h-8"
        >
          <path d="M20 2L4 20L20 38" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <svg
          width="16"
          height="28"
          viewBox="0 0 24 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="lg:w-5 lg:h-8"
        >
          <path d="M4 2L20 20L4 38" />
        </svg>
      </button>

      {/* ── Dots ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="h-2 rounded-full transition-all duration-500 cursor-pointer"
            style={{
              width: index === current ? 32 : 8,
              background:
                index === current
                  ? "var(--color-accent)"
                  : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 hidden lg:flex">
        <span className="text-[10px] tracking-[3px] text-white/30">SCROLL</span>
        <div
          className="w-px h-10"
          style={{
            background:
              "linear-gradient(180deg, var(--color-accent-border), transparent)",
          }}
        />
      </div>
    </section>
  );
}
