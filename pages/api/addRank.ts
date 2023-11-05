import { addRanking, getRanking, updateRanking } from "../../repo/rankingRepo";

export default async function POST(req, res) {
  console.log("ランキング追加api");
  console.log(req.body);

  try {
    const currentRanking = await getRanking();
    const userName = req.body.name;
    const userScore = req.body.score;

    //マイナス点を弾く
    if (userScore < 0) {
      res.status(200).json(currentRanking);
      console.log("マイナス点");
      return;
    }

    if (!userName || !userScore) {
      res.status(400).json({
        error: {
          message: "Bad Request",
        },
      });
      console.log("Bad Request");
      return;
    }

    //ランキングが空の場合
    // if (currentRanking.length == 0) {
    //   console.log("ランキングが空の場合");
    //   const ranking = await addRanking(userName, userScore);
    //   res.status(200).json(ranking);
    //   return;
    // }

    //上位10位以内に入ってたら
    // if (currentRanking.length >= 10) {
    //   if (currentRanking[9].score < userScore) {
    //     console.log("上位10位以内に入ってる");
    //     const ranking = await addRanking(userName, userScore);
    //     res.status(200).json(ranking);
    //   }
    // }

    //同じ名前､同じスコアの人がいたら登録しない
    for (let i = 0; i < currentRanking.length; i++) {
      if (
        currentRanking[i].name == userName &&
        currentRanking[i].score == userScore
      ) {
        res.status(200).json(currentRanking);
        console.log("同じ名前､同じスコアの人がいたら登録しない");
        return;
      }
    }

    //ランキングに同じ名前の人がいて､スコアがそれより高い場合は､スコアを更新する
    for (let i = 0; i < currentRanking.length; i++) {
      if (currentRanking[i].name == userName) {
        if (currentRanking[i].score < userScore) {
          const tempRanking = await updateRanking(
            userName,
            userScore,
            currentRanking[i].id
          );
          res.status(200).json(tempRanking);
          console.log("同じ名前の人がいたら､スコアが高い方を登録する");
          return;
        }
      }
    }
    console.log("userName:" + userName);
    console.log("userScore:" + userScore);
    console.log("ランキングに登録する");
    const ranking = await addRanking(userName, userScore);
    res.status(200).json(ranking);
  } catch (error) {
    console.log("エラー");
    console.error(error);
    console.log("エラーここまで");
    res.status(500).json({ message: "Internal Server Error" });
  }
}
