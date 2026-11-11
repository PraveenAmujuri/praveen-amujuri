"use client";

import { useState } from "react";

export default function Contact() {
  const [selectedTopic, setSelectedTopic] = useState("Websites");
  const [selectedPrompt, setSelectedPrompt] = useState("I need an AI system");
  const [selectedBudget, setSelectedBudget] = useState("$10k – $35k");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const topics = [
    "Websites",
    "AI / ML",
    "Apps",
    "Tools",
    "Automations",
    "Robotics",
    "Something else",
  ];

  const starterPrompts = [
    "I need a portfolio",
    "I have a project",
    "I need an AI system",
    "I need an app",
    "Not sure yet",
  ];

  const budgets = [
    "Under $3k",
    "$3k – $10k",
    "$10k – $35k",
    "$35k+",
    "Not sure",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="border-t border-[#f4f5f7]/15 bg-[#101113] text-[#f4f5f7]">
      <div className="px-6 pb-20 pt-32 md:px-14 md:pb-24 md:pt-40">
        <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-12">
          {/* Left Editorial Prompt */}
          <div className="md:col-span-5">
            <p className="eyebrow text-[#f4f5f7]/55">
              <span className="idx-tag text-[#0037ff]">05</span> — say hi anytime
            </p>

            <h2 className="font-display mt-10 max-w-[9em] text-[clamp(40px,6.4vw,96px)] font-normal leading-[0.98] tracking-[-0.015em] md:mt-14">
              <span>Bring me the</span>{" "}
              <span className="italic text-[#0037ff]">impossible one.</span>
            </h2>

            <p className="font-read mt-8 max-w-[30em] text-[0.9rem] leading-relaxed text-[#f4f5f7]/60">
              the brief everyone politely declined. the launch with the impossible timeline. the autonomous system that needs designing <em className="italic">and</em> building from scratch. as established above, we are not sure it can&apos;t be done.
            </p>

            <div className="mt-12 hidden md:block">
              <span className="eyebrow block text-[#f4f5f7]/40">direct channel</span>
              <a
                href="mailto:contact@praveenai.tech"
                className="font-display mt-2 block text-xl text-[#f4f5f7] hover:text-[#0037ff] transition-colors"
              >
                contact@praveenai.tech
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-6 md:col-start-7 md:self-end"
          >
            {/* Honeypot */}
            <div
              aria-hidden="true"
              className="absolute h-px w-px overflow-hidden opacity-0"
              style={{ left: "-9999px" }}
            >
              <label>
                website
                <input type="text" tabIndex={-1} autoComplete="off" name="website" />
              </label>
            </div>

            {/* Inputs: From / Reply to */}
            <div className="grid gap-6 md:grid-cols-2">
              <label className="block">
                <span className="eyebrow text-[#f4f5f7]/55">from</span>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="your name"
                  className="mt-2 w-full border-b border-[#f4f5f7]/30 bg-transparent py-3 text-[0.95rem] text-[#f4f5f7] placeholder:text-[#f4f5f7]/35 transition-colors duration-200 hover:border-[#f4f5f7]/60 focus:border-[#0037ff] focus:outline-none"
                  name="name"
                />
              </label>

              <label className="block">
                <span className="eyebrow text-[#f4f5f7]/55">reply to</span>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className="mt-2 w-full border-b border-[#f4f5f7]/30 bg-transparent py-3 text-[0.95rem] text-[#f4f5f7] placeholder:text-[#f4f5f7]/35 transition-colors duration-200 hover:border-[#f4f5f7]/60 focus:border-[#0037ff] focus:outline-none"
                  name="email"
                />
              </label>
            </div>

            {/* Regarding selection pills */}
            <fieldset className="mt-8">
              <legend className="eyebrow text-[#f4f5f7]/55">regarding</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTopic(t)}
                    aria-pressed={selectedTopic === t}
                    className={`eyebrow border px-3 py-2 transition-colors duration-200 cursor-pointer ${
                      selectedTopic === t
                        ? "border-[#0037ff] bg-[#0037ff] text-[#f4f5f7]"
                        : "border-[#f4f5f7]/30 text-[#f4f5f7]/70 hover:border-[#f4f5f7]/70"
                    }`}
                  >
                    {t.toLowerCase()}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Start with selection pills */}
            <fieldset className="mt-8">
              <legend className="eyebrow text-[#f4f5f7]/55">start with</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {starterPrompts.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedPrompt(s)}
                    aria-pressed={selectedPrompt === s}
                    className={`eyebrow border px-3 py-2 transition-colors duration-200 cursor-pointer ${
                      selectedPrompt === s
                        ? "border-[#0037ff] bg-[#0037ff] text-[#f4f5f7]"
                        : "border-[#f4f5f7]/30 text-[#f4f5f7]/70 hover:border-[#f4f5f7]/70"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Message Textarea */}
            <label className="mt-6 block">
              <span className="eyebrow text-[#f4f5f7]/55">
                the situation, in your words
              </span>
              <textarea
                name="message"
                rows={4}
                required
                defaultValue={`Context: ${selectedPrompt} regarding ${selectedTopic}. `}
                placeholder="a few honest lines about what you need engineered…"
                className="mt-2 w-full resize-none border-b border-[#f4f5f7]/30 bg-transparent py-3 text-[0.95rem] text-[#f4f5f7] placeholder:text-[#f4f5f7]/35 transition-colors duration-200 hover:border-[#f4f5f7]/60 focus:border-[#0037ff] focus:outline-none"
              />
            </label>

            {/* Budget options */}
            <fieldset className="mt-8">
              <legend className="eyebrow text-[#f4f5f7]/55">
                rough budget — optional
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBudget(b)}
                    aria-pressed={selectedBudget === b}
                    className={`eyebrow border px-3 py-2 transition-colors duration-200 tabular-nums cursor-pointer ${
                      selectedBudget === b
                        ? "border-[#0037ff] bg-[#0037ff] text-[#f4f5f7]"
                        : "border-[#f4f5f7]/30 text-[#f4f5f7]/70 hover:border-[#f4f5f7]/70"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Submit Action */}
            <div className="mt-10 flex flex-wrap items-baseline gap-6">
              <button
                type="submit"
                disabled={loading || submitted}
                className="eyebrow border border-[#0037ff] bg-[#0037ff] px-6 py-4 text-[#f4f5f7] transition-colors duration-200 hover:border-[#f4f5f7] hover:bg-[#f4f5f7] hover:text-[#101113] disabled:cursor-wait disabled:opacity-60 cursor-pointer"
              >
                {loading
                  ? "TRANSMITTING..."
                  : submitted
                  ? "LETTER RECEIVED ✓"
                  : "SEND THE LETTER"}
              </button>

              <span className="text-[0.75rem] text-[#f4f5f7]/55" role="status">
                Praveen reads and responds to every letter.
              </span>

              <a
                href="mailto:contact@praveenai.tech"
                className="eyebrow link-underline text-[#f4f5f7]/55 hover:text-white transition-colors"
              >
                or just email contact@praveenai.tech
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
