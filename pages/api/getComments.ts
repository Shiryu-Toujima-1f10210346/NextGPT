import { getCommentList } from "../../repo/commentRepo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const comments = await getCommentList();
  res.status(200).json(comments);
  return;
}
