"use client";

import FullLogo from "@/components/ui/FullLogo";

export default function LoadingProgressBar() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-accent">
      {/* Logo container */}
      <div className="relative w-[280px] h-[92px] md:w-[360px] md:h-[118px]">
        {/* Bottom layer: ghost outline */}
        <div className="absolute inset-0 opacity-20">
          <FullLogo className="w-full h-full text-brown-300" />
        </div>

        {/* Top layer: color fill with CSS clip animation */}
        <div className="absolute inset-0 loading-fill">
          <FullLogo className="w-full h-full text-warm-300" />
        </div>
      </div>

      {/* Thin progress bar */}
      <div className="mt-8 w-[120px] h-[1px] bg-brown-300 overflow-hidden rounded-full">
        <div className="h-full bg-warm-300 loading-bar" />
      </div>

      {/* Pure CSS keyframes — no JS hydration needed */}
      <style>{`
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
      `}</style>
    </div>
  );
}
