// components/home/FacilitiesSection.tsx
"use client";

import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import {
  Waves,
  Dumbbell,
  TreePine,
  Sofa,
  Baby,
  Cable,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  waves: Waves,
  dumbbell: Dumbbell,
  tree: TreePine,
  sofa: Sofa,
  baby: Baby,
  cable: Cable,
};

type Facility = {
  icon: string;
  title: string;
  description: string;
};

type FacilitiesData = {
  items: Facility[];
  image?: string;
};

export default function FacilitiesSection({ data }: { data: FacilitiesData }) {
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  return (
    <section id="facilities" className="bg-primary py-14 lg:py-28">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div className="text-center mb-10 lg:mb-16">
          <p className={`section-label mb-3 reveal ${v}`}>Amenities</p>
          <h2
            className={`section-heading text-on-primary text-3xl lg:text-4xl reveal reveal-delay-1 ${v}`}
          >
            World-Class Facilities
          </h2>
        </div>

        {/* Image + Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Image — left side */}
          {data.image && (
            <div
              className={`lg:col-span-2 relative aspect-[3/4] lg:aspect-auto overflow-hidden reveal ${v}`}
            >
              <Image
                src={data.image}
                alt="VANA Ratchapruek facilities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-primary/20" />
            </div>
          )}

          {/* Grid — right side */}
          <div
            className={`${data.image ? "lg:col-span-3" : "lg:col-span-5"} grid grid-cols-1 sm:grid-cols-2 gap-4`}
          >
            {data.items.map((item, i) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <div
                  key={item.title}
                  className={`card-dark p-6 lg:p-7 group reveal reveal-delay-${Math.min(i + 1, 5)} ${v}`}
                >
                  <div className="w-10 h-10 rounded-full border border-accent-border flex items-center justify-center mb-4 group-hover:border-accent transition-colors duration-300">
                    {Icon && (
                      <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
                    )}
                  </div>
                  <h3 className="font-display text-base text-on-primary font-light mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-on-primary-muted">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
