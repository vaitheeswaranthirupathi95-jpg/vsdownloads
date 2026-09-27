import fs from "fs";
import path from "path";
import os from "os";

const TTL_MINUTES = parseInt(process.env.TEMP_FILE_TTL_MINUTES || "15", 10);
const TTL_MS = TTL_MINUTES * 60 * 1000;

export function getTempBaseDir(): string {
  // Use OS temp dir or fallback local temp dir
  const base = process.env.TEMP_DIR || path.join(os.tmpdir(), "media-downloads");
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true });
  }
  return base;
}

export function getJobTempDir(jobId: string): string {
  // Sanitize jobId to prevent directory traversal
  const safeJobId = jobId.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeJobId) {
    throw new Error("Invalid jobId for temp directory");
  }

  const base = getTempBaseDir();
  const jobDir = path.join(base, safeJobId);

  // Ensure path is within base
  const resolved = path.resolve(jobDir);
  if (!resolved.startsWith(path.resolve(base))) {
    throw new Error("Directory traversal attempt detected");
  }

  if (!fs.existsSync(resolved)) {
    fs.mkdirSync(resolved, { recursive: true });
  }

  return resolved;
}

export function cleanupJobDir(jobId: string): void {
  try {
    const jobDir = getJobTempDir(jobId);
    if (fs.existsSync(jobDir)) {
      fs.rmSync(jobDir, { recursive: true, force: true });
    }
  } catch (err) {
    console.error(`Failed to cleanup job dir for ${jobId}:`, err);
  }
}

export function cleanupExpiredTempFiles(): void {
  try {
    const base = getTempBaseDir();
    if (!fs.existsSync(base)) return;

    const items = fs.readdirSync(base);
    const now = Date.now();

    for (const item of items) {
      const itemPath = path.join(base, item);
      try {
        const stats = fs.statSync(itemPath);
        const age = now - stats.mtimeMs;
        if (age > TTL_MS) {
          fs.rmSync(itemPath, { recursive: true, force: true });
          console.log(`Cleaned up expired temp folder: ${item}`);
        }
      } catch (e) {
        console.error(`Error checking stats for ${itemPath}:`, e);
      }
    }
  } catch (err) {
    console.error("Error during temp cleanup run:", err);
  }
}
