import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "../index";
import { Prisma } from "@prisma/client";

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
    //   convert images to cloudinary
    let imgurl = "";
    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      imgurl = uploadedResponse.secure_url;
    }
    const updatedPosts = await convertImagesToCloudinary(posts);
    console.log("updated_posts", updatedPosts);
    const createdThread = await prisma.thread.create({
      data: {
        title: title,
        image: imgurl,
        posts: {
          createMany: {
            data: updatedPosts,
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
const convertImagesToCloudinary = async (posts: any[]): Promise<any> => {
  const updatedPosts = [];
  for (const post of posts) {
    let imgurl = "";
    if (post?.image) {
      const uploadedResponse = await cloudinary.uploader.upload(post.image);
      imgurl = uploadedResponse.secure_url;
    }
    updatedPosts.push({
      body: post.body,
      image: imgurl,
    });
  }
  return updatedPosts;
  // posts.map(async (post) => {
  //   let imgurl = "";
  //   if (post?.image) {
  //     const uploadedResponse = await cloudinary.uploader.upload(post.image);
  //     imgurl = uploadedResponse.secure_url;
  //     return {
  //       body: post.body,
  //       image: uploadedResponse.secure_url,
  //     };
  //   } else {
  //     return {
  //       body: post.body,
  //     };
  //   }
  // });
  //   for (const post of posts) {
  //     if (post.image) {
  //       let imgurl = "";
  //       const uploadedResponse = await cloudinary.uploader.upload(post.image);
  //       imgurl = uploadedResponse.secure_url;
  //       post.image = imgurl;
  //     }
  //   }
};
