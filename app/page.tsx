"use client";

import { useState } from "react";
import { Hero } from "@/components/Hero";
import { MediaPreview } from "@/components/MediaPreview";
import { HowItWorks } from "@/components/HowItWorks";
import { SupportedPlatforms } from "@/components/SupportedPlatforms";
import { Features } from "@/components/Features";
import { FAQ } from "@/components/FAQ";
import { AnalyzeResponse } from "@/types/media";

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | undefined>();
  const [mediaData, setMediaData] = useState<AnalyzeResponse | null>(null);

  const [activeJobId, setActiveJobId] = useState<string | null>(null);
  const [isProcessingDownload, setIsProcessingDownload] = useState(false);

  const handleAnalyze = async (url: string) => {
    setIsAnalyzing(true);
    setAnalyzeError(undefined);
    setActiveJobId(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: AnalyzeResponse = await res.json();

      if (!res.ok || !data.success) {
        setAnalyzeError(data.error || "Failed to analyze URL.");
        setMediaData(null);
      } else {
        setMediaData(data);
      }
    } catch {
      setAnalyzeError("Unable to connect to analysis server. Please check your network.");
      setMediaData(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleStartDownload = async (
    type: "video" | "audio",
    format: "mp4" | "mp3",
    quality: string
  ) => {
    if (!mediaData) return;

    setIsProcessingDownload(true);
    setActiveJobId(null);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: mediaData.url,
          type,
          format,
          quality,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.jobId) {
        setActiveJobId(data.jobId);
      } else {
        alert(data.error || "Failed to initiate download job.");
      }
    } catch {
      alert("Error starting download job process.");
    } finally {
      setIsProcessingDownload(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Hero
        onAnalyze={handleAnalyze}
        isLoading={isAnalyzing}
        error={analyzeError}
      />

      {mediaData && (
        <section id="media-preview" className="px-4 pb-16">
          <MediaPreview
            media={mediaData}
            onStartDownload={handleStartDownload}
            isProcessing={isProcessingDownload}
            jobId={activeJobId}
          />
        </section>
      )}

      <HowItWorks />
      <SupportedPlatforms />
      <Features />
      <FAQ />
    </main>
  );
}
