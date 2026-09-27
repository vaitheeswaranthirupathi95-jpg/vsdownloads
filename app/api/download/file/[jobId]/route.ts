import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getJobStatus } from "@/lib/jobs";
import { getJobTempDir } from "@/lib/cleanup";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    const status = getJobStatus(jobId);
    if (!status || status.status !== "completed" || !status.fileName) {
      return NextResponse.json(
        { error: "File not ready or expired." },
        { status: 404 }
      );
    }

    const jobDir = getJobTempDir(jobId);
    const filePath = path.join(jobDir, status.fileName);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File has been cleaned up or deleted." },
        { status: 404 }
      );
    }

    const fileStream = fs.createReadStream(filePath);
    const stats = fs.statSync(filePath);

    const isMp3 = status.fileName.endsWith(".mp3");
    const contentType = isMp3 ? "audio/mpeg" : "video/mp4";

    // Convert Stream to Web ReadableStream
    const readableWebStream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(readableWebStream, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": stats.size.toString(),
        "Content-Disposition": `attachment; filename="${status.fileName}"`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to download media file." },
      { status: 500 }
    );
  }
}
