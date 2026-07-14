"use client";

import VanaFullLogo from "../VanaFullLogo";

export default function LoadingWave() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-primary">
      {/* Logo container */}
      <div className="relative w-[320px] md:w-[420px] aspect-[4/3]">
        {/* Bottom layer: ghost outline */}
        <div className="absolute inset-0 opacity-15">
          <VanaFullLogo className="w-full h-full text-accent" />
        </div>

        {/* Top layer: wave fill */}
        <div className="absolute inset-0 loading-wave">
          <VanaFullLogo className="w-full h-full text-on-primary" />
        </div>
      </div>

      {/* Thin progress bar */}
      <div className="mt-8 w-[120px] h-[2px] bg-accent/15 overflow-hidden rounded-full">
        <div className="h-full bg-on-primary loading-bar" />
      </div>

      <style>{`
        .loading-wave {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 15%,
            black 35%,
            transparent 50%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 15%,
            black 35%,
            transparent 50%
          );
          -webkit-mask-size: 300% 100%;
          mask-size: 300% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          animation: waveSlide 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .loading-bar {
          width: 0%;
          animation: barPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes waveSlide {
          0%   { -webkit-mask-position: 200% 0; mask-position: 200% 0; }
          100% { -webkit-mask-position: -100% 0; mask-position: -100% 0; }
        }

        @keyframes barPulse {
          0%   { width: 0%; margin-left: 0; }
          50%  { width: 60%; margin-left: 20%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
