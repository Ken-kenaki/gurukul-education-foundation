import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const { account } = await createAdminClient();

    // Create email password session
    const session = await account.createEmailPasswordSession(email, password);

    // Set session cookie
    const cookieStore = cookies();
    cookieStore.set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("Login error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Login failed. Please check your credentials.";
    return NextResponse.json({ error: errorMessage }, { status: 401 });
  }
}
