import { describe, it, expect } from "vitest";
import { isSafeUrl } from "../lib/security";

describe("Security URL Validation", () => {
  it("allows public HTTP/HTTPS URLs", () => {
    expect(isSafeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ").safe).toBe(true);
    expect(isSafeUrl("http://instagram.com/p/Cxyz123").safe).toBe(true);
  });

  it("blocks non-HTTP protocols", () => {
    expect(isSafeUrl("file:///etc/passwd").safe).toBe(false);
    expect(isSafeUrl("javascript:alert(1)").safe).toBe(false);
    expect(isSafeUrl("ftp://example.com/file").safe).toBe(false);
  });

  it("blocks localhost and loopback addresses", () => {
    expect(isSafeUrl("http://localhost:3000").safe).toBe(false);
    expect(isSafeUrl("http://127.0.0.1/admin").safe).toBe(false);
    expect(isSafeUrl("http://0.0.0.0").safe).toBe(false);
    expect(isSafeUrl("http://[::1]").safe).toBe(false);
  });

  it("blocks private IPv4 addresses (SSRF)", () => {
    expect(isSafeUrl("http://10.0.0.1").safe).toBe(false);
    expect(isSafeUrl("http://172.16.0.5").safe).toBe(false);
    expect(isSafeUrl("http://192.168.1.1").safe).toBe(false);
    expect(isSafeUrl("http://169.254.169.254").safe).toBe(false);
  });
});
