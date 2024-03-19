import { prisma } from "../index";
import { User } from "../middlewares/verify-route";
export type updateUserInterface = Pick<
  User,
  "name" | "username" | "bio" | "id"
>;

export async function updateUserFields({
  name,
  username,
  bio,
  id,
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
      },
    });
    console.log(updateUser);
    return updateUser;
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}
