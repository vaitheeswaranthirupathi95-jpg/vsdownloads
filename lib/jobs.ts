import { spawn } from "child_process";
import path from "path";
import fs from "fs";
import { DownloadRequest, JobStatus } from "@/types/media";
import { getJobTempDir, cleanupExpiredTempFiles } from "./cleanup";
import { convertAudioToMp3, remuxOrTranscodeMp4, getFfmpegPath } from "./ffmpeg";
import { logEvent } from "./logger";
import { getYtDlpPath } from "./media";

const jobsMap = new Map<string, JobStatus>();

const MAX_FILE_SIZE_MB = parseInt(process.env.MAX_FILE_SIZE_MB || "500", 10);

export function getJobStatus(jobId: string): JobStatus | undefined {
  return jobsMap.get(jobId);
}

export function createDownloadJob(request: DownloadRequest): string {
  cleanupExpiredTempFiles();

  const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  const job: JobStatus = {
    id: jobId,
    status: "queued",
    progress: 0,
    stage: "Job queued for processing",
    createdAt: Date.now(),
  };

  jobsMap.set(jobId, job);

  // Start background execution asynchronously
  processJob(jobId, request).catch((err) => {
    console.error(`Error processing job ${jobId}:`, err);
  });

  return jobId;
}

async function processJob(jobId: string, req: DownloadRequest): Promise<void> {
  const startTime = Date.now();
  const job = jobsMap.get(jobId);
  if (!job) return;

  try {
    const jobDir = getJobTempDir(jobId);
    job.status = "preparing";
    job.progress = 5;
    job.stage = "Initializing media download request...";

    const rawFileTemplate = path.join(jobDir, "raw_media.%(ext)s");
    const ffmpegBinPath = getFfmpegPath();
    const ffmpegDir = path.dirname(ffmpegBinPath);

    // Construct yt-dlp arguments for maximum cloud download speed and direct conversion
    const args: string[] = [
      "--no-warnings",
      "--no-playlist",
      "--force-ipv4",
      "--socket-timeout", "30",
      "--extractor-args", "youtube:player_client=android,web",
      "--concurrent-fragments", "5",
      "-N", "8",
      "--no-part",
      "--max-filesize", `${MAX_FILE_SIZE_MB}M`,
      "--ffmpeg-location", ffmpegDir,
      "-o", rawFileTemplate,
    ];

    if (req.type === "audio") {
      args.push("-x", "--audio-format", "mp3");
      let kbps = "320k";
      const match = req.quality.match(/(\d+)/);
      if (match && match[1]) {
        kbps = `${match[1]}k`;
      }
      args.push("--audio-quality", kbps);
      args.push("-f", "bestaudio/best");
    } else {
      args.push("--merge-output-format", "mp4");
      const heightStr = req.quality.replace(/[^0-9]/g, "");
      if (heightStr) {
        const height = parseInt(heightStr, 10);
        args.push("-f", `bestvideo[height<=${height}][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=${height}]+bestaudio/best[height<=${height}]/best`);
      } else {
        args.push("-f", "bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio/best");
      }
    }

    args.push(req.url);

    job.status = "downloading";
    job.stage = "Downloading media from source...";
    job.progress = 15;

    const ytDlpBin = getYtDlpPath();
    await runYtDlpDownload(ytDlpBin, args, (progressPercent) => {
      job.progress = Math.min(75, 15 + Math.round(progressPercent * 0.6));
    });

    // Find downloaded raw file in jobDir
    const files = fs.readdirSync(jobDir);
    const rawFileName = files.find((f) => f.startsWith("raw_media."));

    if (!rawFileName) {
      throw new Error("Downloaded file was not found on server.");
    }

    const rawFilePath = path.join(jobDir, rawFileName);

    job.status = "converting";
    job.stage = req.type === "audio" ? "Converting audio format to MP3..." : "Finalizing video MP4 container...";
    job.progress = 80;

    let finalFilePath = "";
    let finalFileName = "";

    if (req.type === "audio") {
      finalFileName = "audio.mp3";
      finalFilePath = path.join(jobDir, finalFileName);

      // If yt-dlp extracted directly to mp3, copy directly in milliseconds
      if (rawFilePath.toLowerCase().endsWith(".mp3")) {
        fs.copyFileSync(rawFilePath, finalFilePath);
        job.progress = 98;
      } else {
        await convertAudioToMp3(rawFilePath, finalFilePath, req.quality, (conversionProgress) => {
          job.progress = Math.min(98, 80 + Math.round(conversionProgress * 0.18));
        });
      }
    } else {
      finalFileName = "video.mp4";
      finalFilePath = path.join(jobDir, finalFileName);

      // If yt-dlp already merged into clean MP4, copy directly in milliseconds
      if (rawFilePath.toLowerCase().endsWith(".mp4")) {
        fs.copyFileSync(rawFilePath, finalFilePath);
        job.progress = 98;
      } else {
        await remuxOrTranscodeMp4(rawFilePath, finalFilePath, (conversionProgress) => {
          job.progress = Math.min(98, 80 + Math.round(conversionProgress * 0.18));
        });
      }
    }

    const stats = fs.statSync(finalFilePath);

    job.status = "completed";
    job.progress = 100;
    job.stage = "Media processing complete!";
    job.downloadUrl = `/api/download/file/${jobId}`;
    job.fileName = finalFileName;
    job.fileSize = stats.size;

    logEvent({
      requestId: jobId,
      operation: "download_job",
      durationMs: Date.now() - startTime,
      success: true,
      details: `Generated ${req.type} file (${finalFileName}, ${stats.size} bytes)`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error(`Job ${jobId} failed:`, errorMsg);

    job.status = "failed";
    job.progress = 0;
    job.stage = "Failed to process media.";
    job.error = errorMsg.includes("File is larger than max-filesize")
      ? "This media file is too large for this service."
      : "We couldn't process this media. Please try again later.";

    logEvent({
      requestId: jobId,
      operation: "download_job",
      durationMs: Date.now() - startTime,
      success: false,
      errorCategory: "PROCESSING_ERROR",
      details: errorMsg,
    });
  }
}

function runYtDlpDownload(
  bin: string,
  args: string[],
  onProgress: (percent: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn(bin, args);

    proc.stdout.on("data", (data: Buffer) => {
      const text = data.toString();
      const match = text.match(/(\d+(?:\.\d+)?)%/);
      if (match && match[1]) {
        onProgress(parseFloat(match[1]));
      }
    });

    proc.stderr.on("data", (data: Buffer) => {
      const text = data.toString();
      const match = text.match(/(\d+(?:\.\d+)?)%/);
      if (match && match[1]) {
        onProgress(parseFloat(match[1]));
      }
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`yt-dlp process exited with code ${code}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}
