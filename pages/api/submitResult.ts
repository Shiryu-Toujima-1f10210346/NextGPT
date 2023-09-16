import { submitResult } from "../../repo/resultRepo";

export default async function POST(req, res) {
  console.log("結果送信");
  console.log(req.body);

  try {
    const odaiId = req.body.odaiId;
    const playerName = req.body.playerName;
    const result = req.body.result;
    const score = req.body.score;
    console.log("odaiId: " + odaiId);
    console.log("result: " + result);
    console.log("score: " + score);
    const resultData = await submitResult(playerName, odaiId, result, score);
    res.status(200).json(resultData);
    return true;
  } catch (e) {
    console.error("結果送信失敗");
    console.error(e);
    res.status(500).json({
      error: {
        message: "結果送信失敗",
      },
    });
    return false;
  }
}
