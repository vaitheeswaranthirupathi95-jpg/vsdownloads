"use client";

import { useState } from "react";
import { Film, Music, Info, Download } from "lucide-react";
import { MediaFormat } from "@/types/media";

interface FormatSelectorProps {
  formats: MediaFormat[];
  onStartDownload: (type: "video" | "audio", format: "mp4" | "mp3", quality: string) => void;
  isProcessing: boolean;
}

export function FormatSelector({ formats, onStartDownload, isProcessing }: FormatSelectorProps) {
  const [activeTab, setActiveTab] = useState<"video" | "audio">("video");
  const [selectedQuality, setSelectedQuality] = useState<string>("Best available");

  const videoFormats = formats.filter((f) => f.type === "video");
  const audioFormats = formats.filter((f) => f.type === "audio");

  const currentFormats = activeTab === "video" ? videoFormats : audioFormats;

  const handleDownload = () => {
    onStartDownload(
      activeTab,
      activeTab === "video" ? "mp4" : "mp3",
      selectedQuality
    );
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <h4 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-lg">
          Select Download Format
        </h4>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-200 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => {
              setActiveTab("video");
              setSelectedQuality("Best available");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "video"
                ? "bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Film className="w-4 h-4" />
            MP4 Video
          </button>
          <button
            onClick={() => {
              setActiveTab("audio");
              setSelectedQuality("Best available");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "audio"
                ? "bg-white dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Music className="w-4 h-4" />
            MP3 Audio
          </button>
        </div>
      </div>

      {/* Quality Options */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Available {activeTab === "video" ? "Resolutions" : "Audio Bitrates"}
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {currentFormats.map((fmt) => {
            const isSelected = selectedQuality === fmt.quality;
            return (
              <button
                key={fmt.id}
                onClick={() => setSelectedQuality(fmt.quality)}
                className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-base">{fmt.quality}</span>
                  <span className="text-xs uppercase font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {fmt.container}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "audio" && (
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>Note: Audio extraction does not artificially increase original source quality.</span>
        </div>
      )}

      {/* Download Action */}
      <button
        onClick={handleDownload}
        disabled={isProcessing}
        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 text-base"
      >
        <Download className="w-5 h-5" />
        Download {activeTab === "video" ? `MP4 (${selectedQuality})` : `MP3 (${selectedQuality})`}
      </button>
    </div>
  );
}
