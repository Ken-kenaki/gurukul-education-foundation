import { DatabaseService } from "@/lib/appwrite/database";
import { StorageService } from "@/lib/appwrite/storage";
import { NextResponse } from "next/server";
import { appwriteConfig } from "@/lib/appwrite/config";

export async function GET() {
  try {
    const resources = await DatabaseService.getResources();
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!file || !name) {
      return NextResponse.json(
        { error: "File and name are required" },
        { status: 400 }
      );
    }

    // Upload file to storage
    const uploadedFile = await StorageService.uploadFile(
      appwriteConfig.buckets.resources,
      file
    );

    // Create resource record in database
    const resource = await DatabaseService.createResource({
      fileId: uploadedFile.$id,
      name,
      description,
      type: file.type,
      size: file.size,
    });

    return NextResponse.json(resource);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create resource" },
      { status: 500 }
    );
  }
}
