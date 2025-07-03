// app/api/resources/download/[fileId]/route.ts

import { NextResponse } from "next/server";
import { StorageService } from "@/lib/appwrite/storage";
import { DatabaseService } from "@/lib/appwrite/database";
import { appwriteConfig } from "@/lib/appwrite/config";

export async function GET(
  request: Request,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;

    // Get resource by fileId
    const resource = await DatabaseService.getResourceByFileId(fileId);
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // Get file from Appwrite Storage
    const file = await StorageService.getFile(
      appwriteConfig.buckets.resources,
      fileId
    );

    // Get file download stream (this returns a stream in Appwrite server SDK)
    const client = await StorageService.getClient();
    const stream = await client.storage.getFileDownload(
      appwriteConfig.buckets.resources,
      fileId
    );

    const headers = new Headers({
      "Content-Type": file.mimeType,
      "Content-Disposition": `attachment; filename="${resource.name}"`,
    });

    return new NextResponse(stream, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
