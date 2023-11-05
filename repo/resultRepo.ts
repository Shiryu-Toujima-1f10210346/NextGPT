import { PrismaClient } from "@prisma/client";
import { count } from "console";

const prisma = new PrismaClient();

export const submitResult = async (
  odai: string,
  NG: string[],
  playerName: string,
  odaiId: string,
  playerResult: any,
  score: number,
  count: number
) => {
  try {
    const result = await prisma.result.create({
      data: {
        odai: odai,
        ng: NG,
        name: playerName,
        odaiId: odaiId,
        result: playerResult,
        score: score,
        count: count,
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

export const getResultList = async () => {
  try {
    const result = await prisma.result.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
