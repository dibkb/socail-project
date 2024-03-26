import { Request, Response } from "express";
import { prisma } from "../index";

export const getThread = async (req: Request, res: Response) => {
  const { user } = req;
  const { threadId } = req.params;
  if (!user) throw new Error("No user provided");
  try {
    const threadWithPosts = await prisma.thread.findUnique({
      where: { id: threadId },
      include: {
        posts: true, // Fetch all connected posts
      },
    });
    return res.status(201).json(threadWithPosts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
