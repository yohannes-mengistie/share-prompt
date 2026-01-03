import { NextRequest, NextResponse } from "next/server";
import { connectedToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const { id } = params;

    await connectedToDB();
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    return NextResponse.json(prompts, { status: 200 });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch user posts" },
      { status: 500 }
    );
  }
}