// app/api/countries/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

const DEFAULT_LIMIT = 50;
const DEFAULT_OFFSET = 0;
const MAX_LIMIT = 100;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(
      parseInt(searchParams.get("limit") ?? DEFAULT_LIMIT.toString(), 10) ||
        DEFAULT_LIMIT,
      MAX_LIMIT
    );
    const offset =
      parseInt(searchParams.get("offset") ?? DEFAULT_OFFSET.toString(), 10) ||
      DEFAULT_OFFSET;

    if (Number.isNaN(limit) || Number.isNaN(offset)) {
      throw new Error("Invalid limit or offset parameters");
    }

    const countries = await DatabaseService.getCountries(limit, offset);
    return NextResponse.json(countries);
  } catch (error: unknown) {
    console.error("Countries API Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch countries", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data || typeof data !== "object") {
      throw new Error("Invalid country data");
    }

    const country = await DatabaseService.createCountry(data);
    return NextResponse.json(country, { status: 201 });
  } catch (error: unknown) {
    console.error("Create Country Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to create country", details: errorMessage },
      { status: 500 }
    );
  }
}
