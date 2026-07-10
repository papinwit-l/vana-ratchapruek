// components/home/ProjectInfoSection.tsx
"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";

type InfoItem = {
  label: string;
  value: string;
};

type ProjectInfoData = {
  items: InfoItem[];
  backgroundImage?: string;
};

export default function ProjectInfoSection({
  data,
}: {
  data: ProjectInfoData;
}) {
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  return (
    <section
      id="project-info"
      className="relative py-16 lg:py-24 overflow-hidden"
    >
      {/* Background image */}
      {data.backgroundImage && (
        <>
          <Image
            src={data.backgroundImage}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-primary/85" />
        </>
      )}

      {/* Fallback bg if no image */}
      {!data.backgroundImage && <div className="absolute inset-0 bg-primary" />}

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-6">
          {data.items.map((item, i) => (
            <div
              key={i}
              className={`text-center reveal reveal-delay-${i + 1} ${v}`}
            >
              <p className="text-xs lg:text-sm tracking-wide text-accent mb-3">
                {item.label}
              </p>
              <p className="font-display text-base lg:text-lg text-on-primary font-light leading-snug">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
