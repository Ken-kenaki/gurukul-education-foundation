import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID, Query } from "node-appwrite";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const { databases, storage } = await createAdminClient();

    // ✅ Use correct query builder
    const queries = status ? [Query.equal("status", status)] : [];

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.stories,
      queries
    );

    const enhancedDocuments = await Promise.all(
      response.documents.map(async (doc: any) => {
        try {
          let imageUrl = null;
          if (doc.imageId) {
            try {
              imageUrl = storage.getFilePreview(
                appwriteConfig.buckets.stories,
                doc.imageId,
                200,
                200
              ).href;
            } catch (fileError) {
              console.warn(
                `Failed to get preview for image ${doc.imageId}:`,
                fileError
              );
            }
          }
          return {
            ...doc,
            imageUrl,
          };
        } catch (docError) {
          console.error(`Error processing document ${doc.$id}:`, docError);
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
  } catch (error: any) {
    console.error("GET /api/stories Error:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch stories",
        details: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { databases, storage } = await createAdminClient();
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const program = formData.get("program") as string;
    const university = formData.get("university") as string;
    const content = formData.get("content") as string;
    const rating = parseInt(formData.get("rating") as string);
    const status = (formData.get("status") as string) || "pending";
    const file = formData.get("file") as File | null;

    if (!name || !program || !university || !content || !rating) {
      return NextResponse.json(
        {
          error: "Name, program, university, content, and rating are required",
        },
        { status: 400 }
      );
    }

    let imageId = null;
    if (file) {
      const fileId = ID.unique();
      await storage.createFile(appwriteConfig.buckets.stories, fileId, file);
      imageId = fileId;
    }

    const story = await databases.createDocument(
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
  } catch (error: any) {
    console.error("Create Story Error:", error);
    return NextResponse.json(
      { error: "Failed to create story", details: error.message },
      { status: 500 }
    );
  }
}
