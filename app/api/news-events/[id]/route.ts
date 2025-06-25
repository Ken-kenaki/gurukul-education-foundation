import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";
import { NewsEvent } from "@/types/news-event";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Missing news event ID" },
        { status: 400 }
      );
    }

    const data = (await request.json()) as Partial<NewsEvent>;

    // Validate fields if provided
    if (data.type && !["news", "event"].includes(data.type)) {
      return NextResponse.json(
        { error: "Type must be either 'news' or 'event'" },
        { status: 400 }
      );
    }

    if (data.status && !["draft", "published"].includes(data.status)) {
      return NextResponse.json(
        { error: "Status must be either 'draft' or 'published'" },
        { status: 400 }
      );
    }

    if (data.date && isNaN(Date.parse(data.date))) {
      return NextResponse.json(
        { error: "Invalid date format" },
        { status: 400 }
      );
    }

    const updatedEvent = await DatabaseService.updateNewsEvent(params.id, data);
    return NextResponse.json(updatedEvent);
  } catch (error: unknown) {
    console.error("PUT News Event Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update news event";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "Missing news event ID" },
        { status: 400 }
      );
    }

    await DatabaseService.deleteNewsEvent(params.id);
    return NextResponse.json(
      { success: true, message: "News event deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("DELETE News Event Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete news event";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
