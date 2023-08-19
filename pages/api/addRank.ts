import { addRanking } from "../../repo/rankingRepo";

export default async function POST(req, res) {
  try {
    const userName = req.body.name;
    const userScore = req.body.score;

    // バリデーション
    if (!userName || !userScore) {
      throw new Error("Invalid request body");
    }

    const ranking = await addRanking(userName, userScore);
    res.status(200).json(ranking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
