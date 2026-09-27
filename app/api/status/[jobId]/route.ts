import { NextRequest, NextResponse } from "next/server";
import { getJobStatus } from "@/lib/jobs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { success: false, error: "Job ID is required" },
        { status: 400 }
      );
    }

    const status = getJobStatus(jobId);

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Job not found or expired" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      ...status,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch job status" },
      { status: 500 }
    );
  }
}
