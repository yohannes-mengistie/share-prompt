import { connectedToDB } from "@utils/database";
import Prompt from "../../../../../models/Prompt";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Explicitly extract id first
    const { id } = params as { id: string };

    await connectedToDB();
    const prompts = await Prompt.find({ creator: id }).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
