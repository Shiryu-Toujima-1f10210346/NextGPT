import { addRanking } from "../../repo/rankingRepo";

export default async function POST(req, res) {
  console.log("ポスト");
  console.log(req.body);

  try {
    const userName = req.body.name;
    const userScore = req.body.score;

    if (!userName || !userScore) {
      res.status(400).json({
        error: {
          message: "Bad Request",
        },
      });
      return;
    }

    console.log("userName:" + userName);
    console.log("userScore:" + userScore);
    const ranking = await addRanking(userName, userScore);
    res.status(200).json(ranking);
  } catch (error) {
    console.log("エラー");
    console.error(error);
    console.log("エラーここまで");
    res.status(500).json({ message: "Internal Server Error" });
  }
}
