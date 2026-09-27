import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { AnalyzeResponse, MediaFormat } from "@/types/media";
import { validateMediaUrl } from "../url-validator";

const execAsync = promisify(exec);

export function getYtDlpPath(): string {
  if (process.env.YT_DLP_PATH) {
    return process.env.YT_DLP_PATH;
  }

  const localExe = path.join(process.cwd(), "bin", "yt-dlp.exe");
  if (fs.existsSync(localExe)) {
    return localExe;
  }

  const localBin = path.join(process.cwd(), "bin", "yt-dlp");
  if (fs.existsSync(localBin)) {
    return localBin;
  }

  return "yt-dlp";
}

interface YtDlpFormat {
  format_id: string;
  ext: string;
  resolution?: string;
  height?: number;
  width?: number;
  vcodec?: string;
  acodec?: string;
  filesize?: number;
  filesize_approx?: number;
  tbr?: number;
  abr?: number;
  format_note?: string;
}

interface YtDlpMetadata {
  id: string;
  title: string;
  thumbnail: string;
  duration?: number;
  formats?: YtDlpFormat[];
  ext?: string;
  _type?: string;
}

export async function extractMetadata(rawUrl: string): Promise<AnalyzeResponse> {
  const validation = validateMediaUrl(rawUrl);
  if (!validation.valid) {
    return {
      success: false,
      platform: "unsupported",
      url: rawUrl,
      title: "",
      thumbnail: "",
      duration: 0,
      formats: [],
      error: validation.error || "Unsupported URL.",
    };
  }

  const url = validation.normalizedUrl || rawUrl;

  try {
    const ytDlpBin = getYtDlpPath();
    // Run yt-dlp to extract JSON metadata without downloading
    const command = `"${ytDlpBin}" -J --no-warnings --no-playlist --dump-single-json "${url}"`;
    const { stdout } = await execAsync(command, { maxBuffer: 1024 * 1024 * 10 });

    const data: YtDlpMetadata = JSON.parse(stdout);

    const formats: MediaFormat[] = parseAvailableFormats(data);

    return {
      success: true,
      platform: validation.platform,
      url,
      title: data.title || "Untitled Media",
      thumbnail: data.thumbnail || "",
      duration: Math.round(data.duration || 0),
      formats,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);

    if (errorMsg.includes("Private video") || errorMsg.includes("Login required") || errorMsg.includes("private")) {
      return {
        success: false,
        platform: validation.platform,
        url,
        title: "",
        thumbnail: "",
        duration: 0,
        formats: [],
        error: "Private or restricted content cannot be processed.",
      };
    }

    if (errorMsg.includes("Video unavailable") || errorMsg.includes("404")) {
      return {
        success: false,
        platform: validation.platform,
        url,
        title: "",
        thumbnail: "",
        duration: 0,
        formats: [],
        error: "The media could not be accessed from the provided URL.",
      };
    }

    return {
      success: false,
      platform: validation.platform,
      url,
      title: "",
      thumbnail: "",
      duration: 0,
      formats: [],
      error: "We couldn't process this media metadata. Ensure yt-dlp is available and the URL is public.",
    };
  }
}

function parseAvailableFormats(data: YtDlpMetadata): MediaFormat[] {
  const result: MediaFormat[] = [];
  const rawFormats = data.formats || [];

  // Filter video qualities
  const videoResolutions = [
    { res: 2160, label: "4K (2160p)" },
    { res: 1440, label: "2K (1440p)" },
    { res: 1080, label: "1080p" },
    { res: 720, label: "720p" },
    { res: 480, label: "480p" },
    { res: 360, label: "360p" },
  ];
  const foundHeights = new Set<number>();

  for (const fmt of rawFormats) {
    if (fmt.height && fmt.vcodec !== "none") {
      foundHeights.add(fmt.height);
    }
  }

  const maxDetected = Math.max(...Array.from(foundHeights), 0);

  // Add Best Available Video
  result.push({
    id: "bestvideo",
    type: "video",
    container: "mp4",
    quality: "Best available",
    hasAudio: true,
    hasVideo: true,
  });

  for (const item of videoResolutions) {
    // Strictly do not offer resolutions higher than max detected height from source
    if (maxDetected > 0) {
      if (item.res <= maxDetected) {
        result.push({
          id: `video-${item.res}p`,
          type: "video",
          container: "mp4",
          quality: item.label,
          hasAudio: true,
          hasVideo: true,
        });
      }
    } else {
      // Fallback if height isn't populated in metadata dump
      result.push({
        id: `video-${item.res}p`,
        type: "video",
        container: "mp4",
        quality: item.label,
        hasAudio: true,
        hasVideo: true,
      });
    }
  }

  // Audio Formats (MP3 with full bitrate choices)
  const bitrates = [
    "Best available",
    "320 kbps",
    "256 kbps",
    "192 kbps",
    "160 kbps",
    "128 kbps",
    "120 kbps",
    "96 kbps",
    "64 kbps",
  ];

  for (const br of bitrates) {
    result.push({
      id: `audio-${br.replace(/\s+/g, "").toLowerCase()}`,
      type: "audio",
      container: "mp3",
      quality: br,
      hasAudio: true,
      hasVideo: false,
    });
  }

  return result;
}
