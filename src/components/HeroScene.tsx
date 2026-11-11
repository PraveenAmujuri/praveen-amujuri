"use client";

import { useRef, useCallback } from "react";
import PenroseScene from "./PenroseScene";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const titleWrapperRef = useRef<HTMLDivElement>(null);
  const imSpanRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const scrollLabelRef = useRef<HTMLSpanElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const prevLabelRef = useRef<string>("");

  // Smoothstep utility
  const s = (min: number, max: number, val: number) => {
    const r = Math.min(1, Math.max(0, (val - min) / (max - min)));
    return r * r * (3 - 2 * r);
  };

  // Synchronized frame callback executed directly from the WebGL render loop
  const handleFrameUpdate = useCallback(
    ({ progress }: { progress: number; pShape: number; pZoom: number }) => {
      const e = progress;

      // 1. "IM" span opacity: vanishes between 22% and 42%
      if (imSpanRef.current) {
        imSpanRef.current.style.opacity = String(1 - s(0.22, 0.42, e));
      }

      // 2. Entire "IMPOSSIBLE" title opacity & scale:
      // Fades out between 52% and 72%, gentle optical expansion scale(1 + 0.14 * e)
      if (titleWrapperRef.current) {
        titleWrapperRef.current.style.opacity = String(1 - s(0.52, 0.72, e));
        titleWrapperRef.current.style.transform = `scale(${1 + 0.14 * e})`;
      }

      // 3. Editorial subtitle: fades out between 18% and 32%
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = String(1 - s(0.18, 0.32, e));
      }

      // 4. Dark pass-through overlay: fades in between 72% and 98% as camera enters the portal
      if (darkOverlayRef.current) {
        darkOverlayRef.current.style.opacity = String(s(0.72, 0.98, e));
      }

      // 5. Counter & Scroll instructions
      const isPast85 = e > 0.85;
      if (scrollLabelRef.current) {
        scrollLabelRef.current.style.opacity = isPast85 ? "0" : "1";
        const labelText =
          e > 0.55
            ? "( THROUGH THE WINDOW )"
            : e > 0.28
            ? "( TOLD YOU )"
            : "SCROLL TO INSPECT ↓";
        if (labelText !== prevLabelRef.current) {
          scrollLabelRef.current.textContent = labelText;
          prevLabelRef.current = labelText;
        }
      }

      if (counterRef.current) {
        counterRef.current.style.opacity = isPast85 ? "0" : "1";
        counterRef.current.textContent = String(Math.round(100 * e)).padStart(3, "0");
      }
    },
    []
  );

  return (
    <section
      ref={containerRef}
      aria-label="PRAVEEN — the impossible object"
      className="group relative h-[250vh] bg-[#f4f5f7] text-[#101113]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden bg-[#f4f5f7]"
      >
        {/* Giant Monolithic Spatial Typography: exactly 17vw font-thin leading-none tracking-[-0.04em] */}
        <div
          ref={titleWrapperRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 flex items-center justify-center will-change-transform select-none"
        >
          <span className="font-display block -translate-y-[15vh] whitespace-nowrap text-[17vw] font-thin leading-none tracking-[-0.04em] text-[#101113] sm:translate-y-0">
            <span
              ref={imSpanRef}
              className="text-[#0037ff] will-change-opacity"
            >
              IM
            </span>
            POSSIBLE
          </span>
        </div>

        {/* 3D WebGL Canvas Layer */}
        <PenroseScene sectionRef={containerRef} onFrameUpdate={handleFrameUpdate} />

        {/* Black pass-through curtain transition into Work section */}
        <div
          ref={darkOverlayRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[15] bg-[#101113] opacity-0 will-change-opacity"
        />

        {/* Editorial Subtitle (Lower Third) */}
        <div className="pointer-events-none absolute inset-x-6 bottom-28 z-20 md:inset-x-14">
          <p
            ref={subtitleRef}
            aria-hidden="true"
            className="font-display max-w-[22em] text-[clamp(18px,1.9vw,26px)] leading-[1.25] tracking-[-0.01em] text-[#101113] will-change-opacity opacity-100"
          >
            <span className="block font-normal">
              there are probably things we simply cannot do.
            </span>
            <span className="unsure mt-1 block italic">
              we are not sure of that.
            </span>
          </p>
        </div>

        {/* Bottom Hero Metadata & Dynamic Inspection Feedback */}
        <div className="absolute inset-x-6 bottom-6 z-20 flex flex-col gap-2 md:inset-x-14 md:flex-row md:items-baseline md:justify-between">
          <span className="eyebrow max-w-full text-[#62656c]">
            VISUAL COMMUNICATIONS, ENGINEERED BY HAND
          </span>

          <div className="inline-flex items-baseline gap-3.5 self-end md:self-auto">
            <span
              ref={counterRef}
              className="eyebrow tabular-nums text-[#62656c] transition-opacity duration-300"
              aria-hidden="true"
            >
              000
            </span>
            <span
              ref={scrollLabelRef}
              className="eyebrow text-[#62656c] transition-opacity duration-300"
            >
              SCROLL TO INSPECT ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
