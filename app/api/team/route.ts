import { DatabaseService } from "@/lib/appwrite/database";
import { StorageService } from "@/lib/appwrite/storage";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";

export interface TeamMember {
  $id?: string;
  name: string;
  position: string;
  description: string;
  bio?: string;
  imageId?: string;
  socialLinks?: string; // Stored as JSON string
  skills?: string; // Stored as JSON string
  createdAt?: string;
}

export async function GET() {
  try {
    const { databases } = await DatabaseService.getClient();
    const teams = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collections.teams
    );

    // Get image URLs and parse social links
    const teamsWithImages = await Promise.all(
      teams.documents.map(async (member) => {
        let imageUrl = "";
        if (member.imageId) {
          const image = await StorageService.getFilePreview(
            appwriteConfig.buckets.teams,
            member.imageId,
            300,
            300
          );
          imageUrl = image.href;
        }

        // Parse JSON strings
        let socialLinks = [];
        let skills = [];
        try {
          socialLinks = member.socialLinks
            ? JSON.parse(member.socialLinks)
            : [];
          skills = member.skills ? JSON.parse(member.skills) : [];
        } catch (e) {
          console.error("Error parsing JSON fields", e);
        }

        return {
          ...member,
          imageUrl,
          socialLinks,
          skills,
        };
      })
    );

    return NextResponse.json(teamsWithImages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Validate required fields
    const requiredFields = ["name", "position", "description"];
    const missingFields = requiredFields.filter(
      (field) => !formData.get(field)
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Prepare data with stringified socialLinks and skills
    const data = {
      name: formData.get("name") as string,
      position: formData.get("position") as string,
      description: formData.get("description") as string,
      bio: (formData.get("bio") as string) || "",
      socialLinks: (formData.get("socialLinks") as string) || "[]", // Ensure it's a string
      skills: (formData.get("skills") as string) || "[]", // Ensure it's a string
    };

    // Validate string length
    if (data.socialLinks.length > 2000) {
      return NextResponse.json(
        { error: "socialLinks exceeds maximum length of 2000 characters" },
        { status: 400 }
      );
    }

    // Handle image upload
    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      const imageResponse = await StorageService.uploadFile(
        appwriteConfig.buckets.teams,
        imageFile
      );
      data.imageId = imageResponse.$id;
    }

    // Create document
    const { databases } = await DatabaseService.getClient();
    const teamMember = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collections.teams,
      ID.unique(),
      data
    );

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Error creating team member:", error);
    return NextResponse.json(
      { error: "Failed to create team member", details: String(error) },
      { status: 500 }
    );
  }
}
