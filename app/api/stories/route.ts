import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";

interface StoryDocument {
  $id: string;
  name: string;
  program: string;
  university: string;
  content: string;
  rating: number;
  status: string;
  imageId?: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const { databases, storage } = await createAdminClient();

    const queries = status ? [Query.equal("status", status)] : [];

    const response = await databases.listDocuments<StoryDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      queries
    );

    const enhancedDocuments = await Promise.all(
      response.documents.map(async (doc) => {
        try {
          let imageUrl = null;
          if (doc.imageId) {
            try {
              const preview = storage.getFilePreview(
                appwriteConfig.buckets.stories,
                doc.imageId,
                200,
                200
              );
              imageUrl = preview.href;
            } catch (fileError) {
              console.warn(
                `Failed to get preview for image ${doc.imageId}:`,
                fileError instanceof Error ? fileError.message : fileError
              );
            }
          }
          return {
            ...doc,
            imageUrl,
          };
        } catch (docError) {
          console.error(
            `Error processing document ${doc.$id}:`,
            docError instanceof Error ? docError.message : docError
          );
          return {
            ...doc,
            imageUrl: null,
          };
        }
      })
    );

    return NextResponse.json({
      documents: enhancedDocuments,
      total: response.total,
    });
  } catch (error: unknown) {
    console.error(
      "GET /api/stories Error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        error: "Failed to fetch stories",
        details: error instanceof Error ? error.message : "Unknown error",
        ...(process.env.NODE_ENV === "development" && {
          stack: error instanceof Error ? error.stack : undefined,
        }),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { databases, storage } = await createAdminClient();
    const formData = await request.formData();

    const name = formData.get("name")?.toString() ?? "";
    const program = formData.get("program")?.toString() ?? "";
    const university = formData.get("university")?.toString() ?? "";
    const content = formData.get("content")?.toString() ?? "";
    const rating = parseInt(formData.get("rating")?.toString() ?? "0", 10);
    const status = formData.get("status")?.toString() ?? "pending";
    const file = formData.get("file") as File | null;

    if (!name || !program || !university || !content || isNaN(rating)) {
      return NextResponse.json(
        {
          error: "Name, program, university, content, and rating are required",
        },
        { status: 400 }
      );
    }

    let imageId: string | undefined;
    if (file) {
      const fileId = ID.unique();
      await storage.createFile(appwriteConfig.buckets.stories, fileId, file);
      imageId = fileId;
    }

    const story = await databases.createDocument<StoryDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      ID.unique(),
      {
        name,
        program,
        university,
        content,
        rating,
        status,
        imageId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );

    return NextResponse.json(story, { status: 201 });
  } catch (error: unknown) {
    console.error(
      "Create Story Error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        error: "Failed to create story",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
