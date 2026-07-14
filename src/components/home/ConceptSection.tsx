// components/home/ConceptSection.tsx
"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import VanaLogo from "../ui/VanaLogo";

type ConceptData = {
  heading: string[];
  paragraphs: string[];
  image?: string;
};

export default function ConceptSection({ data }: { data: ConceptData }) {
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  return (
    <section id="concept" className="bg-surface py-14 lg:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          {data.image && (
            <div
              className={`relative aspect-[4/5] overflow-hidden reveal ${v}`}
            >
              <Image
                src={data.image}
                alt="VANA Ratchapruek concept"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />
            </div>
          )}

          {/* Text */}
          <div>
            <p
              className={`section-label--light text-[11px] tracking-[4px] uppercase text-muted mb-4 reveal ${v}`}
            >
              The Concept
            </p>

            <h2
              className={`section-heading text-text text-3xl lg:text-[2.75rem] mb-6 reveal reveal-delay-1 ${v}`}
            >
              {data.heading.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <div className="space-y-4">
              {data.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-sm lg:text-base text-text-muted leading-relaxed reveal reveal-delay-${i + 2} ${v}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              className={`divider-accent mt-8 reveal reveal-delay-${data.paragraphs.length + 2} ${v}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
