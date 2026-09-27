"use client";

import { Clock, Sparkles } from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/icons";
import { AnalyzeResponse } from "@/types/media";
import { FormatSelector } from "./FormatSelector";
import { DownloadProgress } from "./DownloadProgress";

interface MediaPreviewProps {
  media: AnalyzeResponse;
  onStartDownload: (type: "video" | "audio", format: "mp4" | "mp3", quality: string) => void;
  isProcessing: boolean;
  jobId: string | null;
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds <= 0) return "N/A";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

export function MediaPreview({ media, onStartDownload, isProcessing, jobId }: MediaPreviewProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/5 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Media Information Left / Top */}
        <div className="md:col-span-5 space-y-4">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md group">
            {media.thumbnail ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={media.thumbnail}
                alt={media.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
                No Thumbnail Available
              </div>
            )}

            <div className="absolute top-3 left-3 flex items-center gap-2">
              {media.platform === "youtube" && (
                <span className="px-3 py-1 rounded-full bg-red-600 text-white font-bold text-xs flex items-center gap-1 shadow">
                  <YoutubeIcon className="w-3.5 h-3.5" />
                  YouTube
                </span>
              )}
              {media.platform === "instagram" && (
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center gap-1 shadow">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  Instagram
                </span>
              )}
            </div>

            {media.duration > 0 && (
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-xs font-mono flex items-center gap-1 backdrop-blur-sm">
                <Clock className="w-3 h-3 text-slate-300" />
                {formatDuration(media.duration)}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
              {media.title}
            </h3>

            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Public Media
              </span>
              <span>•</span>
              <span>Available Formats Ready</span>
            </div>
          </div>
        </div>

        {/* Right / Bottom Formats & Progress */}
        <div className="md:col-span-7 space-y-6">
          <FormatSelector
            formats={media.formats}
            onStartDownload={onStartDownload}
            isProcessing={isProcessing}
          />

          {jobId && <DownloadProgress jobId={jobId} />}
        </div>
      </div>
    </div>
  );
}
