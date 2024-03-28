import { prisma } from "../index";

export async function removeUserFollowing({
  userId,
  followingIdToRemove,
}: {
  userId: string;
  followingIdToRemove: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followingIds: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.followingIds.includes(followingIdToRemove)) {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followingIds: {
            set: user.followingIds.filter((id) => id !== followingIdToRemove),
          },
        },
      });
      return updatedUser;
    } else {
      throw new Error("FollowingId already exists");
    }
  } catch (error) {
    throw error;
  }
}
export async function removeUserFollowers({
  userId,
  followerToRemove,
}: {
  userId: string;
  followerToRemove: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followerIds: true,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    if (user.followerIds.includes(followerToRemove)) {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          followerIds: {
            set: user.followerIds.filter((id) => id !== followerToRemove),
          },
        },
      });
      return updatedUser;
    } else {
      throw new Error("FollowerId already exists");
    }
  } catch (error) {
    throw error;
  }
}
