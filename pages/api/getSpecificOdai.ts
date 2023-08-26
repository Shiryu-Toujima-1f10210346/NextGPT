import { getSpecificOdai } from "../../repo/odaiRepo";
import { NextApiRequest, NextApiResponse } from "next";
import url from "url";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = url.parse(req.url, true);
  const stringId = query.id;
  const id = Number(stringId);
  const odai = await getSpecificOdai(id);

  res.status(200).json(odai);
};
