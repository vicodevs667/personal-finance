"use client";

import { useState, useCallback, useEffect } from "react";
import type { Transaction } from "@/types";
import { getAIAdviceFromExpenses } from "@/lib/aiAdvisorLogic";

const THINKING_DURATION_MS = 1500;
const TYPEWRITER_INTERVAL_MS = 35;

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M3 5h4" />
      <path d="M19 17v4" />
      <path d="M17 19h4" />
    </svg>
  );
}

type AIAdvisorCardProps = {
  expenses: Transaction[];
};

type State = "idle" | "thinking" | "revealing" | "done";

export function AIAdvisorCard({ expenses }: AIAdvisorCardProps) {
  const [state, setState] = useState<State>("idle");
  const [displayedText, setDisplayedText] = useState("");
  const [fullMessage, setFullMessage] = useState("");

  const runAnalysis = useCallback(() => {
    setState("thinking");
    setDisplayedText("");
    setFullMessage("");
  }, []);

  // After "thinking" delay, compute advice and start typewriter
  useEffect(() => {
    if (state !== "thinking") return;
    const timer = setTimeout(() => {
      const advice = getAIAdviceFromExpenses(expenses);
      setFullMessage(advice);
      setState("revealing");
    }, THINKING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [state, expenses]);

  // Typewriter: reveal one character at a time
  useEffect(() => {
    if (state !== "revealing" || !fullMessage) return;
    if (displayedText.length >= fullMessage.length) {
      setState("done");
      return;
    }
    const timer = setTimeout(() => {
      setDisplayedText(fullMessage.slice(0, displayedText.length + 1));
    }, TYPEWRITER_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [state, fullMessage, displayedText]);

  const canGenerateAgain = state === "done" || state === "idle";

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.08), 0 0 40px -8px rgba(192, 132, 252, 0.35), 0 0 80px -16px rgba(236, 72, 153, 0.2)",
      }}
    >
      {/* Subtle gradient border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
        style={{
          background:
            "linear-gradient(135deg, rgba(192, 132, 252, 0.15) 0%, transparent 40%, transparent 60%, rgba(236, 72, 153, 0.12) 100%)",
        }}
        aria-hidden
      />

      <div className="relative">
        <h2
          className="flex items-center gap-2 text-lg font-semibold text-white"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="text-violet-400" aria-hidden>
            <SparklesIcon className="h-6 w-6" />
          </span>
          AI Financial Advisor
        </h2>

        <div className="mt-6">
          {state === "idle" && (
            <p className="text-sm text-slate-500">
              Get personalized advice based on your spending this month.
            </p>
          )}

          {state === "thinking" && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-violet-400 border-t-transparent" />
                <span className="text-sm">Thinking...</span>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-16 animate-pulse rounded-full bg-white/10" />
                <div className="h-2 w-24 animate-pulse rounded-full bg-white/10" style={{ animationDelay: "0.15s" }} />
                <div className="h-2 w-20 animate-pulse rounded-full bg-white/10" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          )}

          {(state === "revealing" || state === "done") && fullMessage && (
            <div
              className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 p-5 backdrop-blur-sm"
              style={{ minHeight: "4rem" }}
            >
              <p className="text-sm leading-relaxed text-slate-300">
                {displayedText}
                {state === "revealing" && (
                  <span className="inline-block w-0.5 animate-pulse bg-violet-400 align-baseline" aria-hidden>
                    |
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={runAnalysis}
            disabled={!canGenerateAgain}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500/90 to-pink-500 px-5 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all hover:shadow-violet-500/30 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-[#030712] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
            aria-label="Generate analysis"
          >
            <SparklesIcon className="h-4 w-4" />
            Generate Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
