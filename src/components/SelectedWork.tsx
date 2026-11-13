"use client";

import { useState, useRef, useEffect } from "react";

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  repoUrl: string;
  liveUrl?: string;
  tagline: string;
  mediaSrc?: string;
}

const projects: Project[] = [
  {
    id: "echox",
    num: "01",
    title: "EchoX",
    category: "AI / speech & dubbing",
    year: "2026",
    description:
      "An application that translates and dubs videos. It automates transcription, translation, and voice synthesis to generate translated audio and subtitles for uploaded files or YouTube links.",
    tech: ["React", "FastAPI", "Tauri", "Docker", "Gemini"],
    repoUrl: "https://github.com/PraveenAmujuri/ai_video_translator",
    liveUrl: "https://echox.praveenai.tech/",
    tagline: "Multilingual neural video dubbing & speech synthesis",
    mediaSrc: "/work/echox.gif",
  },
  {
    id: "prism",
    num: "02",
    title: "PRISM",
    category: "developer tool / AI agents",
    year: "2026",
    description:
      "A tool that uses language models to automate code reviews on pull requests. It performs compliance checks, generates documentation, and suggests improvements for code changes.",
    tech: ["React", "Node.js", "AI Agents", "GitHub API"],
    repoUrl: "https://github.com/PraveenAmujuri/prism",
    liveUrl: "https://prism.praveenai.tech/",
    tagline: "Automated PR compliance audits & agentic code analysis",
    mediaSrc: "/work/prism.gif",
  },
  {
    id: "mockforge",
    num: "03",
    title: "MockForge",
    category: "cloud / developer API",
    year: "2026",
    description:
      "A platform for mocking REST APIs and creating sandbox endpoints. It includes request logging, API key management, and latency simulation to help developers test integrations.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
    repoUrl: "https://github.com/PraveenAmujuri/MockForge",
    liveUrl: "https://mock.praveenai.tech/",
    tagline: "High-concurrency API mocking & telemetry sandbox",
    mediaSrc: "/work/mockforge.webm",
  },
  {
    id: "medistream-ai",
    num: "04",
    title: "MediStream AI",
    category: "healthcare / triage AI",
    year: "2026",
    description:
      "A web application for hospital triage and appointment scheduling. It uses language models to analyze symptoms, calculate urgency scores, and schedule appointments based on priority.",
    tech: ["React", "FastAPI", "MongoDB", "Gemini"],
    repoUrl: "https://github.com/PraveenAmujuri/medistream-ai-hospital-booking",
    liveUrl: "https://med.praveenai.tech/",
    tagline: "Clinical triage priority engine & patient routing",
    mediaSrc: "/work/medistream.webp",
  },
  {
    id: "careerdna",
    num: "05",
    title: "CareerDNA",
    category: "AI / talent & ML",
    year: "2026",
    description:
      "A career helper application built with Python and TensorFlow. It analyzes resumes against job descriptions, scores practice interviews, and recommends learning paths.",
    tech: ["Python", "TensorFlow", "Flask", "Scikit-learn"],
    repoUrl: "https://github.com/PraveenAmujuri/careerdna",
    liveUrl: "https://career.praveenai.tech/",
    tagline: "Neural resume embedding & semantic skill matching",
    mediaSrc: "/work/careerdna.webp",
  },
  {
    id: "lunabot",
    num: "06",
    title: "LunaBot",
    category: "robotics / computer vision",
    year: "2026",
    description:
      "A prototype simulation of a lunar rover built with Unity and ROS. It uses YOLOv8 and SLAM to navigate environments and map objects in real-time.",
    tech: ["Python", "Unity", "ROS", "YOLOv8"],
    repoUrl: "https://github.com/PraveenAmujuri/LunaBot_Prototype",
    tagline: "Autonomous planetary rover SLAM & object perception",
    mediaSrc: "/work/lunabot.gif",
  },
];

function VideoCanvas({
  src,
  active,
  onError,
}: {
  src: string;
  active: boolean;
  onError: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only initialize video if active project
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let isRunning = true;
    let isIntersecting = false;

    const video = document.createElement("video");
    video.src = src;
    video.preload = "metadata";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("disablepictureinpicture", "true");
    video.setAttribute("disableremoteplayback", "true");

    video.onerror = () => {
      onError();
    };

    const draw = () => {
      if (!isRunning || !isIntersecting) return;
      if (canvas && video.readyState >= 2) {
        if (
          canvas.width !== video.videoWidth ||
          canvas.height !== video.videoHeight
        ) {
          canvas.width = video.videoWidth || 800;
          canvas.height = video.videoHeight || 600;
        }
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }
      animId = requestAnimationFrame(draw);
    };

    // Rule 4: IntersectionObserver (threshold: 0.25) to pause when scrolled out
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          video.play().catch(() => {});
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(draw);
        } else {
          video.pause();
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(canvas);

    return () => {
      isRunning = false;
      observer.disconnect();
      cancelAnimationFrame(animId);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src, active, onError]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      className="absolute inset-0 h-full w-full object-contain p-3 pointer-events-none select-none"
    />
  );
}

