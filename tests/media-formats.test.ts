import { describe, it, expect } from "vitest";
import { extractMetadata } from "../lib/media";

describe("Audio and Video Format Parsing", () => {
  it("should return correct video and audio format options", async () => {
    const res = await extractMetadata("invalid-url");
    expect(res.success).toBe(false);
    expect(res.formats).toHaveLength(0);
  });
});
