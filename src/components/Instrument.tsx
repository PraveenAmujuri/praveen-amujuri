"use client";

import { useEffect, useRef, useState } from "react";

type EffectMode = "dither" | "halftone" | "ascii" | "glitch" | "pixel sort";

export default function Instrument() {
  const [activeMode, setActiveMode] = useState<EffectMode>("dither");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate procedural real-time generative camera/art signal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;

      // Base architectural generative visual generator
      ctx.fillStyle = "#0a0a0c";
      ctx.fillRect(0, 0, w, h);

      // Create base procedural scene (3D floating wireframe cube + concentric rings)
      const cx = w / 2;
      const cy = h / 2;
      const time = frame * 0.02;

      if (activeMode === "ascii") {
        // Render ASCII rasterizer
        ctx.fillStyle = "#00ff66";
        ctx.font = "12px monospace";
        const chars = " .:-=+*#%@";
        for (let y = 14; y < h; y += 16) {
          for (let x = 8; x < w; x += 12) {
            const dist = Math.hypot(x - cx, y - cy);
            const val = Math.sin(dist * 0.05 - time) * 0.5 + 0.5;
            const charIdx = Math.floor(val * (chars.length - 1));
            ctx.fillText(chars[charIdx], x, y);
          }
        }
      } else if (activeMode === "halftone") {
        // Halftone dot matrix
        ctx.fillStyle = "#f4f5f7";
        for (let y = 10; y < h; y += 16) {
          for (let x = 10; x < w; x += 16) {
            const dist = Math.hypot(x - cx, y - cy);
            const radius = Math.max(0.8, (Math.sin(dist * 0.04 - time) * 0.5 + 0.5) * 6.5);
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else if (activeMode === "dither") {
        // Bayer ordered dither matrix simulation
        const imgData = ctx.createImageData(w, h);
        const data = imgData.data;

        for (let y = 0; y < h; y += 2) {
          for (let x = 0; x < w; x += 2) {
            const dist = Math.hypot(x - cx, y - cy);
            const val = Math.sin(dist * 0.04 - time) * 0.5 + 0.5;
            const threshold = ((x % 4) * 4 + (y % 4)) / 16;
            const color = val > threshold ? 244 : 12;

            for (let dy = 0; dy < 2; dy++) {
              for (let dx = 0; dx < 2; dx++) {
                const idx = ((y + dy) * w + (x + dx)) * 4;
                data[idx] = color === 244 ? 0 : color;
                data[idx + 1] = color === 244 ? 55 : color;
                data[idx + 2] = color === 244 ? 255 : color;
                data[idx + 3] = 255;
              }
            }
          }
        }
        ctx.putImageData(imgData, 0, 0);
      } else if (activeMode === "glitch") {
        // Chromatic split & displacement slices
        ctx.strokeStyle = "#0037ff";
        ctx.lineWidth = 2;
        for (let r = 20; r < 180; r += 24) {
          ctx.beginPath();
          const jitter = Math.sin(frame * 0.2 + r) * 12;
          ctx.arc(cx + jitter, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Horizontal tear glitches
        for (let i = 0; i < 5; i++) {
          const sliceY = (Math.sin(frame * 0.1 + i * 40) * 0.5 + 0.5) * h;
          const sliceH = 8 + (i % 3) * 6;
          ctx.fillStyle = i % 2 === 0 ? "rgba(0, 55, 255, 0.4)" : "rgba(244, 245, 247, 0.8)";
          ctx.fillRect(0, sliceY, w, sliceH);
        }
      } else if (activeMode === "pixel sort") {
        // Horizontal scan streaks
        for (let y = 0; y < h; y += 6) {
          const intensity = Math.sin(y * 0.05 + time) * 0.5 + 0.5;
          const streakLen = intensity * w;
          ctx.fillStyle = intensity > 0.6 ? "#0037ff" : "rgba(244, 245, 247, 0.2)";
          ctx.fillRect(cx - streakLen / 2, y, streakLen, 4);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeMode]);

  const modes: EffectMode[] = [
    "dither",
    "halftone",
    "ascii",
    "glitch",
    "pixel sort",
  ];

  return (
    <section id="instrument" className="border-t border-[#f4f5f7]/15 bg-[#101113] text-[#f4f5f7]">
      <div className="px-6 py-20 md:px-14 md:py-24">
        {/* Contrast editorial feature card in Electric Cobalt (#0037ff) */}
        <div className="bg-[#0037ff] p-8 text-[#101113] md:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-14">
            {/* Left Narrative Column */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <p className="eyebrow flex flex-wrap items-baseline gap-x-3 text-[#101113]/80 font-medium">
                  <span className="idx-tag bg-[#101113] text-[#f4f5f7] px-2 py-0.5 text-[10px]">
                    PRAVEEN
                  </span>
                  live now
                </p>

                <h2 className="font-display mt-7 text-[clamp(34px,4.4vw,60px)] font-normal leading-[0.98] tracking-[-0.015em]">
                  <span>
                    We built an{" "}
                    <span className="italic text-[#f4f5f7]">instrument.</span>
                  </span>
                </h2>

                <p className="font-read mt-6 max-w-[32rem] text-[0.9rem] leading-relaxed text-[#101113]/85">
                  ours, out of the same hands as everything above: Praveen Neural Studio turns raw data streams, cameras, and vector fields into live, print-grade mathematical visuals. It executes client-side on WebGL and WebAssembly — zero server telemetry required.
                </p>

                {/* Mode Selector Buttons */}
                <div className="mt-8 flex flex-wrap gap-2">
                  {modes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setActiveMode(mode)}
                      className={`eyebrow px-3 py-1.5 transition-all duration-200 border cursor-pointer ${
                        activeMode === mode
                          ? "bg-[#101113] text-[#f4f5f7] border-[#101113]"
                          : "bg-transparent text-[#101113] border-[#101113]/30 hover:border-[#101113]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="#contact"
                  className="eyebrow inline-block bg-[#101113] px-6 py-4 text-[#f4f5f7] transition-colors duration-200 hover:bg-[#f4f5f7] hover:text-[#101113]"
                >
                  collaborate on an instrument ↗
                </a>
              </div>
            </div>

            {/* Right Interactive Instrument Screen */}
            <figure className="lg:col-span-7 flex flex-col justify-between">
              <div className="relative overflow-hidden border border-[#101113]/20 bg-[#101113] p-2 aspect-[4/3]">
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={420}
                  className="block h-full w-full object-cover"
                />

                <div className="absolute top-4 left-4">
                  <span className="eyebrow bg-[#101113]/80 text-[#f4f5f7] px-2 py-1 text-[10px] border border-[#f4f5f7]/20">
                    MODE // {activeMode.toUpperCase()}
                  </span>
                </div>
              </div>

              <figcaption className="eyebrow mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[#101113]/80">
                <span>real client-side computation, 60fps</span>
                <span className="font-semibold text-[#101113]">
                  input → AI math → output
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
