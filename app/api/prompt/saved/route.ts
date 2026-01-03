import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectedToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/Prompt";
import { authOptions } from "../../auth/config";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectedToDB();
    
    const user = await User.findById(session.user.id)
      .select("bookmarks")
      .populate({
        path: "bookmarks",
        populate: {
          path: "creator",
          select: "name username email image",
        },
      });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Filter out any null bookmarks (in case prompt was deleted)
    const savedPrompts = user.bookmarks.filter((prompt:any) => prompt !== null);

    return NextResponse.json(savedPrompts, { status: 200 });
  } catch (error) {
    console.error("Error fetching saved prompts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}