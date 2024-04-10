import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../index";
import { NotificationType } from "@prisma/client";
export const createPost = async (req: Request, res: Response) => {
  const { user } = req;
  const { body, image } = req.body;
  try {
    if (!user) throw new Error("No user provided");
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
  try {
    if (!user) throw new Error("No user provided");
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
        userId: user.id,
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
  try {
    if (!user) throw new Error("No user provided");
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
  try {
    if (!user) throw new Error("No user provided");
    const post = await prisma.post.findUnique({
      where: { id: postid },
    });
    if (!post) throw new Error("Post id not valid");
    if (post?.likedIds.includes(user.id)) {
      throw new Error("User already liked the post");
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postid,
      },
      data: {
        likedIds: {
          push: user.id,
        },
      },
    });
    // trigger notification
    if (updatedPost.userId !== user.id) {
      await prisma.notification.create({
        data: {
          userId: updatedPost.userId,
          type: NotificationType["LIKE"],
          creatorId: user.id,
        },
      });
    }

    return res.status(201).json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const unlikePost = async (req: Request, res: Response) => {
  const { user } = req;
  const { postid } = req.params;
  try {
    if (!user) throw new Error("No user provided");
    const post = await prisma.post.findUnique({
      where: { id: postid },
    });
    if (!post) throw new Error("Post id not valid");
    if (!post?.likedIds.includes(user.id)) {
      throw new Error("User not liked the post");
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postid,
      },
      data: {
        likedIds: {
          set: post.likedIds.filter((id) => id !== user.id),
        },
      },
    });
    return res.status(201).json(updatedPost);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllPosts = async (req: Request, res: Response) => {
  const { user } = req;
  const { userid } = req.params;
  const { per_page, page } = req.query;
  try {
    if (!user) throw new Error("No user provided");
    const offset = (Number(page) - 1) * Number(per_page);
    const posts = await prisma.post.findMany({
      where: {
        userId: userid,
        threads: { is: null },
      },
      take: Number(per_page),
      skip: offset,
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json({
      posts,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllThreadsUserId = async (req: Request, res: Response) => {
  const { user } = req;
  const { userid } = req.params;
  const { per_page, page } = req.query;
  try {
    if (!user) throw new Error("No user provided");
    const offset = (Number(page) - 1) * Number(per_page);
    const threads = await prisma.thread.findMany({
      where: {
        userId: userid,
      },
      take: Number(per_page),
      skip: offset,
      include: {
        posts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      threads,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllPostsByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { per_page, page } = req.query;
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });
    if (!foundUser) {
      throw new Error("User not found");
    }
    const offset = (Number(page) - 1) * Number(per_page);
    const posts = await prisma.post.findMany({
      where: {
        userId: foundUser.id,
        threads: { is: null },
      },
      take: Number(per_page),
      skip: offset,
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json({
      posts,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllThreadsByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { per_page, page } = req.query;
  try {
    const foundUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
      },
    });
    if (!foundUser) {
      throw new Error("User not found");
    }
    const offset = (Number(page) - 1) * Number(per_page);
    const threads = await prisma.thread.findMany({
      where: {
        userId: foundUser.id,
      },
      include: {
        posts: true,
      },
      take: Number(per_page),
      skip: offset,
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json({
      threads,
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
export const getEveryPost = async (req: Request, res: Response) => {
  const { user } = req;
  const { per_page, page } = req.query;
  try {
    if (!user) throw new Error("No user provided");

    const offset = (Number(page) - 1) * Number(per_page);
    const posts = await prisma.post.findMany({
      where: {
        threads: { is: null },
      },
      take: Number(per_page),
      skip: offset,
      orderBy: {
        id: "desc",
      },
    });
    return res.status(200).json({
      posts,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const getEveryThread = async (req: Request, res: Response) => {
  const { user } = req;
  const { per_page, page } = req.query;
  try {
    if (!user) throw new Error("No user provided");
    const offset = (Number(page) - 1) * Number(per_page);
    const threads = await prisma.thread.findMany({
      take: Number(per_page),
      skip: offset,
      include: {
        posts: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      threads,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const updatePost = async (req: Request, res: Response) => {
  const { user } = req;
  const { postid } = req.params;
  const { body, image } = req.body;
  try {
    if (!user) throw new Error("No user provided");
    if (!postid) throw new Error("No postid provided");
    if (!(body || image)) {
      throw new Error("No fields provided");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postid,
      },
    });
    if (post?.userId !== user.id) {
      throw new Error("Not authorized");
    }
    // delete cloudinary image if available
    if (image && post.image) {
      await cloudinary.uploader.destroy(post?.image);
    }
    let newimage = "";
    if (image) {
      const newprofile = await cloudinary.uploader.upload(image);
      newimage = newprofile.secure_url;
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postid,
      },
      data: {
        body: body || post.body,
        image: newimage.length ? newimage : post.image,
      },
    });
    return res.status(200).json(updatedPost);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req: Request, res: Response) => {
  const { user } = req;
  const { postid } = req.params;
  try {
    if (!user) throw new Error("No user provided");
    if (!postid) throw new Error("No postid provided");
    const post = await prisma.post.findUnique({
      where: {
        id: postid,
      },
    });
    if (post?.userId !== user.id) {
      throw new Error("Not authorized");
    }
    // Delete the post by its ID
    const deletedPost = await prisma.post.delete({
      where: {
        id: postid,
      },
    });
    if (deletedPost && deletedPost?.image) {
      await cloudinary.uploader.destroy(deletedPost?.image);
      console.log("Image deleted from Cloudinary");
    } else {
      console.log("Post deleted, but no image found to delete");
    }

    return res.status(200).json(deletedPost);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
