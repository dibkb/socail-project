import { prisma } from "../index";

export const searchNamesUserNames = async (query: string) => {
  try {
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
      },
    });
    return search;
  } catch (error) {}
};
