import { addComment } from "../../repo/commentRepo";

export default async function POST(req, res) {
  console.log("コメント追加");
  console.log(req.body);

  try {
    const newComment = req.body.comment;
    const newName = req.body.name;

    if (!newComment) {
      res.status(400).json({
        error: {
          message: "No Comment",
        },
      });
      return;
    }

    const comment = await addComment(newComment, newName);
    res.status(200).json(comment);
    return;
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
