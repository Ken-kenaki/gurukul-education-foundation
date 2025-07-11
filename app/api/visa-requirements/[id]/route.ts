import { NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const visaRequirement = await DatabaseService.getVisaRequirement(params.id);
    return NextResponse.json(visaRequirement);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch visa requirement" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const result = await DatabaseService.updateVisaRequirement(params.id, data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update visa requirement" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await DatabaseService.deleteVisaRequirement(params.id);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete visa requirement" },
      { status: 500 }
    );
  }
}
