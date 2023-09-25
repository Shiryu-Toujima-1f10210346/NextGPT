import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const submitResult = async (
  playerName: string,
  odaiId: string,
  playerResult: any,
  score: number
) => {
  try {
    const result = await prisma.result.create({
      data: {
        name: playerName,
        odaiId: odaiId,
        result: playerResult,
        score: score,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const findResult = async (id: number) => {
  try {
    const result = await prisma.result.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
