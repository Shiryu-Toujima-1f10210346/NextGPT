import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();
const userScore = 100;
const userName = 'test';
export default async function  createRanking() {
    const ranking = await prisma.rank.create({
        data: {
            name: userName,
            score : userScore,
        },
    });
    console.log(ranking);
}