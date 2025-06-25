// app/api/gallery/route.ts
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

interface GalleryDocument {
  $id: string;
  title: string;
  description?: string;
  category: string;
  tags: string[];
  imageId: string;
  [key: string]: unknown;
}

const DEFAULT_PREVIEW_WIDTH = 800;
const DEFAULT_PREVIEW_HEIGHT = 600;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const { databases, storage } = await createAdminClient();

    if (id) {
      // Get single document
      const document = await databases.getDocument<GalleryDocument>(
        appwriteConfig.databaseId,
        appwriteConfig.collections.gallery,
        id
      );

      // Get file preview URL
      const imageUrl = storage.getFilePreview(
        appwriteConfig.buckets.gallery,
        document.imageId,
        DEFAULT_PREVIEW_WIDTH,
        DEFAULT_PREVIEW_HEIGHT
      );

      return NextResponse.json({
        ...document,
        imageUrl: imageUrl.href,
      });
    }

    // Get all documents
    const response = await databases.listDocuments<GalleryDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.gallery
    );

    // Enhance with image URLs
    const enhancedDocuments = await Promise.all(
      response.documents.map(async (doc) => {
        const imageUrl = storage.getFilePreview(
          appwriteConfig.buckets.gallery,
          doc.imageId,
          DEFAULT_PREVIEW_WIDTH,
          DEFAULT_PREVIEW_HEIGHT
        );
        return {
          ...doc,
          imageUrl: imageUrl.href,
        };
      })
    );

    return NextResponse.json(enhancedDocuments);
  } catch (error: unknown) {
    console.error("Gallery API Error:", error);
    const status =
      error instanceof Error && "code" in error ? Number(error.code) : 500;
    const message =
      error instanceof Error ? error.message : "Failed to fetch gallery items";

    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const { databases, storage } = await createAdminClient();
    const formData = await request.formData();

    // Extract and validate form data
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const category = formData.get("category")?.toString();
    const tags = formData.getAll("tags").map((tag) => tag.toString());
    const file = formData.get("file") as File | null;

    if (!file || !title || !category) {
      return NextResponse.json(
        { error: "Missing required fields (file, title, category)" },
        { status: 400 }
      );
    }

    // Upload file to storage
    const fileId = ID.unique();
    await storage.createFile(appwriteConfig.buckets.gallery, fileId, file);

    // Create document in database
    const document = await databases.createDocument<GalleryDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.gallery,
      ID.unique(),
      {
        title,
        description: description || "",
        category,
        tags: tags || [],
        imageId: fileId,
      }
    );

    return NextResponse.json(document, { status: 201 });
  } catch (error: unknown) {
    console.error("Gallery Upload Error:", error);
    const status =
      error instanceof Error && "code" in error ? Number(error.code) : 500;
    const message =
      error instanceof Error ? error.message : "Failed to upload gallery item";

    return NextResponse.json({ error: message }, { status });
  }
}

export async function PATCH(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    const { databases, storage } = await createAdminClient();
    const formData = await request.formData();

    // Get existing document
    const existingDoc = await databases.getDocument<GalleryDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.gallery,
      id
    );

    // Prepare update data
    const updateData: Partial<GalleryDocument> = {
      title: formData.get("title")?.toString() || existingDoc.title,
      description:
        formData.get("description")?.toString() || existingDoc.description,
      category: formData.get("category")?.toString() || existingDoc.category,
      tags:
        formData.getAll("tags").map((tag) => tag.toString()) ||
        existingDoc.tags,
    };

    // Handle file update if provided
    const file = formData.get("file") as File | null;
    if (file) {
      try {
        // Delete old file
        await storage.deleteFile(
          appwriteConfig.buckets.gallery,
          existingDoc.imageId
        );
      } catch (deleteError) {
        console.warn("Failed to delete old file:", deleteError);
      }

      // Upload new file
      const newFileId = ID.unique();
      await storage.createFile(appwriteConfig.buckets.gallery, newFileId, file);
      updateData.imageId = newFileId;
    }

    // Update document
    const updatedDoc = await databases.updateDocument<GalleryDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.gallery,
      id,
      updateData
    );

    return NextResponse.json(updatedDoc);
  } catch (error: unknown) {
    console.error("Gallery Update Error:", error);
    const status =
      error instanceof Error && "code" in error ? Number(error.code) : 500;
    const message =
      error instanceof Error ? error.message : "Failed to update gallery item";

    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Document ID is required" },
        { status: 400 }
      );
    }

    const { databases, storage } = await createAdminClient();

    // Get document first to delete associated file
    const document = await databases.getDocument<GalleryDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.gallery,
      id
    );

    try {
      // Delete file from storage
      await storage.deleteFile(
        appwriteConfig.buckets.gallery,
        document.imageId
      );
    } catch (deleteError) {
      console.warn("Failed to delete file:", deleteError);
    }

    // Delete document
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.gallery,
      id
    );

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error("Gallery Delete Error:", error);
    const status =
      error instanceof Error && "code" in error ? Number(error.code) : 500;
    const message =
      error instanceof Error ? error.message : "Failed to delete gallery item";

    return NextResponse.json({ error: message }, { status });
  }
}
