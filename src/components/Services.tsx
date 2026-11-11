"use client";

import { useState } from "react";

interface ServiceItem {
  num: string;
  title: string;
  tagline: string;
  colSpan: string;
  tags?: string[];
  details: string;
}

const services: ServiceItem[] = [
  {
    num: "01",
    title: "Websites",
    tagline: "designed, built, launched",
    colSpan: "lg:col-span-4",
    details:
      "Editorial, bespoke web applications crafted with Next.js, WebGL, and micro-interactions. Zero cookie-cutter templates.",
  },
  {
    num: "02",
    title: "AI / ML",
    tagline: "intelligence with deterministic rigor",
    colSpan: "lg:col-span-4",
    details:
      "Fine-tuned LLM architectures, multi-agent orchestrations, local quantized pipelines, and vision/speech model deployment.",
  },
  {
    num: "03",
    title: "Apps",
    tagline: "same care, app-store sized",
    colSpan: "lg:col-span-4",
    details:
      "Cross-platform React Native, Flutter, and Swift mobile products with seamless offline caching and buttery 120 FPS animations.",
  },
  {
    num: "04",
    title: "Tools & Platforms",
    tagline: "software with a job",
    colSpan: "lg:col-span-8",
    tags: [
      "SaaS & dashboards",
      "internal developer tools",
      "APIs & microservices",
      "production hardening",
      "distributed systems",
    ],
    details:
      "High-throughput backends, developer telemetry, streaming pipelines, and infrastructure engineered for zero-maintenance stability.",
  },
  {
    num: "05",
    title: "Automations",
    tagline: "the busywork, made to do itself",
    colSpan: "lg:col-span-8",
    tags: [
      "autonomous AI agents",
      "workflow automation",
      "webhook & DB glue",
      "data scrapers & aggregators",
      "internal bots",
    ],
    details:
      "Self-healing ETL pipelines, automated code reviews, conversational agent networks, and autonomous task workers.",
  },
  {
    num: "06",
    title: "Robotics",
    tagline: "hardware meets neural perception",
    colSpan: "lg:col-span-4",
    details:
      "ROS 2 navigation graphs, SLAM sensor fusion, edge computer vision on Jetson/RPi, and embedded motor actuation.",
  },
  {
    num: "07",
    title: "Rescue & Support",
    tagline: "we do not disappear after launch",
    colSpan: "lg:col-span-12",
    tags: [
      "codebase recovery",
      "architectural audit",
      "performance profiling",
      "security review",
      "ongoing technical mentorship",
    ],
    details:
      "Stepping in when legacy projects stall, refactoring unmaintainable spaghetti code into elegant type-safe primitives, and maintaining 99.99% uptime.",
  },
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="services" className="relative bg-[#f4f5f7] text-[#101113]">
      {/* Corner editorial plus registration marks */}
      <span
        aria-hidden="true"
        className="eyebrow absolute left-6 top-6 text-[#0037ff]/60 md:left-14 select-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="eyebrow absolute right-6 top-6 text-[#0037ff]/60 md:right-14 select-none"
      >
        +
      </span>

      <div className="px-6 py-24 md:px-14 md:py-32">
        {/* Editorial Section Grid */}
        <div className="grid grid-cols-1 gap-px border border-[#101113]/15 bg-[#101113]/15 lg:grid-cols-12">
          {/* Main Headline Hero Cell */}
          <div className="flex flex-col justify-between gap-10 bg-[#f4f5f7] p-7 md:p-10 lg:col-span-8">
            <p className="eyebrow text-[#62656c]">
              <span className="idx-tag text-[#0037ff]">03</span> — start here
            </p>

            <div>
              <h2 className="font-display text-[clamp(32px,4.4vw,68px)] font-normal leading-[0.98] tracking-[-0.015em]">
                Anything, within{" "}
                <em className="italic text-[#0037ff]">reason</em>.
              </h2>

              <p className="font-read mt-5 max-w-[34em] text-[0.9rem] leading-relaxed text-[#62656c]">
                ( reason negotiable. ) websites, AI models, mobile apps, tools, and robotics: designed and built under one roof, so nothing gets lost between departments. there are no departments. One engineer, full-stack execution.
              </p>
            </div>
          </div>

          {/* Service items */}
          {services.map((srv, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={srv.num}
                onClick={() => toggleExpand(idx)}
                className={`group flex flex-col justify-between gap-3 bg-[#f4f5f7] p-7 transition-all duration-300 hover:bg-[#e8eaee] md:p-8 cursor-pointer ${srv.colSpan}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-[#62656c] transition-colors duration-300 group-hover:text-[#0037ff]">
                      {srv.num}
                    </span>
                    <span className="eyebrow text-[#101113]/40 text-xs">
                      {isExpanded ? "− close" : "+ expand"}
                    </span>
                  </div>

                  <h3 className="font-display mt-3 text-[clamp(22px,2.4vw,38px)] font-normal leading-[1.02] tracking-[-0.01em]">
                    {srv.title}
                  </h3>

                  <p className="font-read mt-1 text-[0.85rem] leading-relaxed text-[#62656c]">
                    {srv.tagline}
                  </p>

                  {/* Expandable detail narrative */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-[#101113]/10 animate-fadeIn">
                      <p className="font-read text-[0.88rem] leading-relaxed text-[#101113]/80 font-normal">
                        {srv.details}
                      </p>
                    </div>
                  )}
                </div>

                {srv.tags && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {srv.tags.map((tag) => (
                      <li
                        key={tag}
                        className="eyebrow border border-[#101113]/20 px-3 py-1.5 text-[#101113]/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-baseline justify-end gap-3">
          <a
            className="eyebrow link-underline text-[#101113]/70 hover:text-[#101113] transition-colors"
            href="#contact"
          >
            have a project in mind? let&apos;s talk →
          </a>
        </div>
      </div>
    </section>
  );
}
