"use client";

import VanaFullLogo from "../VanaFullLogo";

export default function LoadingProgressBar() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary">
      {/* Logo container */}
      <div className="relative w-[320px] md:w-[420px] aspect-[4/3]">
        {/* Bottom layer: ghost outline */}
        <div className="absolute inset-0 opacity-20">
          <VanaFullLogo className="w-full h-full text-accent" />
        </div>

        {/* Top layer: color fill with CSS clip animation */}
        <div className="absolute inset-0 loading-fill">
          <VanaFullLogo className="w-full h-full text-on-primary" />
        </div>
      </div>

      {/* Thin progress bar */}
      {/* FIXED: Changed bg-accent to bg-accent/20 to act as a muted track line */}
      <div className="mt-8 w-[120px] h-[2px] bg-accent/20 overflow-hidden rounded-full">
        {/* FIXED: Swapped text-on-primary for bg-on-primary so the div actually has color */}
        <div className="h-full bg-on-primary loading-bar" />
      </div>

      {/* React-safe style injection to prevent hydration glitches */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .loading-fill {
          clip-path: inset(0 100% 0 0);
          animation: fillReveal 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }

        .loading-bar {
          width: 0%;
          animation: barFill 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }

        @keyframes fillReveal {
          0%   { clip-path: inset(0 100% 0 0); }
          100% { clip-path: inset(0 0% 0 0); }
        }

        @keyframes barFill {
          0%   { width: 0%; }
          100% { width: 100%; }
        }
      `,
        }}
      />
    </div>
  );
}
