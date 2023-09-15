import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addRanking = async (userName: string, userScore: number) => {
  try {
    const ranking = await prisma.rank.create({
      data: {
        name: userName,
        score: userScore,
      },
    });
    return ranking;
  } catch (error) {
    console.error(error);
  }
};

export const getRanking = async () => {
  try {
    const ranking = await prisma.rank.findMany({
      orderBy: {
        score: "desc",
      },
    });
    return ranking;
  } catch (error) {
    console.error(error);
  }
};

export const updateRanking = async (
  userName: string,
  userScore: number,
  id: number
) => {
  try {
    const ranking = await prisma.rank.update({
      where: {
        id: id,
      },
      data: {
        name: userName,
        score: userScore,
      },
    });
    return ranking;
  } catch (error) {
    console.error(error);
  }
};
