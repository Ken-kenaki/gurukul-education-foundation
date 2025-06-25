// src/app/api/auth/signout/route.ts
import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/server/appwrite";

export async function POST(request: Request) {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");

    const response = NextResponse.redirect(new URL("/signup", request.url));
    response.cookies.delete("my-custom-session");

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 });
  }
}
