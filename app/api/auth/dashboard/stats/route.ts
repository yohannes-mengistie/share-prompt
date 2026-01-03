import { NextRequest, NextResponse } from "next/server";
import { connectedToDB } from "@utils/database";
import { getServerSession } from "next-auth/next";
import Prompt from "@models/Prompt";
import User from "@models/user";
import { authOptions } from "../../[...nextauth]/route";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectedToDB();
    const userId = session.user.id;
    
    // Number of prompts created by the user
    const totalPrompts = await Prompt.countDocuments({ creator: userId });

    // Number of prompts shared publicly across all users
    const sharedPrompts = await Prompt.countDocuments({ isPublic: true });

    // Number of prompts the user has bookmarked/saved
    const user = await User.findById(userId).select('bookmarks');
    const savedPrompts = user?.bookmarks ? user.bookmarks.length : 0;

    return NextResponse.json(
      { totalPrompts, sharedPrompts, savedPrompts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}