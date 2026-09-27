import { describe, it, expect } from "vitest";
import { validateMediaUrl } from "../lib/url-validator";

describe("URL Validator Module", () => {
  it("validates legitimate YouTube URLs", () => {
    const res = validateMediaUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    expect(res.valid).toBe(true);
    expect(res.platform).toBe("youtube");
  });

  it("rejects empty or whitespace input", () => {
    const res = validateMediaUrl("   ");
    expect(res.valid).toBe(false);
    expect(res.error).toBe("Please enter a valid media URL.");
  });

  it("rejects unsafe or SSRF URLs", () => {
    const res = validateMediaUrl("http://127.0.0.1:8080/video");
    expect(res.valid).toBe(false);
    expect(res.error).toContain("blocked");
  });

  it("rejects unsupported platforms", () => {
    const res = validateMediaUrl("https://example.com/video.mp4");
    expect(res.valid).toBe(false);
    expect(res.error).toBe("This URL is currently unsupported.");
  });
});
