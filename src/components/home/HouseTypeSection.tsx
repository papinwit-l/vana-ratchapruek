// components/home/HouseTypeSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";

type HouseTypeFloor = {
  src: string;
  label: string;
};

type HouseTypeSpec = {
  label: string;
  value: string;
};

type HouseType = {
  name: string;
  subtitle: string;
  image: string;
  specs: HouseTypeSpec[];
  floors: HouseTypeFloor[];
};

type HouseTypeData = {
  types: HouseType[];
};

export default function HouseTypeSection({ data }: { data: HouseTypeData }) {
  const [active, setActive] = useState(0);
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal();

  const hv = headingVisible ? "reveal--visible" : "";
  const cv = contentVisible ? "reveal--visible" : "";

  const type = data.types[active];
  if (!type) return null;

  return (
    <section id="house-types" className="bg-surface py-14 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-8 lg:mb-14">
          <p
            className={`section-label--light text-[11px] tracking-[4px] uppercase text-muted mb-3 reveal ${hv}`}
          >
            House Types
          </p>
          <h2
            className={`section-heading text-text text-3xl lg:text-4xl reveal reveal-delay-1 ${hv}`}
          >
            Choose Your Home
          </h2>
        </div>

        {/* Tabs */}
        <div
          className={`flex justify-center mb-10 lg:mb-14 reveal reveal-delay-2 ${hv}`}
        >
          {data.types.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setActive(i)}
              className={`px-6 lg:px-10 py-3 text-[12px] font-semibold tracking-[2px] uppercase transition-all duration-300 cursor-pointer border ${
                active === i
                  ? "bg-primary text-accent border-primary"
                  : "bg-transparent text-text border-text/20 hover:border-text/40"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef}>
          {/* Exterior image + specs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start mb-10 lg:mb-16">
            {/* Image */}
            <div
              className={`relative aspect-[16/10] overflow-hidden reveal ${cv}`}
            >
              <Image
                src={type.image}
                alt={type.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute top-4 left-4 bg-primary text-accent px-4 py-1.5 text-[11px] tracking-[2px] font-semibold uppercase">
                {type.subtitle}
              </div>
            </div>

            {/* Specs */}
            <div className={`reveal reveal-delay-1 ${cv}`}>
              <h3 className="font-display text-2xl lg:text-3xl text-text font-light mb-2">
                {type.name}
              </h3>
              <p className="text-sm text-accent tracking-[2px] mb-8">
                {type.subtitle}
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
                {type.specs.map((spec, i) => (
                  <div key={i}>
                    <p className="text-[10px] tracking-[2px] uppercase text-muted mb-1">
                      {spec.label}
                    </p>
                    <p className="font-display text-lg text-text">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="divider-accent" />
            </div>
          </div>

          {/* Floor plans */}
          {type.floors.length > 0 && (
            <div>
              <p
                className={`text-[11px] tracking-[4px] uppercase text-muted text-center mb-6 reveal reveal-delay-2 ${cv}`}
              >
                Floor Plans
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
                {type.floors.map((floor, i) => (
                  <div
                    key={floor.label}
                    className={`reveal reveal-delay-${i + 3} ${cv}`}
                  >
                    <div className="relative aspect-[4/3] bg-surface-white">
                      <Image
                        src={floor.src}
                        alt={floor.label}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <p className="text-sm text-text-muted text-center mt-3">
                      {floor.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
