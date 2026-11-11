"use client";

import Link from "next/link";

export default function Footer() {
  const pageLinks = [
    { label: "/work", href: "#work" },
    { label: "/apps", href: "#apps" },
    { label: "/services", href: "#services" },
    { label: "/lab", href: "#lab" },
    { label: "/instrument", href: "#instrument" },
    { label: "/contact", href: "#contact" },
  ];

  const externalLinks = [
    { label: "GitHub ↗", href: "https://github.com" },
    { label: "LinkedIn ↗", href: "https://linkedin.com" },
    { label: "X / Twitter ↗", href: "https://x.com" },
    { label: "Hugging Face ↗", href: "https://huggingface.co" },
    { label: "contact@praveenai.tech", href: "mailto:contact@praveenai.tech" },
  ];

  return (
    <footer className="border-t border-[#f4f5f7]/15 bg-[#101113] text-[#f4f5f7]">
      {/* Upper Main Footer Grid */}
      <div className="grid gap-y-12 px-6 py-12 md:grid-cols-12 md:items-end md:gap-x-12 md:px-14 md:py-16">
        <div className="md:col-span-6">
          <Link
            href="/"
            className="font-display inline-block text-[clamp(56px,8vw,120px)] font-light leading-none tracking-tight"
            aria-label="PRAVEEN — home"
          >
            PRAVEEN
          </Link>
          <p className="font-display mt-6 text-xl italic text-[#f4f5f7]/70">
            We architect it, then we engineer it. Since 2022.
          </p>
        </div>

        {/* Section Navigation */}
        <nav aria-label="Pages" className="flex flex-col gap-3 md:col-span-3">
          {pageLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="eyebrow link-underline w-fit text-[#f4f5f7]/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Elsewhere External Links */}
        <nav aria-label="Elsewhere" className="flex flex-col gap-3 md:col-span-3">
          {externalLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="eyebrow link-underline w-fit text-[#f4f5f7]/70 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Newsletter / Design & Engineering Note */}
      <div className="border-t border-[#f4f5f7]/10 px-6 py-8 md:px-14">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Subscribed to Praveen's monthly engineering dispatch.");
          }}
          className="max-w-[28rem]"
        >
          <label className="block">
            <span className="eyebrow text-[#f4f5f7]/55">
              One systems &amp; AI note a month. The kind engineers discuss in architectural reviews.
            </span>
            <span className="mt-3 flex items-baseline gap-3">
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="engineer@domain.com"
                className="min-w-0 flex-1 border-b border-[#f4f5f7]/30 bg-transparent py-2 text-[0.85rem] text-[#f4f5f7] placeholder:text-[#f4f5f7]/35 transition-colors duration-200 hover:border-[#f4f5f7]/60 focus:border-[#0037ff] focus:outline-none"
                name="email"
              />
              <button
                type="submit"
                className="eyebrow shrink-0 border-b border-[#0037ff] pb-2 text-[#0037ff] transition-opacity duration-200 hover:opacity-70 cursor-pointer"
              >
                send it
              </button>
            </span>
          </label>
        </form>
      </div>

      {/* Domain & Bottom Meta */}
      <div className="flex flex-col gap-4 border-t border-[#f4f5f7]/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-14">
        <p className="eyebrow text-[#f4f5f7]/55">
          © 2022–2026 PRAVEEN. All rights reserved ·{" "}
          <span className="text-[#0037ff]">praveenai.tech</span>
        </p>

        <div className="flex gap-6">
          <span className="eyebrow text-[#f4f5f7]/50">AI / ML Engineer</span>
          <span className="eyebrow text-[#f4f5f7]/50">·</span>
          <span className="eyebrow text-[#f4f5f7]/50">Creative Technologist</span>
        </div>
      </div>
    </footer>
  );
}
