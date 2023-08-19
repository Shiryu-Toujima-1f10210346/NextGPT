import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addRanking = async (userName: string, userScore: number) => {
  const ranking = await prisma.rank.create({
    data: {
      name: userName,
      score: userScore,
    },
  });
  return ranking;
};

export const getRanking = async () => {
  const ranking = await prisma.rank.findMany({
    orderBy: {
      score: "desc",
    },
  });
  return ranking;
};

export const updateRanking = async (
  userName: string,
  userScore: number,
  id: number
) => {
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
};
