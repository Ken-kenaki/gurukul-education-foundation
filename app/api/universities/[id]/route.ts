import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

interface UniversityDocument {
  $id: string;
  name: string;
  country: string;
  intake: string;
  programs: string;
  ranking: string;
  description: string;
  imageId?: string;
  [key: string]: unknown;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { databases, storage } = await createAdminClient();
    const formData = await request.formData();

    // Get existing document with type safety
    const existingDoc = await databases.getDocument<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    // Extract form data with proper null checks
    const name = formData.get("name")?.toString();
    const country = formData.get("country")?.toString();
    const intake = formData.get("intake")?.toString();
    const programs = formData.get("programs")?.toString();
    const ranking = formData.get("ranking")?.toString();
    const description = formData.get("description")?.toString();
    const file = formData.get("file") as File | null;

    // Prepare update data with proper typing
    const updateData: Partial<UniversityDocument> = {
      name: name || existingDoc.name,
      country: country || existingDoc.country,
      intake: intake || existingDoc.intake,
      programs: programs || existingDoc.programs,
      ranking: ranking || existingDoc.ranking,
      description: description || existingDoc.description,
    };

    // Handle file update if provided
    if (file) {
      // Delete old file if exists
      if (existingDoc.imageId) {
        try {
          await storage.deleteFile(
            appwriteConfig.buckets.universities,
            existingDoc.imageId
          );
        } catch (error) {
          console.warn(
            "Old file not found or already deleted:",
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      }

      // Upload new file
      const newFileId = ID.unique();
      await storage.createFile(
        appwriteConfig.buckets.universities,
        newFileId,
        file
      );
      updateData.imageId = newFileId;
    }

    const university = await databases.updateDocument<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id,
      updateData
    );

    return NextResponse.json(university);
  } catch (error: unknown) {
    console.error(
      "Update University Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      {
        error: "Failed to update university",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { error: "University ID is required" },
        { status: 400 }
      );
    }

    const { databases, storage } = await createAdminClient();

    // Get document first to delete associated file
    const document = await databases.getDocument<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    // Delete file from storage if exists
    if (document.imageId) {
      try {
        await storage.deleteFile(
          appwriteConfig.buckets.universities,
          document.imageId
        );
      } catch (error) {
        console.warn(
          "File not found or already deleted:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }

    // Delete document
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error(
      "Delete University Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      {
        error: "Failed to delete university",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
