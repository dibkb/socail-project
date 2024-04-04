import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserById } from "../utils/get-user";
import { Token } from "../utils/helpers";
import { Prisma } from "@prisma/client";
const jwtsecret = `${process.env.JWT_SECRET}` || "";
export const verifyRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res.status(401).json({ message: "Unauthorized, jwt missing" });
    const decoded = jwt.verify(token, jwtsecret) as Token;
    const user = await findUserById(decoded?.userId);
    if (user) {
      req.user = user as User;
    }
    next();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  bio?: string;
  isFrozen: boolean;
  createdAt: Date;
  updatedAt: Date;
  followingIds: string[];
  followerIds: string[];
}

declare module "express" {
  interface Request {
    user?: User;
  }
}
