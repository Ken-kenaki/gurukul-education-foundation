import { DatabaseService } from "@/lib/appwrite/database";
import { NextResponse } from "next/server";
import { appwriteConfig } from "@/lib/appwrite/config";
import { StorageService } from "@/lib/appwrite/storage";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { databases } = await DatabaseService.getClient();

    // 1. First try to get the resource
    let resource;
    try {
      resource = await databases.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.resources,
        params.id
      );
    } catch (err) {
      console.error("Error fetching resource:", err);
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // 2. Delete associated file if exists
    if (resource.fileId) {
      try {
        await StorageService.deleteFile(
          appwriteConfig.buckets.resources,
          resource.fileId
        );
        console.log("Successfully deleted file:", resource.fileId);
      } catch (fileErr) {
        console.error("Error deleting file (continuing anyway):", fileErr);
        // Continue with document deletion even if file deletion fails
      }
    }

    // 3. Delete the document
    try {
      await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.collections.resources,
        params.id
      );
      return NextResponse.json({ success: true });
    } catch (docErr) {
      console.error("Error deleting document:", docErr);
      throw docErr;
    }
  } catch (error) {
    console.error("Failed to delete resource:", error);
    return NextResponse.json(
      {
        error: "Failed to delete resource",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
