import { connectedToDB } from "@/utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectedToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Fiald to create new prompt", { status: 500 });
  }
};
