import { getOdaiList } from "../../repo/odaiRepo";

export default async function GET(req, res) {
  const ranking = await getOdaiList();
  res.status(200).json(ranking);
  return true;
}
