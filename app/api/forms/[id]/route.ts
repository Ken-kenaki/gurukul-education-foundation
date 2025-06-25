import { NextRequest, NextResponse } from "next/server";
import { DatabaseService } from "@/lib/appwrite/database";

type FormStatus = "pending" | "responded";

interface FormSubmissionData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status?: FormStatus;
  createdAt?: Date | string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const data = await request.json();

    if (!params.id || typeof params.id !== "string") {
      return NextResponse.json(
        { error: "Invalid form submission ID" },
        { status: 400 }
      );
    }

    if (data.status && !["pending", "responded"].includes(data.status)) {
      return NextResponse.json(
        { error: "Status must be either 'pending' or 'responded'" },
        { status: 400 }
      );
    }

    const form = await DatabaseService.updateFormSubmission(params.id, data);
    return NextResponse.json(form, { status: 200 });
  } catch (error: unknown) {
    console.error(`Error updating form submission ${params.id}:`, error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to update form submission", details: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    if (!params.id || typeof params.id !== "string") {
      return NextResponse.json(
        { error: "Invalid form submission ID" },
        { status: 400 }
      );
    }

    await DatabaseService.deleteFormSubmission(params.id);
    return NextResponse.json(
      { success: true, message: "Form submission deleted successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(`Error deleting form submission ${params.id}:`, error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        error: "Failed to delete form submission",
        details: errorMessage,
        submissionId: params.id,
      },
      { status: 500 }
    );
  }
}

export type FormSubmissionResponse = FormSubmissionData & {
  id: string;
  createdAt: string;
};
