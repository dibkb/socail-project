import { prisma } from "../index";
export async function findUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: false,
        profilePic: true,
        bio: true,
        isFrozen: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error finding user by userId:", error);
    throw error;
  }
}
export async function findUserByUsername(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: false,
        profilePic: true,
        bio: true,
        isFrozen: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
}
