import { DatabaseService } from "@/lib/appwrite/database";
import { StorageService } from "@/lib/appwrite/storage";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

export async function GET() {
  try {
    const { documents } = await DatabaseService.getResources();

    // Convert to plain objects
    const resources = documents.map((doc) => ({
      id: doc.$id,
      name: doc.name,
      description: doc.description,
      type: doc.type,
      size: doc.size,
      fileId: doc.fileId,
      createdAt: doc.createdAt,
    }));

    return NextResponse.json(resources);
  } catch (error) {
    console.error("Failed to fetch resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// app/api/resources/route.ts
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as unknown as File;
    const name = formData.get("name") as string;
    const description = (formData.get("description") as string) || "";
    const type =
      (formData.get("type") as string) || file.type.split("/")[0] || "file";

    if (!file || !name) {
      return NextResponse.json(
        { error: "File and name are required" },
        { status: 400 }
      );
    }

    // Upload file
    const uploadedFile = await StorageService.uploadFile(
      appwriteConfig.buckets.resources,
      file
    );

    // Create resource with only allowed attributes
    const resource = await DatabaseService.createResource({
      name,
      description,
      type,
      size: file.size,
      fileId: uploadedFile.$id,
      // Add any other attributes your collection expects
      // Remove any attributes not in your collection schema
    });

    return NextResponse.json({
      id: resource.$id,
      name: resource.name,
      description: resource.description,
      type: resource.type,
      size: resource.size,
      fileId: resource.fileId,
      createdAt: resource.createdAt,
    });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      {
        error: "Failed to create resource",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
