import { addRanking } from "../../repo/rankingRepo";

export default async function handler(req, res) {
  const userName = req.body.name;
  const userScore = req.body.score;
  const ranking = await addRanking(userName, userScore);
  res.status(200).json(ranking);
  return true;
}
