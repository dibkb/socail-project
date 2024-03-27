import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../index";
import { generateAndSetCookie } from "../utils/helpers";
import { findUserById, findUserByUsername } from "../utils/get-user";
import {
  updateUserFollowers,
  updateUserFollowing,
} from "../utils/following-user";
import { updateUserFields } from "../utils/update-user";
export const getuserProfile = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await findUserByUsername(username);
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
// signup user
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
      const cookie = generateAndSetCookie({
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
// login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user) {
      return res.status(400).json({ error: "Invalid User" });
    }
    if (!isPasswordCorrect) {
      return res.status(400).json({
        error: "Invalid Password",
      });
    }
    generateAndSetCookie({
      userid: user.id,
      res,
    });
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};
// logout user
export const logoutUser = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
    console.log("Error in signupUser: ", err.message);
  }
};
// follow user
export const followUser = async (req: Request, res: Response) => {
  const { userid } = req.params;
  console.log("userid", userid);
  try {
    const currUserId = req?.user?.id;
    const userToModify = await findUserById(userid);
    //   throw errors
    if (currUserId === userToModify?.id) {
      throw new Error("Cannot follow self");
    }
    if (!userToModify || !currUserId) throw new Error("No userid provided");
    await updateUserFollowing({
      userId: currUserId,
      followingIdToAdd: userToModify?.id,
    });
    await updateUserFollowers({
      userId: userToModify?.id,
      followerToAdd: currUserId,
    });
    return res.status(200).json({
      message: `Following updated for ${currUserId}`,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) throw new Error("No user provided");
  const { name, username, bio } = req.body;
  try {
    if (!(name || username || bio)) {
      throw new Error("No fields provided");
    }
    const updatedUser = await updateUserFields({
      id: user.id,
      name: name || user.name,
      username: username || user.username,
      bio: bio || user.bio,
    });
    return res.status(202).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
