import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";

export function getFfmpegPath(): string {
  if (process.env.FFMPEG_PATH) {
    return process.env.FFMPEG_PATH;
  }

  const localExe = path.join(process.cwd(), "bin", "ffmpeg.exe");
  if (fs.existsSync(localExe)) {
    return localExe;
  }

  const localBin = path.join(process.cwd(), "bin", "ffmpeg");
  if (fs.existsSync(localBin)) {
    return localBin;
  }

  return "ffmpeg";
}

ffmpeg.setFfmpegPath(getFfmpegPath());

export function convertAudioToMp3(
  inputPath: string,
  outputPath: string,
  bitrate: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    let kbps = "320k";
    const match = bitrate.match(/(\d+)/);
    if (match && match[1]) {
      kbps = `${match[1]}k`;
    } else if (bitrate.toLowerCase().includes("best")) {
      kbps = "320k";
    }

    let estimatedPercent = 10;

    ffmpeg(inputPath)
      .toFormat("mp3")
      .audioBitrate(kbps)
      .outputOptions(["-y", "-threads 0"])
      .on("progress", (progress: { percent?: number }) => {
        if (onProgress) {
          if (progress.percent && !isNaN(progress.percent)) {
            onProgress(Math.min(99, Math.max(0, Math.round(progress.percent))));
          } else {
            estimatedPercent = Math.min(95, estimatedPercent + 15);
            onProgress(estimatedPercent);
          }
        }
      })
      .on("end", () => {
        if (onProgress) onProgress(100);
        resolve(outputPath);
      })
      .on("error", (err: Error) => {
        reject(err);
      })
      .save(outputPath);
  });
}

export function remuxOrTranscodeMp4(
  inputPath: string,
  outputPath: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    // If input is already mp4, copy file directly in milliseconds
    if (inputPath.toLowerCase().endsWith(".mp4")) {
      try {
        fs.copyFileSync(inputPath, outputPath);
        if (onProgress) onProgress(100);
        return resolve(outputPath);
      } catch {
        // Fallback to ffmpeg
      }
    }

    ffmpeg(inputPath)
      .outputOptions(["-c copy", "-movflags +faststart", "-y"])
      .on("progress", (progress: { percent?: number }) => {
        if (onProgress && progress.percent) {
          onProgress(Math.min(99, Math.max(0, Math.round(progress.percent))));
        }
      })
      .on("end", () => {
        resolve(outputPath);
      })
      .on("error", () => {
        ffmpeg(inputPath)
          .videoCodec("libx264")
          .audioCodec("aac")
          .outputOptions(["-movflags +faststart", "-y"])
          .on("progress", (p: { percent?: number }) => {
            if (onProgress && p.percent) {
              onProgress(Math.min(99, Math.max(0, Math.round(p.percent))));
            }
          })
          .on("end", () => resolve(outputPath))
          .on("error", (err: Error) => reject(err))
          .save(outputPath);
      })
      .save(outputPath);
  });
}
