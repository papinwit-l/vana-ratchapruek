"use client";

import FullLogo from "../FullLogo";

export default function LoadingWave() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-accent">
      {/* Logo container */}
      <div className="relative w-[280px] h-[92px] md:w-[360px] md:h-[118px]">
        {/* Bottom layer: ghost outline */}
        <div className="absolute inset-0 opacity-15">
          <FullLogo className="w-full h-full text-brown-300" />
        </div>

        {/* Top layer: wave fill */}
        <div className="absolute inset-0 loading-wave">
          <FullLogo className="w-full h-full text-warm-300" />
        </div>
      </div>

      {/* Thin progress bar */}
      <div className="mt-8 w-[120px] h-[1px] bg-brown-400 overflow-hidden rounded-full">
        <div className="h-full bg-warm-300 loading-bar" />
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
