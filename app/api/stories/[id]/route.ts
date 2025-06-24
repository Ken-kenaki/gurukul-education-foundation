import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
  try {
    const { databases } = await createAdminClient();
    const story = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.stories,
        params.id
    );
    return NextResponse.json(story);
  } catch (error: any) {
    return NextResponse.json(
        { error: "Story not found", details: error.message },
        { status: 404 }
    );
  }
}

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
        appwriteConfig.collections.stories,
        params.id
    );

    const name = formData.get('name') as string;
    const program = formData.get('program') as string;
    const university = formData.get('university') as string;
    const content = formData.get('content') as string;
    const rating = formData.get('rating') as string;
    const status = formData.get('status') as string;
    const file = formData.get('file') as File | null;

    const updateData: any = {
      name: name || existingDoc.name,
      program: program || existingDoc.program,
      university: university || existingDoc.university,
      content: content || existingDoc.content,
      rating: rating ? parseInt(rating) : existingDoc.rating,
      status: status || existingDoc.status,
      updatedAt: new Date().toISOString(),
    };

    // Handle file update if provided
    if (file) {
      // Delete old file if exists
      if (existingDoc.imageId) {
        try {
          await storage.deleteFile(appwriteConfig.buckets.testimonials, existingDoc.imageId);
        } catch (error) {
          console.log("Old file not found or already deleted");
        }
      }

      // Upload new file
      const newFileId = ID.unique();
      await storage.createFile(appwriteConfig.buckets.testimonials, newFileId, file);
      updateData.imageId = newFileId;
    }

    const story = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.stories,
        params.id,
        updateData
    );

    return NextResponse.json(story);
  } catch (error: any) {
    console.error("Update Story Error:", error);
    return NextResponse.json(
        { error: "Failed to update story", details: error.message },
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
        appwriteConfig.collections.stories,
        params.id
    );

    // Delete file from storage if exists
    if (document.imageId) {
      try {
        await storage.deleteFile(appwriteConfig.buckets.testimonials, document.imageId);
      } catch (error) {
        console.log("File not found or already deleted");
      }
    }

    // Delete document
    await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.stories,
        params.id
    );

    return NextResponse.json({ message: "Story deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
        { error: "Failed to delete story", details: error.message },
        { status: 500 }
    );
  }
}