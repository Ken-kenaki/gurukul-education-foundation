import { DatabaseService } from "@/lib/appwrite/database";
import { NextResponse } from "next/server";
import { appwriteConfig } from "@/lib/appwrite/config";
import { StorageService } from "@/lib/appwrite/storage";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { databases } = await DatabaseService.getClient();
    const member = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.teams,
      params.id
    );

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    // Get image URL
    let imageUrl = "";
    if (member.imageId) {
      const image = await StorageService.getFilePreview(
        appwriteConfig.buckets.teams,
        member.imageId,
        500,
        500
      );
      imageUrl = image.href;
    }

    // Parse JSON fields
    let socialLinks = [];
    let skills = [];
    try {
      socialLinks = member.socialLinks ? JSON.parse(member.socialLinks) : [];
      skills = member.skills ? JSON.parse(member.skills) : [];
    } catch (e) {
      console.error("Error parsing JSON fields", e);
    }

    return NextResponse.json({
      ...member,
      imageUrl,
      socialLinks,
      skills,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team member" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();

    // Extract fields
    const name = formData.get("name") as string;
    const position = formData.get("position") as string;
    const description = formData.get("description") as string;
    const bio = formData.get("bio") as string;
    const imageFile = formData.get("image") as File | null;
    const socialLinks = formData.get("socialLinks") as string;
    const skills = formData.get("skills") as string;

    // Handle image update
    let imageId = undefined;
    if (imageFile) {
      // First delete old image if exists
      const existingMember =
        await DatabaseService.getClient().databases.getDocument(
          appwriteConfig.databaseId,
          appwriteConfig.collections.teams,
          params.id
        );

      if (existingMember.imageId) {
        await StorageService.deleteFile(
          appwriteConfig.buckets.teams,
          existingMember.imageId
        );
      }

      // Upload new image
      const imageResponse = await StorageService.uploadFile(
        appwriteConfig.buckets.teams,
        imageFile
      );
      imageId = imageResponse.$id;
    }

    // Update document
    const { databases } = await DatabaseService.getClient();
    const updatedMember = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.teams,
      params.id,
      {
        name,
        position,
        description,
        bio,
        ...(imageId && { imageId }), // Only include if new image was uploaded
        socialLinks,
        skills,
      }
    );

    return NextResponse.json(updatedMember);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update team member" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { databases } = await DatabaseService.getClient();

    // First get the member to check for image
    const member = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.teams,
      params.id
    );

    // Delete image if exists
    if (member.imageId) {
      await StorageService.deleteFile(
        appwriteConfig.buckets.teams,
        member.imageId
      );
    }

    // Delete document
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.teams,
      params.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
