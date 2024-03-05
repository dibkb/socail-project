import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../utils/get-user";
import { Token } from "../utils/helpers";
const jwtsecret = process.env.JWT_SECRET || "";
export const verifyRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = jwt.verify(token, jwtsecret) as Token;
    const user = await findUserById(decoded?.userId);
    if (user) {
      req.user = user;
    }
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
interface User {
  id: string;
  username: string;
  // Add other properties as needed
}
declare module "express" {
  interface Request {
    user?: User;
  }
}
