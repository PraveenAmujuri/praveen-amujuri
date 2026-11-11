"use client";

import { useRef } from "react";

interface AppItem {
  id: string;
  name: string;
  platform: string;
  description: string;
  accent: string;
  specs: string;
}

const apps: AppItem[] = [
  {
    id: "lunabot",
    name: "LunaBot OS",
    platform: "Web & Embedded ROS",
    description: "Spatial telemetry & mission control interface with WebGL planetary mapping.",
    accent: "#175cff",
    specs: "v2.4 · 120 FPS · WASM",
  },
  {
    id: "modelbench",
    name: "ModelBenchX",
    platform: "CLI / Desktop app",
    description: "Zero-overhead local LLM quantization & inference latency profiler.",
    accent: "#3b82f6",
    specs: "v1.1 · CUDA / Metal",
  },
  {
    id: "resume-ai",
    name: "ResumeAI Pro",
    platform: "PWA / Web App",
    description: "Privacy-first applicant evaluation tool running lightweight local models.",
    accent: "#60a5fa",
    specs: "100k+ Runs · 99.4% F1",
  },
  {
    id: "voice-trans",
    name: "VoiceSync Live",
    platform: "Desktop & WebRTC",
    description: "Real-time multilingual voice cloning studio for video broadcasting.",
    accent: "#2563eb",
    specs: "<180ms Latency",
  },
  {
    id: "zerotouch-app",
    name: "ZeroTouch Spatial",
    platform: "VisionOS & WebXR",
    description: "Touchless gesture operating system converting single webcam into 6DOF controller.",
    accent: "#1d4ed8",
    specs: "6DOF · Sub-mm Precision",
  },
];

export default function ShippedApps() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="apps" className="border-t border-[#f4f5f7]/15 bg-[#101113] text-[#f4f5f7]">
      <div className="px-6 py-24 md:px-14 md:py-32">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <p className="eyebrow text-[#f4f5f7]/55">
            <span className="idx-tag text-[#0037ff]">02</span> — shipped apps
          </p>
          <a
            className="eyebrow link-underline text-[#f4f5f7]/70 hover:text-white transition-colors"
            href="#work"
          >
            the whole shelf, up close →
          </a>
        </div>

        <h2 className="font-display mt-7 text-[clamp(30px,4vw,56px)] font-normal leading-[1.0] tracking-[-0.015em]">
          In your pocket, <em className="italic text-[#f4f5f7]/90">too</em>.
        </h2>

        <p className="font-read mt-5 max-w-[32rem] text-[0.9rem] leading-relaxed text-[#f4f5f7]/60">
          autonomous tools and products we engineered and shipped — one screen each. Built for speed, offline resiliency, and tactile delight.
        </p>

        <div className="mt-12 md:mt-16">
          <div className="mb-3 flex justify-end lg:hidden">
            <span className="eyebrow text-[#f4f5f7]/50" aria-hidden="true">
              swipe for more →
            </span>
          </div>

          <div className="relative">
            {/* Horizontal Shelf Grid / Slider */}
            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] lg:grid lg:snap-none lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
            >
              {apps.map((app, idx) => (
                <div
                  key={app.id}
                  className="group block w-[65vw] shrink-0 snap-start sm:w-[40vw] md:w-[30vw] lg:w-auto"
                >
                  {/* Mock Device Screen Frame */}
                  <div className="relative aspect-[9/17] w-full overflow-hidden rounded-lg border border-[#f4f5f7]/15 bg-[#17181c] p-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-[#0037ff]/60 group-hover:bg-[#1a1b22]">
                    {/* Top Device Notch / Status Bar */}
                    <div className="flex items-center justify-between border-b border-[#f4f5f7]/10 pb-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0037ff]" />
                      <span className="eyebrow text-[9px] text-[#f4f5f7]/40">
                        {app.specs}
                      </span>
                    </div>

                    {/* App Screen Content Illustration */}
                    <div className="my-auto flex flex-col items-center justify-center pt-8">
                      {/* Geometric App Icon */}
                      <div className="relative flex h-14 w-14 items-center justify-center border border-[#f4f5f7]/20 bg-[#101113] transition-transform duration-500 group-hover:scale-110">
                        <span className="font-display text-lg font-light text-[#f4f5f7]">
                          0{idx + 1}
                        </span>
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 border border-[#0037ff] bg-[#0037ff]/30" />
                      </div>

                      <h4 className="font-display mt-6 text-center text-lg font-medium text-[#f4f5f7]">
                        {app.name}
                      </h4>

                      <p className="mt-1 text-center text-[10px] uppercase tracking-wider text-[#0037ff]">
                        {app.platform}
                      </p>

                      {/* Screen Data Waveforms */}
                      <div className="mt-6 flex w-full flex-col gap-1.5 px-2">
                        <div className="h-1 w-full bg-[#f4f5f7]/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#0037ff]"
                            style={{ width: `${60 + idx * 8}%` }}
                          />
                        </div>
                        <div className="h-1 w-3/4 bg-[#f4f5f7]/10 rounded-full" />
                        <div className="h-1 w-1/2 bg-[#f4f5f7]/10 rounded-full" />
                      </div>
                    </div>

                    {/* Bottom Screen Description */}
                    <div className="absolute inset-x-4 bottom-4">
                      <p className="font-read text-[11px] leading-snug text-[#f4f5f7]/60">
                        {app.description}
                      </p>
                    </div>
                  </div>

                  {/* App Caption */}
                  <div className="mt-3.5 flex items-baseline justify-between gap-2">
                    <span className="font-display text-[14px] leading-none text-[#f4f5f7] group-hover:text-[#0037ff] transition-colors">
                      {app.name}
                    </span>
                    <span
                      aria-hidden="true"
                      className="eyebrow shrink-0 text-[#f4f5f7]/50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient shadow indicator on mobile swipe */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#101113] to-transparent lg:hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