function ProjectMedia({ proj, active }: { proj: Project; active: boolean }) {
  const [loadError, setLoadError] = useState(false);

  if (proj.mediaSrc && !loadError) {
    const isVideo =
      proj.mediaSrc.endsWith(".mp4") || proj.mediaSrc.endsWith(".webm");

    if (isVideo) {
      return (
        <div className="relative h-full w-full pointer-events-none select-none">
          <VideoCanvas
            src={proj.mediaSrc}
            active={active}
            onError={() => setLoadError(true)}
          />
          <div className="absolute inset-0 pointer-events-none" />
        </div>
      );
    }

    return (
      <img
        src={proj.mediaSrc}
        alt={`${proj.title} preview`}
        width={800}
        height={600}
        loading="lazy"
        decoding="async"
        onError={() => setLoadError(true)}
        className="absolute inset-0 h-full w-full object-contain p-3 pointer-events-none select-none"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
      <span className="eyebrow text-[10px] text-[#f4f5f7]/40 tracking-widest uppercase mb-3">
        {proj.year} · PRAVEEN ARCHIVE
      </span>
      <h3 className="font-display text-4xl font-normal tracking-tight text-[#f4f5f7] md:font-thin">
        {proj.title}
      </h3>
      <p className="font-read mt-3 max-w-xs text-xs leading-relaxed text-[#f4f5f7]/50">
        {proj.tagline}
      </p>
    </div>
  );
}

export default function SelectedWork() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="work" className="-mt-px bg-[#101113] text-[#f4f5f7]">
      <div className="px-6 pb-24 pt-28 md:px-14 md:pb-32 md:pt-36">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          {/* Left Sticky Column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-[#f4f5f7]/55">
              <span className="idx-tag text-[#0037ff]">01</span> — selected work
            </p>

            <h2 className="font-display mt-6 text-[clamp(46px,6.4vw,104px)] font-normal leading-[0.95] tracking-[-0.015em] md:font-thin">
              <span>
                <span className="block overflow-hidden">
                  <span className="block">
                    <span>
                      Work that <em className="italic">works</em>.
                    </span>
                  </span>
                </span>
              </span>
            </h2>

            {/* Desktop Side Frame (Faithful Kott pure media container) */}
            <div className="relative mt-10 hidden h-[46vh] w-full border border-[#f4f5f7]/15 bg-[#141518] lg:block overflow-hidden">
              {projects.map((proj, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <div
                    key={proj.id}
                    aria-hidden={!isSelected}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isSelected
                        ? "opacity-100 pointer-events-auto z-10"
                        : "opacity-0 pointer-events-none z-0"
                    }`}
                  >
                    <ProjectMedia proj={proj} active={isSelected} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Project Rows (Exact Kott typography & sizing) */}
          <div>
            <div className="flex flex-col">
              {projects.map((proj, idx) => {
                const isActive = activeIdx === idx;

                return (
                  <a
                    key={proj.id}
                    href={proj.liveUrl || proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => setActiveIdx(idx)}
                    onFocus={() => setActiveIdx(idx)}
                    className={`group block border-t border-[#f4f5f7]/15 py-6 md:py-7 cursor-pointer transition-colors duration-300 ${
                      idx === projects.length - 1 ? "border-b" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 md:flex-nowrap">
                      {/* Project Index Number: '01/' without extra spacing */}
                      <span
                        className={`eyebrow w-10 shrink-0 transition-colors duration-300 ${
                          isActive
                            ? "text-[#0037ff]"
                            : "text-[#f4f5f7]/55 group-hover:text-[#0037ff] group-focus-visible:text-[#0037ff]"
                        }`}
                      >
                        {proj.num}/
                      </span>

                      {/* Large Display Title matching Kott exact clamp(32px,4.4vw,72px) */}
                      <span
                        className={`font-display text-[clamp(32px,4.4vw,72px)] font-normal leading-[1.02] tracking-[-0.01em] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive ? "translate-x-2" : "group-hover:translate-x-2"
                        } md:font-thin text-[#f4f5f7]`}
                      >
                        {proj.title}
                      </span>

                      {/* Category & Year */}
                      <span className="eyebrow ml-auto shrink-0 text-[#f4f5f7]/60">
                        {proj.category} · {proj.year}
                      </span>
                    </div>

                    {/* Mobile expansion content */}
                    <div className="mt-6 lg:hidden">
                      <div className="relative border border-[#f4f5f7]/15 bg-[#141518] h-56 w-full overflow-hidden mb-4">
                        <ProjectMedia proj={proj} active={isActive} />
                      </div>
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
                      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[#f4f5f7]/10 pt-3">
                        {proj.liveUrl && (
                          <span className="eyebrow link-underline text-[#0037ff]">
                            Live demo ↗
                          </span>
                        )}
                        {proj.repoUrl && (
                          <span className="eyebrow link-underline text-[#f4f5f7]/70">
                            View repository ↗
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Bottom Meta matching Kott */}
            <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3">
              <span className="eyebrow text-[#f4f5f7]/55">
                AI systems · robotics · distributed backends · models
              </span>
              <span className="eyebrow text-[#f4f5f7]/55">
                ( selected, and shipped )
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
