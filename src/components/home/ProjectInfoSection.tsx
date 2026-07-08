// components/home/ProjectInfoSection.tsx
"use client";

import useScrollReveal from "@/hooks/useScrollReveal";

type InfoItem = {
  label: string;
  value: string;
};

type ProjectInfoData = {
  items: InfoItem[];
};

export default function ProjectInfoSection({
  data,
}: {
  data: ProjectInfoData;
}) {
  const { ref, isVisible } = useScrollReveal();
  const v = isVisible ? "reveal--visible" : "";

  return (
    <section id="project-info" className="bg-primary py-14 lg:py-20">
      <div ref={ref} className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
          {data.items.map((item, i) => (
            <div
              key={i}
              className={`text-center reveal reveal-delay-${i + 1} ${v}`}
            >
              <p className="text-[10px] tracking-[3px] uppercase text-accent mb-2">
                {item.label}
              </p>
              <p className="font-display text-lg lg:text-xl text-on-primary font-light">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
