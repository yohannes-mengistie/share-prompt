import { connectedToDB } from "@utils/database";
import Prompt from "../../../models/Prompt";

export const GET = async (request: Request) => {
  try {
    await connectedToDB();

    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
