"use client";

import { useState } from "react";

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  graphicSvg: string;
}

const projects: Project[] = [
  {
    id: "lunabot",
    num: "01",
    title: "LunaBot",
    category: "AI / robotics",
    year: "2026",
    description:
      "Autonomous lunar-navigation rover simulation powered by reinforcement learning and edge visual SLAM. Engineered with real-time obstacle avoidance and path planning.",
    tech: ["ROS 2", "PyTorch", "SLAM", "WebAssembly"],
    graphicSvg: "lunabot",
  },
  {
    id: "floodguard",
    num: "02",
    title: "FloodGuard",
    category: "hardware / disaster tech",
    year: "2026",
    description:
      "Telemetry sensor grid and hydrological early-warning neural architecture predicting Flash flooding vectors with sub-meter geographic fidelity.",
    tech: ["LoRaWAN", "Time-Series AI", "Next.js", "Mapbox GL"],
    graphicSvg: "floodguard",
  },
  {
    id: "ai-resume-analyzer",
    num: "03",
    title: "AI Resume Analyzer",
    category: "AI / web application",
    year: "2026",
    description:
      "Semantic parsing engine evaluating candidate competencies against real-time job market embeddings. Features deterministic explainability scoring.",
    tech: ["FastAPI", "Vector Search", "Gemini 2.5", "React"],
    graphicSvg: "resume",
  },
  {
    id: "youtube-voice-translator",
    num: "04",
    title: "Voice Translator",
    category: "AI / speech",
    year: "2026",
    description:
      "Zero-latency speech-to-speech dubbing pipeline preserving emotive cadence, vocal timber, and phoneme lip-sync across 40+ multilingual pairs.",
    tech: ["Whisper v3", "XTTS v2", "FFmpeg", "WebRTC"],
    graphicSvg: "voice",
  },
  {
    id: "modelbenchx",
    num: "05",
    title: "ModelBenchX",
    category: "developer tool / Python",
    year: "2026",
    description:
      "High-throughput benchmark harness measuring token latency, memory pressure, and quantised degradation across heterogeneous local LLMs.",
    tech: ["Rust", "Python", "CUDA", "Textual TUI"],
    graphicSvg: "bench",
  },
  {
    id: "zerotouch",
    num: "06",
    title: "ZeroTouch",
    category: "AI / computer vision",
    year: "2026",
    description:
      "Sub-millimeter spatial hand tracking and touchless gesture operating interface for aseptic medical environments and spatial computing.",
    tech: ["MediaPipe", "WebGL", "Three.js", "TensorFlow.js"],
    graphicSvg: "zerotouch",
  },
];

export default function SelectedWork() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="work" className="-mt-px bg-[#101113] text-[#f4f5f7]">
      <div className="px-6 pb-24 pt-28 md:px-14 md:pb-36 md:pt-36">
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Left Sticky Column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-[#f4f5f7]/55">
              <span className="idx-tag text-[#0037ff]">01</span> — selected work
            </p>

            <h2 className="font-display mt-6 text-[clamp(46px,6.4vw,104px)] font-normal leading-[0.95] tracking-[-0.015em]">
              Work that <em className="italic text-[#f4f5f7]/90">works</em>.
            </h2>

            {/* Desktop Dynamic Preview Frame */}
            <div className="relative mt-12 hidden h-[46vh] w-full border border-[#f4f5f7]/15 bg-[#17181c] p-6 lg:flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#f4f5f7]/10 pb-4">
                <span className="eyebrow text-[#0037ff]">
                  PROJECT // {projects[activeIdx].num}
                </span>
                <span className="eyebrow text-[#f4f5f7]/40">
                  {projects[activeIdx].year}
                </span>
              </div>

              {/* Architectural Wireframe Graphic */}
              <div className="relative my-auto flex h-36 w-full items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-28 w-28 border border-[#0037ff]/30 rotate-45 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="absolute h-36 w-36 border border-[#f4f5f7]/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <div className="absolute h-16 w-16 bg-[#0037ff]/10 border border-[#0037ff]/60" />
                </div>
                <span className="font-display relative z-10 text-3xl font-light tracking-widest text-[#f4f5f7]">
                  {projects[activeIdx].title.toUpperCase()}
                </span>
              </div>

              <div>
                <p className="font-read text-[0.85rem] leading-relaxed text-[#f4f5f7]/70">
                  {projects[activeIdx].description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {projects[activeIdx].tech.map((t) => (
                    <span
                      key={t}
                      className="eyebrow border border-[#f4f5f7]/20 px-2 py-1 text-[#f4f5f7]/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Rows Column */}
          <div>
            <div>
              {projects.map((proj, idx) => (
                <div
                  key={proj.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group block border-t border-[#f4f5f7]/15 py-7 md:py-8 cursor-pointer transition-colors duration-300 ${
                    idx === projects.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 md:flex-nowrap">
                    <span className="eyebrow w-12 shrink-0 text-[#f4f5f7]/45 transition-colors duration-300 group-hover:text-[#0037ff]">
                      {proj.num} /
                    </span>

                    <span className="font-display text-[clamp(32px,4.4vw,72px)] font-normal leading-[1.02] tracking-[-0.01em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3">
                      {proj.title}
                    </span>

                    <span className="eyebrow ml-auto shrink-0 text-[#f4f5f7]/55 group-hover:text-[#f4f5f7]/90 transition-colors">
                      {proj.category} · {proj.year}
                    </span>
                  </div>

                  {/* Mobile expansion content */}
                  <div className="mt-4 lg:hidden">
                    <p className="font-read text-[0.85rem] leading-relaxed text-[#f4f5f7]/60">
                      {proj.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {proj.tech.map((t) => (
                        <span
                          key={t}
                          className="eyebrow border border-[#f4f5f7]/20 px-2 py-0.5 text-[#f4f5f7]/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 flex flex-wrap items-baseline justify-between gap-3">
              <span className="eyebrow text-[#f4f5f7]/50">
                AI systems · robotics · distributed backends · models
              </span>
              <span className="eyebrow text-[#f4f5f7]/50">
                ( selected, and shipped )
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
