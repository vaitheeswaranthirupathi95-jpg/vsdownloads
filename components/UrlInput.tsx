"use client";

import { useState } from "react";
import { Clipboard, Search, AlertCircle } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/icons";
import { detectPlatform } from "@/lib/platform-detector";

interface UrlInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  error?: string;
}

export function UrlInput({ onAnalyze, isLoading, error }: UrlInputProps) {
  const [url, setUrl] = useState("");
  const detectedPlatform = url.trim() ? detectPlatform(url) : "unsupported";

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch {
      // Fallback if permission denied
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative flex flex-col sm:flex-row items-center p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5 focus-within:border-indigo-500 dark:focus-within:border-indigo-500 transition-all gap-2">
          
          <div className="flex items-center w-full px-3 py-2 sm:py-0 gap-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube or Instagram video link..."
              aria-label="Paste video URL"
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-base sm:text-lg"
            />
            
            {/* Clipboard Paste button */}
            <button
              type="button"
              onClick={handlePaste}
              title="Paste from clipboard"
              className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
            >
              <Clipboard className="w-5 h-5" />
            </button>
          </div>

          {/* Analyze Button */}
          <button
            type="submit"
            disabled={isLoading || !url.trim()}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/30 transition-all shrink-0 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </div>
      </form>

      {/* Platform Detection Indicator */}
      <div className="mt-3 flex items-center justify-between px-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          {detectedPlatform === "youtube" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-medium">
              <YoutubeIcon className="w-4 h-4" />
              YouTube detected
            </span>
          )}
          {detectedPlatform === "instagram" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 font-medium">
              <InstagramIcon className="w-4 h-4" />
              Instagram public post detected
            </span>
          )}
          {url.trim() && detectedPlatform === "unsupported" && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
              <AlertCircle className="w-4 h-4" />
              Unsupported or invalid URL
            </span>
          )}
        </div>

        <span className="text-slate-400 font-medium hidden sm:block">
          Public video URLs only
        </span>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-start gap-3 animate-fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Analysis Failed</p>
            <p className="mt-0.5 text-red-500/90">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
