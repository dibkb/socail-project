import { Request, Response } from "express";
import { prisma } from "../index";
import { NotificationType } from "@prisma/client";
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
        post: true,
      },
    });
    if (createdComment.post.userId !== user.id) {
      await prisma.notification.create({
        data: {
          userId: createdComment.userId,
          type: NotificationType["COMMENT"],
          creatorId: user.id,
        },
      });
    }
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
  try {
    if (!user) throw new Error("No user provided");
    const allComments = await prisma.comment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
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
  try {
    if (!user) throw new Error("No user provided");
    const allComments = await prisma.comment.findMany({
      where: {
        userId: userid,
      },
      orderBy: {
        createdAt: "desc",
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
