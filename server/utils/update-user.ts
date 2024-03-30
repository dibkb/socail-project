import { prisma } from "../index";
import { User } from "../middlewares/verify-route";
export type updateUserInterface = Pick<
  User,
  "name" | "username" | "bio" | "id" | "profilePic"
>;

export async function updateUserFields({
  name,
  username,
  bio,
  id,
  profilePic,
}: updateUserInterface) {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        username: username,
        bio: bio,
        profilePic: profilePic,
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
    return updateUser;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}
