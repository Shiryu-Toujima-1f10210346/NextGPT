import { getResultList } from "../../repo/resultRepo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const result = await getResultList();
  res.status(200).json(result);
  return;
}
