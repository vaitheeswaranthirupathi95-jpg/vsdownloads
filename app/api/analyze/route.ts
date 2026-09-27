import { NextRequest, NextResponse } from "next/server";
import { extractMetadata } from "@/lib/media";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const rateCheck = checkRateLimit(ip, "analyze");

    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Rate limit exceeded. Please wait a minute before analyzing another URL.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid supported URL.",
        },
        { status: 400 }
      );
    }

    const result = await extractMetadata(url);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "We couldn't process this media. Please try again later.",
      },
      { status: 500 }
    );
  }
}
