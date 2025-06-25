import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

interface UniversityDocument {
  $id: string;
  name: string;
  country: string;
  intake: string;
  programs: string;
  ranking: string;
  description: string;
  imageId?: string;
  createdAt: string;
  [key: string]: unknown;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const { databases, storage } = await createAdminClient();

    const response = await databases.listDocuments<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      []
    );

    // Enhance with image URLs
    const enhancedDocuments = response.documents.map((doc) => ({
      ...doc,
      imageUrl: doc.imageId
        ? storage.getFilePreview(
            appwriteConfig.buckets.universities,
            doc.imageId,
            400,
            300
          ).href
        : null,
    }));

    return NextResponse.json({
      documents: enhancedDocuments,
      total: response.total,
    });
  } catch (error: unknown) {
    console.error(
      "Universities API Error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        error: "Failed to fetch universities",
        details: error instanceof Error ? error.message : "Unknown error",
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
    const country = formData.get("country")?.toString() ?? "";
    const intake = formData.get("intake")?.toString() ?? "";
    const programs = formData.get("programs")?.toString() ?? "";
    const ranking = formData.get("ranking")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";
    const file = formData.get("file") as File | null;

    if (!name || !country || !intake) {
      return NextResponse.json(
        { error: "Name, country, and intake are required" },
        { status: 400 }
      );
    }

    let imageId: string | undefined;
    if (file) {
      const fileId = ID.unique();
      await storage.createFile(
        appwriteConfig.buckets.universities,
        fileId,
        file
      );
      imageId = fileId;
    }

    const university = await databases.createDocument<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      ID.unique(),
      {
        name,
        country,
        intake,
        programs,
        ranking,
        description,
        imageId,
        createdAt: new Date().toISOString(),
      }
    );

    return NextResponse.json(university, { status: 201 });
  } catch (error: unknown) {
    console.error(
      "Create University Error:",
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      {
        error: "Failed to create university",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
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

    const existingDoc = await databases.getDocument<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    const name = formData.get("name")?.toString();
    const country = formData.get("country")?.toString();
    const intake = formData.get("intake")?.toString();
    const programs = formData.get("programs")?.toString();
    const ranking = formData.get("ranking")?.toString();
    const description = formData.get("description")?.toString();
    const file = formData.get("file") as File | null;

    const updateData: Partial<UniversityDocument> = {
      name: name || existingDoc.name,
      country: country || existingDoc.country,
      intake: intake || existingDoc.intake,
      programs: programs || existingDoc.programs,
      ranking: ranking || existingDoc.ranking,
      description: description || existingDoc.description,
    };

    if (file) {
      if (existingDoc.imageId) {
        try {
          await storage.deleteFile(
            appwriteConfig.buckets.universities,
            existingDoc.imageId
          );
        } catch (error) {
          console.warn(
            "Old file not found or already deleted:",
            error instanceof Error ? error.message : "Unknown error"
          );
        }
      }

      const newFileId = ID.unique();
      await storage.createFile(
        appwriteConfig.buckets.universities,
        newFileId,
        file
      );
      updateData.imageId = newFileId;
    }

    const university = await databases.updateDocument<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id,
      updateData
    );

    return NextResponse.json(university);
  } catch (error: unknown) {
    console.error(
      "Update University Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      {
        error: "Failed to update university",
        details: error instanceof Error ? error.message : "Unknown error",
      },
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

    const document = await databases.getDocument<UniversityDocument>(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    if (document.imageId) {
      try {
        await storage.deleteFile(
          appwriteConfig.buckets.universities,
          document.imageId
        );
      } catch (error) {
        console.warn(
          "File not found or already deleted:",
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      params.id
    );

    return new NextResponse(null, { status: 204 });
  } catch (error: unknown) {
    console.error(
      "Delete University Error:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      {
        error: "Failed to delete university",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
