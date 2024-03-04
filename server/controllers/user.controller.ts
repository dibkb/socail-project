import { Request, Response } from "express";

export const signupUser = function async(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
