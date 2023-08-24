import { addOdai } from "../../repo/odaiRepo";

export default async function POST(req, res) {
  console.log("お題追加");
  console.log(req.body);

  try {
    const newOdai = req.body.odai;
    const ng = req.body.ng;
    let limit = 10;

    if (req.body.limit) {
      limit = req.body.limit;
    } else {
      console.log("limitは自動で10になります");
    }

    if (!newOdai || !ng) {
      res.status(400).json({
        error: {
          message: "Bad Request",
        },
      });
      return;
    }

    const odai = await addOdai(newOdai, ng, limit);
    res.status(200).json(odai);
    return true;
  } catch (e) {
    console.error(e);
    res.status(500).json({
      error: {
        message: "Internal Server Error",
      },
    });
    return;
  }
}
