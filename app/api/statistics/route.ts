import { DatabaseService } from "@/lib/appwrite/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stats = await DatabaseService.getAllStatistics();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const { name, count } = await request.json();

    // Validate input
    if (!name || typeof count !== "number") {
      return NextResponse.json(
        { error: "Invalid input: name and count are required" },
        { status: 400 }
      );
    }

    const existingStat = await DatabaseService.getStatistic(name);

    if (!existingStat) {
      return NextResponse.json(
        { error: "Statistic not found" },
        { status: 404 }
      );
    }

    const updated = await DatabaseService.updateStatistic(
      existingStat.$id,
      count
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error: any) {
    console.error("Error updating statistic:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update statistic" },
      { status: 500 }
    );
  }
}
