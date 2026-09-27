"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, AlertCircle, RefreshCw, Clock } from "lucide-react";
import { JobStatus } from "@/types/media";

interface DownloadProgressProps {
  jobId: string;
}

export function DownloadProgress({ jobId }: DownloadProgressProps) {
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    async function pollStatus() {
      try {
        const res = await fetch(`/api/status/${jobId}`);
        const data = await res.json();

        if (data.success) {
          setStatus(data);
          if (data.status !== "completed" && data.status !== "failed") {
            timer = setTimeout(pollStatus, 1000);
          }
        } else {
          setError(data.error || "Failed to fetch status.");
        }
      } catch {
        setError("Error connecting to server status endpoint.");
      }
    }

    pollStatus();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [jobId]);

  if (error) {
    return (
      <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Processing Error</p>
          <p className="mt-0.5 text-red-500/90">{error}</p>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-3 text-slate-500">
        <RefreshCw className="w-5 h-5 animate-spin text-indigo-500" />
        <span>Initializing download pipeline...</span>
      </div>
    );
  }

  const isCompleted = status.status === "completed";
  const isFailed = status.status === "failed";

  return (
    <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4 shadow-xl animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : isFailed ? (
            <AlertCircle className="w-5 h-5 text-red-400" />
          ) : (
            <RefreshCw className="w-5 h-5 animate-spin text-indigo-400" />
          )}
          <span className="font-semibold text-sm sm:text-base capitalize">
            {status.stage}
          </span>
        </div>

        <span className="font-mono text-sm font-bold text-indigo-400">
          {status.progress}%
        </span>
      </div>

      {/* Progress bar */}
      {!isCompleted && !isFailed && (
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${status.progress}%` }}
          />
        </div>
      )}

      {/* Error state */}
      {isFailed && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {status.error || "We couldn't process this media. Please try again later."}
        </div>
      )}

      {/* Completed State */}
      {isCompleted && status.downloadUrl && (
        <div className="space-y-3 pt-2">
          <a
            href={status.downloadUrl}
            download={status.fileName || "media"}
            className="w-full py-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base"
          >
            <Download className="w-5 h-5" />
            Download {status.fileName}
          </a>

          <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5 text-center">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            File will be automatically removed from the server after a short period.
          </p>
        </div>
      )}
    </div>
  );
}
