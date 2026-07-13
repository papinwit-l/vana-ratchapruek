// components/home/LocationSection.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import useScrollReveal from "@/hooks/useScrollReveal";
import { MapPin, Phone, Clock } from "lucide-react";

type NearbyPlace = {
  name: string;
  distance: string;
};

type NearbyCategory = {
  category: string;
  places: NearbyPlace[];
};

type LocationData = {
  mapImage?: string;
  googleMapsUrl?: string;
  address?: string[];
  nearby?: NearbyCategory[];
};

type ContactData = {
  phone?: string;
  line?: string;
  hours?: string;
};

type MapView = "graphic" | "google";

export default function LocationSection({
  location,
  contact,
}: {
  location: LocationData;
  contact: ContactData;
}) {
  const [mapView, setMapView] = useState<MapView>(
    location.mapImage ? "graphic" : "google",
  );
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: mapRef, isVisible: mapVisible } = useScrollReveal();
  const { ref: nearbyRef, isVisible: nearbyVisible } = useScrollReveal();

  const hv = headingVisible ? "reveal--visible" : "";
  const mv = mapVisible ? "reveal--visible" : "";
  const nv = nearbyVisible ? "reveal--visible" : "";

  return (
    <section id="location" className="bg-primary py-14 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-10 lg:mb-16">
          <p className={`section-label mb-3 reveal ${hv}`}>Location</p>
          <h2
            className={`section-heading text-on-primary text-3xl lg:text-4xl mb-3 reveal reveal-delay-1 ${hv}`}
          >
            Perfectly Connected
          </h2>
          <p
            className={`text-sm text-on-primary-muted max-w-md mx-auto reveal reveal-delay-2 ${hv}`}
          >
            ถนนราชพฤกษ์ — เส้นทางแห่งการใช้ชีวิต
            ที่ผสานความร่มรื่นของธรรมชาติเข้ากับการเชื่อมต่อเมืองอย่างลงตัว
          </p>
        </div>

        {/* Map toggle */}
        {location.mapImage && location.googleMapsUrl && (
          <div
            className={`flex items-center justify-center gap-2 mb-6 reveal reveal-delay-2 ${hv}`}
          >
            <button
              onClick={() => setMapView("graphic")}
              className={`text-xs tracking-[0.15em] uppercase px-6 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                mapView === "graphic"
                  ? "bg-accent text-primary"
                  : "bg-transparent text-on-primary-muted border border-accent-border hover:text-accent hover:border-accent"
              }`}
            >
              Graphic Map
            </button>
            <button
              onClick={() => setMapView("google")}
              className={`text-xs tracking-[0.15em] uppercase px-6 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                mapView === "google"
                  ? "bg-accent text-primary"
                  : "bg-transparent text-on-primary-muted border border-accent-border hover:text-accent hover:border-accent"
              }`}
            >
              Google Map
            </button>
          </div>
        )}

        {/* Map + Contact card */}
        <div
          ref={mapRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-14 lg:mb-20"
        >
          {/* Map */}
          <div
            className={`lg:col-span-2 relative aspect-[16/10] overflow-hidden reveal ${mv}`}
          >
            {/* Graphic map */}
            {location.mapImage && (
              <div
                className={`absolute bg-[#1d2c21] inset-0 transition-opacity duration-500 ${
                  mapView === "graphic"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                <Image
                  src={location.mapImage}
                  alt="VANA Ratchapruek location map"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            )}

            {/* Google map */}
            {location.googleMapsUrl && (
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  mapView === "google"
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {mapView === "google" && (
                  <iframe
                    src={location.googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VANA Ratchapruek on Google Maps"
                    className="absolute inset-0 w-full h-full"
                  />
                )}
              </div>
            )}

            {/* Fallback if no map at all */}
            {!location.mapImage && !location.googleMapsUrl && (
              <div className="absolute inset-0 bg-card-dark-bg flex items-center justify-center">
                <MapPin
                  className="w-8 h-8 text-on-primary-muted"
                  strokeWidth={1}
                />
              </div>
            )}
          </div>

          {/* Contact card */}
          <div
            className={`card-dark p-6 lg:p-8 flex flex-col justify-center gap-6 reveal reveal-delay-1 ${mv}`}
          >
            {/* Address */}
            {location.address && location.address.length > 0 && (
              <div className="flex gap-3">
                <MapPin
                  className="w-4 h-4 text-accent shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-on-primary-muted leading-relaxed">
                  {location.address.map((line, i) => (
                    <span key={i}>
                      {i > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Hours */}
            {contact.hours && (
              <div className="flex gap-3">
                <Clock
                  className="w-4 h-4 text-accent shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-on-primary-muted">{contact.hours}</p>
              </div>
            )}

            {/* Phone */}
            {contact.phone && (
              <div className="flex gap-3">
                <Phone
                  className="w-4 h-4 text-accent shrink-0 mt-0.5"
                  strokeWidth={1.5}
                />
                <div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-sm text-on-primary hover:text-accent transition-colors duration-300"
                  >
                    {contact.phone}
                  </a>
                  {contact.line && (
                    <p className="text-xs text-on-primary-muted mt-1">
                      LINE: {contact.line}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={() =>
                document
                  .getElementById("lead-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-cta text-center mt-2"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Nearby places */}
        {location.nearby && location.nearby.length > 0 && (
          <div ref={nearbyRef}>
            <p className={`section-label text-center mb-8 reveal ${nv}`}>
              Nearby Highlights
            </p>

            {/* Desktop: grid */}
            <div className="hidden lg:grid lg:grid-cols-4 gap-6">
              {location.nearby.map((cat, i) => (
                <NearbyCard key={cat.category} cat={cat} i={i} nv={nv} />
              ))}
            </div>

            {/* Mobile: horizontal slider */}
            <div className="lg:hidden">
              <NearbySlider categories={location.nearby} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function NearbyCard({
  cat,
  i,
  nv,
}: {
  cat: NearbyCategory;
  i: number;
  nv: string;
}) {
  return (
    <div className={`reveal reveal-delay-${Math.min(i + 1, 4)} ${nv}`}>
      <h4 className="font-display text-base text-accent font-light mb-4 pb-3 border-b border-accent-border">
        {cat.category}
      </h4>
      <div className="space-y-3">
        {cat.places.map((place) => (
          <div
            key={place.name}
            className="flex items-baseline justify-between gap-3"
          >
            <span className="text-[13px] text-on-primary-muted leading-snug">
              {place.name}
            </span>
            <span className="text-xs text-accent whitespace-nowrap">
              {place.distance}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NearbySlider({ categories }: { categories: NearbyCategory[] }) {
  const [active, setActive] = useState(0);
  const total = categories.length;

  const prev = () => setActive((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setActive((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <div>
      {/* Header: arrow — category name — arrow */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prev}
          aria-label="Previous category"
          className="w-9 h-9 rounded-full border border-accent-border flex items-center justify-center text-on-primary-muted hover:text-accent hover:border-accent transition-colors cursor-pointer"
        >
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M10 2L2 10L10 18" />
          </svg>
        </button>

        <div className="text-center">
          <h4 className="font-display text-base text-accent font-light">
            {categories[active].category}
          </h4>
          <p className="text-[10px] text-on-primary-muted mt-1">
            {active + 1} / {total}
          </p>
        </div>

        <button
          onClick={next}
          aria-label="Next category"
          className="w-9 h-9 rounded-full border border-accent-border flex items-center justify-center text-on-primary-muted hover:text-accent hover:border-accent transition-colors cursor-pointer"
        >
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <path d="M2 2L10 10L2 18" />
          </svg>
        </button>
      </div>

      {/* Places list */}
      <div className="space-y-3">
        {categories[active].places.map((place) => (
          <div
            key={place.name}
            className="flex items-baseline justify-between gap-3"
          >
            <span className="text-[13px] text-on-primary-muted leading-snug">
              {place.name}
            </span>
            <span className="text-xs text-accent whitespace-nowrap">
              {place.distance}
            </span>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {categories.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === active ? "w-6 bg-accent" : "w-3 bg-on-primary/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
