import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../index";

export const createPost = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) throw new Error("No user provided");
  const { body, image } = req.body;
  try {
    if (!(body || image)) {
      throw new Error("No fields provided");
    }
    let imgurl = "";
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imgurl = uploadedResponse.secure_url;
    }
    const post = await prisma.post.create({
      data: {
        body,
        userId: user.id,
        image: imgurl,
      },
    });
    return res.status(201).json(post);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const createThreads = async (req: Request, res: Response) => {
  const { user } = req;
  if (!user) throw new Error("No user provided");
  try {
    const { title, image, posts } = req.body;
    console.log(req.body);
    let imgurl = "";
    // if (image) {
    //   const uploadedResponse = await cloudinary.uploader.upload(image);
    //   imgurl = uploadedResponse.secure_url;
    // }
    const createdThread = await prisma.thread.create({
      data: {
        title: title,
        image: imgurl,
        posts: {
          createMany: {
            data: [
              { body: "Bob", image: "bob@prisma.io" },
              { body: "Bobo", image: "bob@prisma.io" },
            ],
          },
        },
      },
      include: {
        posts: true,
      },
    });
    return res.status(201).json(createdThread);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
