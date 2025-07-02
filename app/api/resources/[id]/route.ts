import { DatabaseService } from "@/lib/appwrite/database";
import { StorageService } from "@/lib/appwrite/storage";
import { NextResponse } from "next/server";
import { appwriteConfig } from "@/lib/appwrite/config";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resource = await DatabaseService.getResource(params.id);
    return NextResponse.json(resource);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // First get the resource to access the fileId
    const resource = await DatabaseService.getResource(params.id);

    // Delete the file from storage
    await StorageService.deleteFile(
      appwriteConfig.buckets.resources,
      resource.fileId
    );

    // Delete the resource record
    await DatabaseService.deleteResource(params.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
