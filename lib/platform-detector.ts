import { Platform } from "@/types/media";
import { isSafeUrl, normalizeUrl } from "./security";

export function detectPlatform(rawUrl: string): Platform {
  const url = normalizeUrl(rawUrl);
  const safety = isSafeUrl(url);
  if (!safety.safe) {
    return "unsupported";
  }

  try {
    const parsed = new URL(url);
    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.toLowerCase();

    // YouTube checks
    if (
      hostname === "youtube.com" ||
      hostname === "www.youtube.com" ||
      hostname === "m.youtube.com" ||
      hostname === "music.youtube.com"
    ) {
      if (
        pathname.startsWith("/watch") ||
        pathname.startsWith("/shorts/") ||
        pathname.startsWith("/embed/") ||
        pathname.startsWith("/v/") ||
        pathname.startsWith("/live/")
      ) {
        return "youtube";
      }
    }

    if (hostname === "youtu.be") {
      if (pathname.length > 1) {
        return "youtube";
      }
    }

    // Instagram checks
    if (
      hostname === "instagram.com" ||
      hostname === "www.instagram.com" ||
      hostname === "instagr.am" ||
      hostname === "www.instagr.am"
    ) {
      if (
        pathname.startsWith("/reel/") ||
        pathname.startsWith("/reels/") ||
        pathname.startsWith("/p/") ||
        pathname.startsWith("/tv/") ||
        pathname.includes("/share/")
      ) {
        return "instagram";
      }
    }

    return "unsupported";
  } catch {
    return "unsupported";
  }
}
