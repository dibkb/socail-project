import { Request, Response } from "express";

export const signupUser = function async(req: Request, res: Response) {
  res.status(200).json("success");
  try {
    const { name, email, password } = req.body;
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
