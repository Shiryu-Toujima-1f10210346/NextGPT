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
    //上から10位までを返す
    const ranking = await prisma.rank.findMany({
      orderBy: {
        score: "desc",
      },
      take: 10,
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
