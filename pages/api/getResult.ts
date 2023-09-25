import { findResult } from "../../repo/resultRepo";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { query } = url.parse(req.url, true);
  const stringId = query.id;
  const id = Number(stringId);
  const result = await findResult(id);
  res.status(200).json(result);
  return;
}
