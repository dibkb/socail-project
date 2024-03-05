import { prisma } from "../index";

export async function updateUserFollowing({
  userId,
  followingIdToAdd,
}: {
  userId: string;
  followingIdToAdd: string;
}) {
  try {
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
