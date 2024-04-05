import { prisma } from "../index";

export const searchNamesUserNames = async (query: string) => {
  try {
    if (query === "*") {
      const search = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          username: true,
          profilePic: true,
        },
      });
      return search;
    }
    const search = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { username: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        profilePic: true,
      },
      take: 9,
    });
    return search;
  } catch (error) {}
};
