import { submitResult } from "../../repo/resultRepo";

export default async function POST(req, res) {
  console.log("結果送信");
  console.log(req.body);

  try {
    const odai = req.body.odai;
    const NG = req.body.NG;
    const odaiId = req.body.odaiId;
    const playerName = req.body.playerName;
    const result = req.body.result;
    const score = req.body.score;
    const count = req.body.count;
    const resultData = await submitResult(
      odai,
      NG,
      playerName,
      odaiId,
      result,
      score,
      count
    );
    res.status(200).json(resultData);
    return;
  } catch (e) {
    console.error("結果送信失敗");
    console.error(e);
    res.status(500).json({
      error: {
        message: "結果送信失敗",
      },
    });
    return;
  }
}
