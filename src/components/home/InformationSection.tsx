"use client";

import Image from "next/image";
import Logo from "../ui/Logo";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { InformationData } from "@/lib/wordpress";
import { WPContent } from "../ui/WPRender";

export default function InformationSection({
  data,
}: {
  data: InformationData;
}) {
  const { ref, isVisible } = useScrollReveal();

  const v = isVisible ? "reveal--visible" : "";
  const vl = isVisible ? "reveal-left--visible" : "";
  const vr = isVisible ? "reveal-right--visible" : "";

  return (
    <section id="information" className="bg-primary py-14 lg:py-28">
      <div
        ref={ref}
        className="max-w-[var(--container-max)] mx-auto px-6 lg:px-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Image */}
          <div
            className={`relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[400px] reveal-left ${vl}`}
          >
            <Image
              src={data.image.src}
              alt={data.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: Info */}
          <div
            className={`flex flex-col justify-center lg:py-8 reveal-right ${vr}`}
          >
            <div className="w-fit mx-auto lg:mx-0">
              {/* Wave icon */}
              <Logo
                className={`mx-auto mb-2 h-3 text-accent reveal reveal-delay-1 ${v}`}
              />

              {/* Heading */}
              <h2
                className={`font-display text-2xl lg:text-4xl tracking-[0.15em] text-accent uppercase mb-6 lg:mb-8 reveal reveal-delay-2 ${v}`}
              >
                Information
              </h2>
            </div>

            {/* Description */}
            {data.description && (
              <div className={`mb-6 lg:mb-8 reveal reveal-delay-2 ${v}`}>
                <WPContent className="prose-brown">
                  {data.description}
                </WPContent>
              </div>
            )}

            {/* Details table */}
            <dl className="space-y-3 lg:space-y-4">
              {data.details.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex gap-4 reveal ${v}`}
                  style={{ transitionDelay: `${0.25 + index * 0.07}s` }}
                >
                  <dt className="font-body text-sm text-accent w-20 shrink-0 tracking-[0.05em]">
                    {item.label}
                  </dt>
                  <dd className="font-body text-sm text-brown-600 tracking-[0.02em]">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
