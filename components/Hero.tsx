"use client";

import { Sparkles, Shield, Zap } from "lucide-react";
import { UrlInput } from "./UrlInput";

interface HeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  error?: string;
}

export function Hero({ onAnalyze, isLoading, error }: HeroProps) {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold shadow-sm">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>YouTube & Instagram Video Downloader</span>
        </div>

        {/* Headlines */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight break-words">
          Download YouTube & Instagram Videos <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            In High Quality
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Paste a YouTube or Instagram video link and download available high-quality video or audio formats.
        </p>

        {/* Input */}
        <div className="pt-4">
          <UrlInput onAnalyze={onAnalyze} isLoading={isLoading} error={error} />
        </div>

        {/* Key Highlights */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Fast Media Processing Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Zero Permanent Server Storage</span>
          </div>
        </div>
      </div>
    </section>
  );
}
