import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export const addRanking = async (userName:string,userScore:number) => {
    if (!userName || !userScore) {
        return;
    }
   
    const ranking = await prisma.rank.create({
        data: {
            name: userName,
            score: userScore
        }
    });
    return ranking;
}