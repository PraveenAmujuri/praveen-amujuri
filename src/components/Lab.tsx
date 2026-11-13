"use client";

import { useEffect, useRef, useState } from "react";

export default function Lab() {
  // Experiment 1: Interactive Letterform / ASCII
  const asciiCanvasRef = useRef<HTMLCanvasElement>(null);
  const [inputText, setInputText] = useState("AI");

  // Experiment 2: Font Typeset pair toggle
  const fontPairs = [
    { label: "Aa", name: "Grotesk / Mono" },
    { label: "Ωπ", name: "Architectural / Tech" },
    { label: "01", name: "Binary / Glyph" },
    { label: "Px", name: "Pixel / Vector" },
  ];
  const [typesetIdx, setTypesetIdx] = useState(0);

  // Experiment 3: Generative Vision Waveform Canvas
  const visionCanvasRef = useRef<HTMLCanvasElement>(null);

  // Experiment 4: Procedural Kinetic Motion Canvas
  const motionCanvasRef = useRef<HTMLCanvasElement>(null);

  // Run ASCII Letterform canvas render
  useEffect(() => {
    const canvas = asciiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let isVisible = false;

    const render = () => {
      if (!isVisible) return;
      t += 0.05;
      ctx.fillStyle = "#101113";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0037ff";
      ctx.font = "bold 40px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const chars = inputText.split("");
      chars.forEach((c, i) => {
        const offset = Math.sin(t + i) * 6;
        ctx.fillText(c, canvas.width / 2 + (i - (chars.length - 1) / 2) * 22, canvas.height / 2 + offset);
      });

      // Scanlines
      ctx.strokeStyle = "rgba(244, 245, 247, 0.08)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          animId = requestAnimationFrame(render);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [inputText]);

  // Run Vision neural waveform canvas
  useEffect(() => {
    const canvas = visionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let isVisible = false;

    const render = () => {
      if (!isVisible) return;
      t += 0.04;
      ctx.fillStyle = "#101113";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 1.5;
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = i === 1 ? "#0037ff" : "rgba(244, 245, 247, 0.25)";
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 3) {
          const y = canvas.height / 2 + Math.sin(x * 0.08 + t + i * 0.8) * (14 + i * 4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          animId = requestAnimationFrame(render);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  // Run Motion kinetic Lissajous canvas
  useEffect(() => {
    const canvas = motionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let isVisible = false;

    const render = () => {
      if (!isVisible) return;
      t += 0.03;
      ctx.fillStyle = "#101113";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "rgba(244, 245, 247, 0.5)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      for (let a = 0; a < Math.PI * 2; a += 0.08) {
        const x = cx + Math.sin(a * 3 + t) * 32;
        const y = cy + Math.cos(a * 2 + t * 0.7) * 32;
        if (a === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Center glowing point
      ctx.fillStyle = "#0037ff";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          animId = requestAnimationFrame(render);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section id="lab" className="border-t border-[#f4f5f7]/15 bg-[#101113] text-[#f4f5f7]">
      <div className="px-6 py-24 md:px-14 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[#f4f5f7]/55">
              <span className="idx-tag text-[#0037ff]">04</span> — the lab
            </p>
            <h2 className="font-display mt-7 text-[clamp(40px,6vw,88px)] font-normal leading-[0.95] tracking-[-0.015em]">
              Play that <em className="italic text-[#f4f5f7]/90">works</em>.
            </h2>
          </div>
          <p className="font-read max-w-[30em] text-[0.9rem] leading-relaxed text-[#f4f5f7]/60">
            experimental toys built to stay sharp. Free, in the browser, no sign-up. Coded by the same hands, which is rather the point.
          </p>
        </div>

        <p className="eyebrow mt-12 text-[#f4f5f7]/50">specimens</p>

        {/* 4-Column Lab Specimens Grid */}
        <div className="mt-4 grid grid-cols-1 gap-px border border-[#f4f5f7]/15 bg-[#f4f5f7]/15 sm:grid-cols-2 lg:grid-cols-4">
          {/* Specimen 001 - Letterform */}
          <div className="group flex flex-col justify-between bg-[#101113] p-7 transition-colors duration-300 hover:bg-[#17181c] md:p-8">
            <div>
              <div className="flex items-start justify-between">
                <div className="border border-[#f4f5f7]/20 p-2 transition-colors duration-300 group-hover:border-[#0037ff]">
                  <canvas
                    ref={asciiCanvasRef}
                    width={88}
                    height={88}
                    className="block"
                  />
                </div>
                <span className="eyebrow text-[#f4f5f7]/50 group-hover:text-white transition-colors">
                  001
                </span>
              </div>

              <div className="mt-10">
                <span className="eyebrow text-[#0037ff]">001 // CHAR-FIELD</span>
                <h3 className="font-display mt-2 text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.02] tracking-[-0.01em]">
                  Letterform
                </h3>
                <p className="font-read mt-3 text-[0.8rem] leading-relaxed text-[#f4f5f7]/60">
                  Dynamic ASCII generative matrix transforming typography in real-time.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f4f5f7]/10">
              <input
                type="text"
                maxLength={4}
                value={inputText}
                onChange={(e) => setInputText(e.target.value.toUpperCase())}
                placeholder="EDIT"
                className="eyebrow w-full bg-[#17181c] border border-[#f4f5f7]/20 px-3 py-1.5 text-center text-[#f4f5f7] focus:border-[#0037ff] focus:outline-none"
              />
            </div>
          </div>

          {/* Specimen 002 - Typeset */}
          <div
            onClick={() => setTypesetIdx((prev) => (prev + 1) % fontPairs.length)}
            className="group flex flex-col justify-between bg-[#101113] p-7 transition-colors duration-300 hover:bg-[#17181c] md:p-8 cursor-pointer select-none"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex h-[104px] w-[104px] items-center justify-center border border-[#f4f5f7]/20 p-2 transition-colors duration-300 group-hover:border-[#0037ff]">
                  <span className="font-display text-4xl text-[#f4f5f7] transition-transform duration-300 group-hover:scale-110">
                    {fontPairs[typesetIdx].label}
                  </span>
                </div>
                <span className="eyebrow text-[#f4f5f7]/50 group-hover:text-white transition-colors">
                  002
                </span>
              </div>

              <div className="mt-10">
                <span className="eyebrow text-[#0037ff]">002 // GLYPH-SYSTEM</span>
                <h3 className="font-display mt-2 text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.02] tracking-[-0.01em]">
                  Typeset
                </h3>
                <p className="font-read mt-3 text-[0.8rem] leading-relaxed text-[#f4f5f7]/60">
                  Curated pairings of geometric grotesks and architectural mono typography. Tap to switch.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f4f5f7]/10 flex items-center justify-between">
              <span className="eyebrow text-[10px] text-[#f4f5f7]/50">
                {fontPairs[typesetIdx].name}
              </span>
              <span className="eyebrow text-[#0037ff]">swap ↻</span>
            </div>
          </div>

          {/* Specimen 003 - Vision */}
          <div className="group flex flex-col justify-between bg-[#101113] p-7 transition-colors duration-300 hover:bg-[#17181c] md:p-8">
            <div>
              <div className="flex items-start justify-between">
                <div className="border border-[#f4f5f7]/20 p-2 transition-colors duration-300 group-hover:border-[#0037ff]">
                  <canvas
                    ref={visionCanvasRef}
                    width={88}
                    height={88}
                    className="block"
                  />
                </div>
                <span className="eyebrow text-[#f4f5f7]/50 group-hover:text-white transition-colors">
                  003
                </span>
              </div>

              <div className="mt-10">
                <span className="eyebrow text-[#0037ff]">003 // NEURAL-WAVE</span>
                <h3 className="font-display mt-2 text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.02] tracking-[-0.01em]">
                  Vision
                </h3>
                <p className="font-read mt-3 text-[0.8rem] leading-relaxed text-[#f4f5f7]/60">
                  Continuous multi-harmonic oscillation imitating latent audio and vision feature extractors.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f4f5f7]/10">
              <span className="eyebrow text-[10px] text-[#f4f5f7]/50">
                4-tier frequency stream
              </span>
            </div>
          </div>

          {/* Specimen 004 - Motion */}
          <div className="group flex flex-col justify-between bg-[#101113] p-7 transition-colors duration-300 hover:bg-[#17181c] md:p-8">
            <div>
              <div className="flex items-start justify-between">
                <div className="border border-[#f4f5f7]/20 p-2 transition-colors duration-300 group-hover:border-[#0037ff]">
                  <canvas
                    ref={motionCanvasRef}
                    width={88}
                    height={88}
                    className="block"
                  />
                </div>
                <span className="eyebrow text-[#f4f5f7]/50 group-hover:text-white transition-colors">
                  004
                </span>
              </div>

              <div className="mt-10">
                <span className="eyebrow text-[#0037ff]">004 // KINETIC-FIELD</span>
                <h3 className="font-display mt-2 text-[clamp(28px,3.2vw,44px)] font-normal leading-[1.02] tracking-[-0.01em]">
                  Motion
                </h3>
                <p className="font-read mt-3 text-[0.8rem] leading-relaxed text-[#f4f5f7]/60">
                  Parametric Lissajous field bending orbital vectors with sub-frame dampening.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#f4f5f7]/10">
              <span className="eyebrow text-[10px] text-[#f4f5f7]/50">
                3:2 Lissajous attractor
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-baseline justify-between gap-3">
          <span className="eyebrow text-[#f4f5f7]/50">
            ( experiments, but load-bearing: letterform and typeset deployed to client stacks )
          </span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="eyebrow link-underline text-[#f4f5f7]/70 hover:text-white transition-colors"
          >
            inspect on github ↗
          </a>
        </div>
      </div>
    </section>
  );
}
