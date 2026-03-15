import { NextRequest, NextResponse } from "next/server";
import { validateLicense } from "@/lib/license";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { valid: false, error: "Missing license key" },
        { status: 400 }
      );
    }

    const result = await validateLicense(key);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { valid: false, error: "Validation failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { valid: false, error: "Missing license key" },
      { status: 400 }
    );
  }

  const result = await validateLicense(key);
  return NextResponse.json(result);
}
