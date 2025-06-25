// app/api/forms/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;
const MAX_LIMIT = 100;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit") ?? DEFAULT_LIMIT.toString();
    const limit =
      Math.min(parseInt(limitParam, 10), MAX_LIMIT) || DEFAULT_LIMIT;

    const offsetParam = searchParams.get("offset") ?? DEFAULT_OFFSET.toString();
    const offset = parseInt(offsetParam, 10) || DEFAULT_OFFSET;

    if (Number.isNaN(limit) || Number.isNaN(offset)) {
      return NextResponse.json(
        { error: "Invalid limit or offset parameters" },
        { status: 400 }
      );
    }

    const forms = await DatabaseService.getFormSubmissions(limit, offset);
    return NextResponse.json(forms);
  } catch (error: unknown) {
    console.error("Forms API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to fetch form submissions",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");
    if (contentType !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 415 }
      );
    }

    const data = await request.json();

    if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "Form data is required" },
        { status: 400 }
      );
    }

    const form = await DatabaseService.createFormSubmission(data);
    return NextResponse.json(form, { status: 201 });
  } catch (error: unknown) {
    console.error("Create Form Submission Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to create form submission",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
