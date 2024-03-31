import { Request, Response } from "express";
import { prisma } from "../index";
export const createComment = async (req: Request, res: Response) => {
  const { user } = req;
  const { postid } = req.params;
  if (!user) throw new Error("No user provided");
  const { body } = req.body;
  try {
    if (!body || !postid) {
      throw new Error("No comment body or postid provided");
    }
    const createdComment = await prisma.comment.create({
      data: {
        body,
        userId: user.id,
        postId: postid,
      },
      select: {
        id: true,
        body: true,
        userId: true,
        createdAt: true,
      },
    });
    return res.status(201).json(createdComment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getComments = async (req: Request, res: Response) => {
  const { user } = req;
  const { postid } = req.params;
  if (!user) throw new Error("No user provided");
  try {
    const allComments = await prisma.comment.findMany({
      where: {
        postId: postid,
      },
      select: {
        id: true,
        body: true,
        userId: true,
        createdAt: true,
      },
    });
    return res.status(200).json(allComments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getCommentsUser = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) throw new Error("No user provided");
  try {
    const allComments = await prisma.comment.findMany({
      where: {
        userId: user.id,
      },
      include: {
        post: true,
      },
    });
    return res.status(200).json(allComments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getCommentsByUserId = async (req: Request, res: Response) => {
  const { user } = req;
  const { userid } = req.params;
  if (!user) throw new Error("No user provided");
  try {
    const allComments = await prisma.comment.findMany({
      where: {
        userId: userid,
      },
      include: {
        post: true,
      },
    });
    return res.status(200).json(allComments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
