import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectedToDB } from "@utils/database";
import User from "@models/user";
import { authOptions } from "../../config";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const image = body.image;
    
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Validate image URL or base64 format
    const isBase64 = image.startsWith('data:image');
    const isUrl = image.startsWith('http://') || image.startsWith('https://');
    
    if (!isBase64 && !isUrl) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }

    await connectedToDB();
    
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { image },
      { new: true }
    ).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        username: user.username,
        image: user.image,
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Profile image update error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}