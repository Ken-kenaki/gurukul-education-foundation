import { appwriteConfig } from "@/lib/appwrite/config";
import { createAdminClient } from "@/lib/server/appwrite";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { databases } = await createAdminClient();

        // Use the IDs from your config
        const databaseId = appwriteConfig.databaseId;
        const collectionId = appwriteConfig.collections.gallery; // This is the ID "6859941e001999cd38d3"

        console.log(`Fetching from database ${databaseId}, collection ${collectionId}`);

        const response = await databases.listDocuments(databaseId, collectionId);

        console.log(`Found ${response.total} items`);
        return NextResponse.json(response.documents);

    } catch (error: any) {
        console.error("API Error:", {
            message: error.message,
            code: error.code,
            type: error.type
        });

        return NextResponse.json(
            {
                error: "Failed to fetch gallery",
                details: error.message
            },
            { status: error.code || 500 }
        );
    }
}