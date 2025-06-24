import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { ID } from "node-appwrite";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { databases, storage } = await createAdminClient();
    
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      []
    );

    // Enhance with image URLs
    const enhancedDocuments = response.documents.map((doc: any) => ({
      ...doc,
      imageUrl: doc.imageId 
        ? storage.getFilePreview(appwriteConfig.buckets.universities, doc.imageId, 400, 300).href
        : null
    }));

    return NextResponse.json({ documents: enhancedDocuments, total: response.total });
  } catch (error: any) {
    console.error("Universities API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch universities", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { databases, storage } = await createAdminClient();
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const country = formData.get('country') as string;
    const intake = formData.get('intake') as string;
    const programs = formData.get('programs') as string;
    const ranking = formData.get('ranking') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;

    if (!name || !country || !intake) {
      return NextResponse.json(
        { error: "Name, country, and intake are required" },
        { status: 400 }
      );
    }

    let imageId = null;
    if (file) {
      const fileId = ID.unique();
      await storage.createFile(appwriteConfig.buckets.universities, fileId, file);
      imageId = fileId;
    }

    const university = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.universities,
      ID.unique(),
      {
        name,
        country,
        intake,
        programs: programs || '',
        ranking: ranking || '',
        description: description || '',
        imageId,
        createdAt: new Date().toISOString(),
      }
    );

    return NextResponse.json(university, { status: 201 });
  } catch (error: any) {
    console.error("Create University Error:", error);
    return NextResponse.json(
      { error: "Failed to create university", details: error.message },
      { status: 500 }
    );
  }
}