export type Platform = "youtube" | "instagram" | "unsupported";

export interface MediaFormat {
  id: string;
  type: "video" | "audio";
  container: string;
  quality: string;
  filesize?: number;
  hasAudio: boolean;
  hasVideo: boolean;
}

export interface AnalyzeRequest {
  url: string;
}

export interface AnalyzeResponse {
  success: boolean;
  platform: Platform;
  url: string;
  title: string;
  thumbnail: string;
  duration: number; // in seconds
  formats: MediaFormat[];
  error?: string;
}

export interface DownloadRequest {
  url: string;
  type: "video" | "audio";
  format: "mp4" | "mp3";
  quality: string;
}

export interface DownloadResponse {
  success: boolean;
  jobId?: string;
  error?: string;
}

export type JobStatusType =
  | "queued"
  | "preparing"
  | "downloading"
  | "converting"
  | "completed"
  | "failed";

export interface JobStatus {
  id: string;
  status: JobStatusType;
  progress: number;
  stage: string;
  downloadUrl?: string;
  fileName?: string;
  fileSize?: number;
  error?: string;
  createdAt: number;
}
