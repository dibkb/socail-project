import { Response } from "express";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET as string;
export const generateAndSetCookie = ({
  userid,
  res,
}: {
  userid: string;
  res: Response;
}) => {
  const token = jwt.sign({ userId: userid }, secretKey, { expiresIn: "15d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: true,
  });
  return token;
};
