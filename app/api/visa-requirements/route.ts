import { NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryName = searchParams.get("countryName");

  try {
    if (countryName) {
      const visaRequirements =
        await DatabaseService.getVisaRequirementsByCountryName(countryName);
      return NextResponse.json(visaRequirements);
    } else {
      const allRequirements = await DatabaseService.getAllVisaRequirements();
      return NextResponse.json(allRequirements);
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch visa requirements" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "countryName",
      "title",
      "requirements",
      "ctaText",
      "ctaLink",
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

    // Ensure requirements is an array
    if (!Array.isArray(data.requirements)) {
      return NextResponse.json(
        { error: "Requirements must be an array" },
        { status: 400 }
      );
    }

    // Create the document
    const result = await DatabaseService.createVisaRequirement({
      countryName: data.countryName,
      title: data.title,
      requirements: data.requirements,
      ctaText: data.ctaText,
      ctaLink: data.ctaLink,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("API Error:", {
      message: error.message,
      stack: error.stack,
      ...(error.response && { response: error.response }),
    });

    return NextResponse.json(
      {
        error: error.message || "Failed to create visa requirement",
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
      { status: 500 }
    );
  }
}
