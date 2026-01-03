import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectedToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/Prompt";
import { authOptions } from "../../../auth/config";
import { Types } from "mongoose";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectedToDB();
    
    const promptId = params.id;
    const userId = session.user.id;

    // Verify prompt exists
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    // Get user with bookmarks
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if already bookmarked
    const isBookmarked = user.bookmarks.some(
      (bookmarkId: Types.ObjectId) => bookmarkId.toString() === promptId
    );

    if (isBookmarked) {
      // Remove bookmark
      user.bookmarks = user.bookmarks.filter(
        (bookmarkId: Types.ObjectId) => bookmarkId.toString() !== promptId
      );
      await user.save();
      
      return NextResponse.json({ 
        success: true, 
        bookmarked: false,
        message: "Prompt removed from bookmarks" 
      });
    } else {
      // Add bookmark
      user.bookmarks.push(promptId);
      await user.save();
      
      return NextResponse.json({ 
        success: true, 
        bookmarked: true,
        message: "Prompt saved to bookmarks" 
      });
    }
  } catch (error) {
    console.error("Bookmark error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET endpoint to check if prompt is bookmarked
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ bookmarked: false });
    }

    await connectedToDB();
    
    const promptId = params.id;
    const userId = session.user.id;

    const user = await User.findById(userId).select("bookmarks");
    if (!user) {
      return NextResponse.json({ bookmarked: false });
    }

    const isBookmarked = user.bookmarks.some(
      (bookmarkId: Types.ObjectId) => bookmarkId.toString() === promptId
    );

    return NextResponse.json({ bookmarked: isBookmarked });
  } catch (error) {
    console.error("Check bookmark error:", error);
    return NextResponse.json({ bookmarked: false });
  }
}