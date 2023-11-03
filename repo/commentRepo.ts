import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addComment = async (comment: string, name: string) => {
  console.log("addComment@repo");
  try {
    const newComment = await prisma.comment.create({
      data: {
        comment: comment,
        name: name,
      },
    });
    return newComment;
  } catch (error) {
    console.error(error);
  }
};

export const getCommentList = async () => {
  try {
    const comments = await prisma.comment.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    if (comments.length === 0) {
      await prisma.comment.create({
        data: {
          comment: "感想等､気軽に書いていってくれるととても喜びます！！",
          name: "名無しさん@管理者",
        },
      });
      return [
        {
          comment: "感想等､気軽に書いていってくれるととても喜びます！！",
          name: "名無しさん@管理者",
        },
      ];
    }
    return comments;
  } catch (error) {
    console.error(error);
  }
};
