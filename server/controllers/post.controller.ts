import { Request, Response } from "express";
export const createPost = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) throw new Error("No user provided");
  const { body, image } = req.body;
  try {
    if (!(body || image)) {
      throw new Error("No fields provided");
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
