import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { validateMediaUrl } from "@/lib/url-validator";
import { createDownloadJob } from "@/lib/jobs";
import { DownloadRequest } from "@/types/media";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const rateCheck = checkRateLimit(ip, "download");

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Download rate limit reached. Please wait a minute before submitting another job.",
        },
        { status: 429 }
      );
    }

    const body: DownloadRequest = await req.json();
    const { url, type, format, quality } = body;

    const validation = validateMediaUrl(url);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || "Invalid URL provided.",
        },
        { status: 400 }
      );
    }

    if (!type || !format || !quality) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required media format settings.",
        },
        { status: 400 }
      );
    }

    const jobId = createDownloadJob({ url, type, format, quality });

    return NextResponse.json({
      success: true,
      jobId,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't process this download request. Please try again later.",
      },
      { status: 500 }
    );
  }
}
