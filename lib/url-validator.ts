import { isSafeUrl, normalizeUrl } from "./security";
import { detectPlatform } from "./platform-detector";
import { Platform } from "@/types/media";

export interface ValidationResult {
  valid: boolean;
  platform: Platform;
  normalizedUrl?: string;
  error?: string;
}

export function validateMediaUrl(rawUrl: string): ValidationResult {
  if (!rawUrl || !rawUrl.trim()) {
    return {
      valid: false,
      platform: "unsupported",
      error: "Please enter a valid media URL.",
    };
  }

  const normalized = normalizeUrl(rawUrl);

  const safety = isSafeUrl(normalized);
  if (!safety.safe) {
    return {
      valid: false,
      platform: "unsupported",
      error: safety.reason || "Invalid or restricted URL format.",
    };
  }

  const platform = detectPlatform(normalized);
  if (platform === "unsupported") {
    return {
      valid: false,
      platform: "unsupported",
      error: "This URL is currently unsupported.",
    };
  }

  return {
    valid: true,
    platform,
    normalizedUrl: normalized,
  };
}
