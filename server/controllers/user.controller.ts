import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../index";
import { generateAndSetCookie } from "../utils/helpers";
export const signupUser = async (req: Request, res: Response) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(400).json({
        error: "Email already in use ",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    if (newUser) {
      // lgoin user
      generateAndSetCookie({
        userid: newUser.id,
        res,
      });
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      });
    } else {
      res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
