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
    let imgurl = "";
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imgurl = uploadedResponse.secure_url;
    }
    const createFirstPost = await prisma.post.create({
      data: {
        body: title,
        userId: user.id,
        image: imgurl,
      },
    });
    const updatedPosts = await createPosts(posts, user.id);
    const createdThread = await prisma.thread.create({
      data: {
        posts: {
          connect: [createFirstPost, ...updatedPosts].map((post: any) => ({
            id: post.id,
          })),
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

export const getPost = async (req: Request, res: Response) => {
  const { user } = req;
  const { postid } = req.params;
  if (!user) throw new Error("No user provided");
  try {
    const post = await prisma.post.findUnique({
      where: { id: postid },
    });
    return res.status(201).json(post);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const likePost = async (req: Request, res: Response) => {
  const { user } = req;
  const { postid } = req.params;
  if (!user) throw new Error("No user provided");
  try {
    const post = await prisma.post.findUnique({
      where: { id: postid },
    });
    if (!post) throw new Error("Post id not valid");
    if (post?.likedIds.includes(user.id)) {
      throw new Error("User already liked the post");
    }
    const updatedUser = await prisma.post.update({
      where: {
        id: postid,
      },
      data: {
        likedIds: {
          push: user.id,
        },
      },
    });
    return res.status(201).json(updatedUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllPosts = async (req: Request, res: Response) => {
  const { user } = req;
  const { userid } = req.params;
  if (!user) throw new Error("No user provided");
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: userid,
      },
    });
    const threads = await prisma.thread.findMany({
      where: {
        posts: {
          some: {
            userId: userid,
          },
        },
      },
    });
    return res.status(201).json({
      posts: posts,
      threads: threads,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
const createPosts = async (posts: any[], userid: string): Promise<any> => {
  const createdPosts = [];
  for (const post of posts) {
    let imgurl = "";
    if (post?.image) {
      const uploadedResponse = await cloudinary.uploader.upload(post.image);
      imgurl = uploadedResponse.secure_url;
    }
    const createdPost = await prisma.post.create({
      data: {
        body: post.body,
        userId: userid,
        image: imgurl,
      },
    });
    createdPosts.push(createdPost);
  }
  return createdPosts;
};
