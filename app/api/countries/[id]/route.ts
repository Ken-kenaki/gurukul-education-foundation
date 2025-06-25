// app/api/countries/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

interface CountryData {
  [key: string]: unknown; // Replace with your actual country data structure
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const data = (await request.json()) as CountryData;
    const country = await DatabaseService.updateCountry(params.id, data);
    return NextResponse.json(country);
  } catch (error: unknown) {
    console.error("Update country error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to update country",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await DatabaseService.deleteCountry(params.id);
    return NextResponse.json(
      { message: "Country deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Delete country error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to delete country",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
