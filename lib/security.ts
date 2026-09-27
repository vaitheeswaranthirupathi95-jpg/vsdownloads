export function normalizeUrl(urlString: string): string {
  if (!urlString || typeof urlString !== "string") return "";
  let trimmed = urlString.trim();
  if (!trimmed) return "";
  if (!trimmed.includes("://") && !/^[a-z0-9+-.]+:/i.test(trimmed)) {
    trimmed = "https://" + trimmed;
  }
  return trimmed;
}

/**
 * Validates URLs against SSRF, internal IP addresses, and disallowed schemes.
 */
export function isSafeUrl(urlString: string): { safe: boolean; reason?: string } {
  const normalized = normalizeUrl(urlString);
  if (!normalized) {
    return { safe: false, reason: "Invalid input URL." };
  }

  // Check scheme
  if (!normalized.startsWith("http://") && !normalized.startsWith("https://")) {
    return { safe: false, reason: "Only HTTP and HTTPS protocols are permitted." };
  }

  try {
    const parsed = new URL(normalized);

    // Hostname checks
    const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, "");

    if (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "0.0.0.0" ||
      hostname === "::1" ||
      hostname.endsWith(".local") ||
      hostname.endsWith(".internal")
    ) {
      return { safe: false, reason: "Local and internal loopback addresses are blocked." };
    }

    // Check private IP ranges
    const ipv4Regex = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = hostname.match(ipv4Regex);
    if (match) {
      const [, p1, p2] = match.map(Number);
      if (
        p1 === 10 ||
        (p1 === 172 && p2 >= 16 && p2 <= 31) ||
        (p1 === 192 && p2 === 168) ||
        (p1 === 169 && p2 === 254) ||
        p1 === 0 ||
        p1 === 127
      ) {
        return { safe: false, reason: "Private network IP addresses are blocked." };
      }
    }

    return { safe: true };
  } catch {
    return { safe: false, reason: "Malformed URL syntax." };
  }
}
