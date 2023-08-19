import { addRanking, getRanking } from "../../repo/rankingRepo";

export default async function POST(req, res) {
  console.log("ポスト");
  console.log(req.body);

  try {
    const currentRanking = await getRanking();
    const userName = req.body.name;
    const userScore = req.body.score;

    //同じ名前､同じスコアの人がいたら登録しない
    for (let i = 0; i < currentRanking.length; i++) {
      if (
        currentRanking[i].name == userName &&
        currentRanking[i].score == userScore
      ) {
        res.status(200).json(currentRanking);
        return;
      }
    }

    //同じ名前の人がいたら､スコアが低い方を削除し､スコアが高い方を登録する
    for (let i = 0; i < currentRanking.length; i++) {
      if (
        currentRanking[i].name == userName &&
        currentRanking[i].score < userScore
      ) {
        currentRanking[i].score = userScore;
        res.status(200).json(currentRanking);
        return;
      }
    }

    if (currentRanking.length >= 10) {
      //上位10位以内に入ってたら
      if (currentRanking[9].score > userScore) {
        res.status(200).json(currentRanking);
        return;
      }
    }

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
