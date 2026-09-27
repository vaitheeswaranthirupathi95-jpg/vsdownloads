import { describe, it, expect } from "vitest";
import { detectPlatform } from "../lib/platform-detector";

describe("Platform Detector", () => {
  it("detects YouTube Watch URLs", () => {
    expect(detectPlatform("https://www.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("youtube");
    expect(detectPlatform("https://m.youtube.com/watch?v=dQw4w9WgXcQ")).toBe("youtube");
  });

  it("detects YouTube Shorts", () => {
    expect(detectPlatform("https://www.youtube.com/shorts/abc123xyz")).toBe("youtube");
  });

  it("detects YouTube short URLs (youtu.be)", () => {
    expect(detectPlatform("https://youtu.be/dQw4w9WgXcQ")).toBe("youtube");
  });

  it("detects Instagram Reels", () => {
    expect(detectPlatform("https://www.instagram.com/reel/Cxyz123/")).toBe("instagram");
  });

  it("detects Instagram Posts and TV", () => {
    expect(detectPlatform("https://instagram.com/p/Cxyz123")).toBe("instagram");
    expect(detectPlatform("https://instagram.com/tv/Cxyz123")).toBe("instagram");
  });

  it("returns unsupported for unknown domains or invalid URLs", () => {
    expect(detectPlatform("https://twitter.com/user/status/123")).toBe("unsupported");
    expect(detectPlatform("invalid-string")).toBe("unsupported");
  });
});
