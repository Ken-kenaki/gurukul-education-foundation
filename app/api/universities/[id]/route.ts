import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { databases, storage } = await createAdminClient();
    const formData = await request.formData();

    // Get existing document
    const existingDoc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    const name = formData.get('name') as string;
    const country = formData.get('country') as string;
    const intake = formData.get('intake') as string;
    const programs = formData.get('programs') as string;
    const ranking = formData.get('ranking') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;

    const updateData: any = {
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
          await storage.deleteFile(appwriteConfig.buckets.universities, existingDoc.imageId);
        } catch (error) {
          console.log("Old file not found or already deleted");
        }
      }

      // Upload new file
      const newFileId = ID.unique();
      await storage.createFile(appwriteConfig.buckets.universities, newFileId, file);
      updateData.imageId = newFileId;
    }

    const university = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id,
      updateData
    );

    return NextResponse.json(university);
  } catch (error: any) {
    console.error("Update University Error:", error);
    return NextResponse.json(
      { error: "Failed to update university", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { databases, storage } = await createAdminClient();

    // Get document first to delete associated file
    const document = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    // Delete file from storage if exists
    if (document.imageId) {
      try {
        await storage.deleteFile(appwriteConfig.buckets.universities, document.imageId);
      } catch (error) {
        console.log("File not found or already deleted");
      }
    }

    // Delete document
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    return NextResponse.json({ message: "University deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete university", details: error.message },
      { status: 500 }
    );
  }
}