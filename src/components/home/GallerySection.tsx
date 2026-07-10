// components/home/GallerySection.tsx
"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
};

type GalleryData = {
  images: GalleryImage[];
};

export default function GallerySection({ data }: { data: GalleryData }) {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  const images = data.images;
  const total = images.length;

  const scrollToSlide = useCallback(
    (index: number) => {
      if (!sliderRef.current) return;
      const clamped = Math.max(0, Math.min(index, total - 1));
      setCurrent(clamped);
      const slide = sliderRef.current.children[clamped] as HTMLElement;
      if (slide) {
        sliderRef.current.scrollTo({
          left: slide.offsetLeft - 40,
          behavior: "smooth",
        });
      }
    },
    [total],
  );

  const prev = () => scrollToSlide(current - 1);
  const next = () => scrollToSlide(current + 1);

  const openModal = (index: number) => {
    setModalIndex(index);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "";
  };

  const modalPrev = () => setModalIndex((i) => (i === 0 ? total - 1 : i - 1));
  const modalNext = () => setModalIndex((i) => (i === total - 1 ? 0 : i + 1));

  // Keyboard nav for modal
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") modalPrev();
      if (e.key === "ArrowRight") modalNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  return (
    <section id="gallery" className="bg-surface py-14 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Top row: heading left, arrows right */}
        <div className="flex items-end justify-between mb-8 lg:mb-12">
          <div>
            <p
              className={`section-label--light text-[11px] tracking-[4px] uppercase text-muted mb-3 reveal ${v}`}
            >
              Gallery
            </p>
            <h2
              className={`section-heading text-text text-3xl lg:text-4xl reveal reveal-delay-1 ${v}`}
            >
              A Closer Look
            </h2>
          </div>

          {/* Arrows */}
          <div className={`flex items-center gap-3 reveal reveal-delay-2 ${v}`}>
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous image"
              className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-light transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button
              onClick={next}
              disabled={current >= total - 1}
              aria-label="Next image"
              className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-light transition-colors duration-300 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Slider — full bleed */}
      <div
        ref={sliderRef}
        className={`flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide px-6 lg:px-10 snap-x snap-mandatory reveal reveal-delay-2 ${v}`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="shrink-0 w-[85vw] sm:w-[70vw] md:w-[55vw] lg:w-[45vw] snap-start cursor-pointer group"
            onClick={() => openModal(i)}
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 45vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6 lg:mt-8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "w-8 bg-accent" : "w-4 bg-text/20"
            }`}
          />
        ))}
      </div>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Close */}
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              modalPrev();
            }}
            className="absolute left-4 lg:left-8 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Image */}
          <div
            className="relative w-[90vw] h-[70vh] lg:w-[80vw] lg:h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[modalIndex].src}
              alt={images[modalIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              modalNext();
            }}
            className="absolute right-4 lg:right-8 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer z-10"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Counter */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest">
            {modalIndex + 1} / {total}
          </p>
        </div>
      )}
    </section>
  );
}
