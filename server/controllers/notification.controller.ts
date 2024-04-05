import { Request, Response } from "express";
import { prisma } from "../index";
import { NotificationType } from "@prisma/client";
export const getAllNotifications = async (req: Request, res: Response) => {
  const { user } = req;
  try {
    if (!user) throw new Error("No user provided");
    const allNotifications = await prisma.notification.findMany({
      where: {
        userId: user.id,
      },
    });
    return res.status(200).json(allNotifications);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
