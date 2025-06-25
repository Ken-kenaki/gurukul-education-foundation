import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";
import { NewsEvent } from "@/types/news-event";

const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;
const MAX_LIMIT = 100;

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? DEFAULT_LIMIT.toString(), 10),
      MAX_LIMIT
    );
    const offset = parseInt(
      searchParams.get("offset") ?? DEFAULT_OFFSET.toString(),
      10
    );

    if (isNaN(limit) || isNaN(offset)) {
      return NextResponse.json(
        { error: "Limit and offset must be valid numbers" },
        { status: 400 }
      );
    }

    const newsEvents = await DatabaseService.getNewsEvents(limit, offset);
    return NextResponse.json(newsEvents);
  } catch (error: unknown) {
    console.error("GET News Events Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch news events";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const contentType = request.headers.get("content-type");
    if (contentType !== "application/json") {
      return NextResponse.json(
        { error: "Invalid content type. Expected application/json" },
        { status: 415 }
      );
    }

    const data = (await request.json()) as Partial<NewsEvent>;

    // Validate required fields
    const requiredFields: (keyof NewsEvent)[] = [
      "title",
      "type",
      "content",
      "date",
      "status",
    ];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          missingFields,
        },
        { status: 400 }
      );
    }

    // Validate field types
    if (typeof data.title !== "string" || data.title.trim() === "") {
      return NextResponse.json(
        { error: "Title must be a non-empty string" },
        { status: 400 }
      );
    }

    if (!["news", "event"].includes(data.type as string)) {
      return NextResponse.json(
        { error: "Type must be either 'news' or 'event'" },
        { status: 400 }
      );
    }

    if (typeof data.content !== "string" || data.content.trim() === "") {
      return NextResponse.json(
        { error: "Content must be a non-empty string" },
        { status: 400 }
      );
    }

    if (isNaN(Date.parse(data.date as string))) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    if (!["draft", "published"].includes(data.status as string)) {
      return NextResponse.json(
        { error: "Status must be either 'draft' or 'published'" },
        { status: 400 }
      );
    }

    const newsEvent = await DatabaseService.createNewsEvent(data as NewsEvent);
    return NextResponse.json(newsEvent, { status: 201 });
  } catch (error: unknown) {
    console.error("POST News Event Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create news event";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
