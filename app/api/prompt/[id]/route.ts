import { NextRequest, NextResponse } from "next/server";
import { connectedToDB } from "@utils/database";
import Prompt from "@models/Prompt";

// GET (READ)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectedToDB();
    const { id } = await params;

    const prompt = await Prompt.findById(id).populate('creator');

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(prompt, { status: 200 });
  } catch (error) {
    console.error("Error fetching prompt:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
}

// PATCH (UPDATE)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { prompt, tag } = await request.json();
    await connectedToDB();
    
    const { id } = await params;
    const existingPrompt = await Prompt.findById(id);
    
    if (!existingPrompt) {
      return NextResponse.json(
        { error: "Prompt not found" },
        { status: 404 }
      );
    }
    
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();
    return NextResponse.json(existingPrompt, { status: 200 });
  } catch (error) {
    console.error("Error updating prompt:", error);
    return NextResponse.json(
      { error: "Failed to update prompt" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectedToDB();
    const { id } = await params;
    
    await Prompt.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Prompt deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting prompt:", error);
    return NextResponse.json(
      { error: "Failed to delete prompt" },
      { status: 500 }
    );
  }
}