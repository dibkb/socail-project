import { prisma } from "../index";

export async function updateUserFollowing({
  userId,
  followingIdToAdd,
}: {
  userId: string;
  followingIdToAdd: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.followingIds.includes(followingIdToAdd)) {
      throw new Error("FollowingId already exists");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followingIds: {
          push: followingIdToAdd,
        },
      },
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}
export async function updateUserFollowers({
  userId,
  followerToAdd,
}: {
  userId: string;
  followerToAdd: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.followerIds.includes(followerToAdd)) {
      throw new Error("FollowerId already exists");
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        followerIds: {
          push: followerToAdd,
        },
      },
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
}
