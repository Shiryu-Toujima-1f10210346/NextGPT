import { getRanking } from "../../repo/rankingRepo";

export default async function GET(req, res) {
  const ranking = await getRanking();
  res.status(200).json(ranking);
  return true;
}
