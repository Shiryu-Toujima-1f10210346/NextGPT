import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addOdai = async (
  newOdai: string,
  ng: string[],
  limit: number,
  score: number,
  official: boolean
) => {
  const odai = await prisma.odai.create({
    data: {
      odai: newOdai,
      ng: ng,
      limit: limit,
      score: score,
      like: 0,
      dislike: 0,
      official: official,
    },
  });
  return odai;
};

export const getSpecificOdai = async (id: number) => {
  const odai = await prisma.odai.findUnique({
    where: {
      id: id,
    },
  });
  return odai;
};

export const getOdaiList = async () => {
  const odai = await prisma.odai.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return odai;
};

export const updateOdai = async (
  newOdai: string,
  ng: string[],
  limit: number,
  id: number
) => {
  const odai = await prisma.odai.update({
    where: {
      id: id,
    },
    data: {
      odai: newOdai,
      ng: ng,
      limit: limit,
    },
  });
  return odai;
};
