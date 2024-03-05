import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../utils/get-user";
const jwtsecret = process.env.JWT_SECRET || "";
export const verifyRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, jwtsecret);
    const user = await findUserById(decoded?.userId);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
