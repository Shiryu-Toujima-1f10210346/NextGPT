import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai.iniad.org/api/v1",
});
const openai = new OpenAIApi(configuration);
const systemText =
  // messagesHistory => systemText
  {
    role: "system",
    content: `
これはお題当てゲームです。
以下の形式で送られてきます｡
"ユーザーの入力:" ここにユーザーの入力が入ります｡例:｢赤くて丸い､甘い果物｣
"お題:" ここにお題が入ります｡例:｢リンゴ｣
"NGワード:" ここにNGワードが入ります｡カンマ区切りで複数のNGワードが入ります｡例:｢赤い,くだもの｣
ユーザーはお題を引き出そうとあなたに指示を出します。
例えばお題が｢りんご｣だとすると､ユーザーは
｢赤くて丸い､甘い果物｣
というような指示を出すでしょう。
その指示に対してあなたはその特徴にあてはまる単語を返します。
この例の場合はあなたは｢りんご｣とのみ返答してください｡
できるだけその特徴に当てはまる､違う単語を返答するようにしてください｡
例えば｢赤くて甘い果物｣と指示が来たらお題の｢りんご｣ではなく｢いちご｣等を返答するようにしてください｡
ですが､あまり一般的ではないものは返答しないでください｡
ユーザーの入力した文字列内にNGワードのどれか一つに近い単語が含まれていた場合は､｢NGワードに類する単語が含まれています｡｣
と返してください｡
例えばNGワードが｢りんご｣だとすると､｢リンゴ｣｢林檎｣｢Ringo｣｢Apple｣など｢りんご｣と同じ意味を示す単語はNGワードに類する単語です｡
例えばNGワードが｢黄色｣だとすると､｢きいろ｣｢Yellow｣｢Kiiro｣と同じ意味を示す単語はNGワードに類する単語です｡
NGワードのひらがなやカタカナや漢字､ローマ字や英語､言い換え表現もNGワードに類する単語として扱ってください｡
日本語で返答してください。
`,
  };

const userMessageHistory = [];
export default async function (req, res) {
  let resText = "";
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const user = req.body.user || "";
  if (user.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a message.",
      },
    });
    return;
  }

  try {
    userMessageHistory.push(user);
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [systemText, { role: "user", content: `${user}` }],
      temperature: 0,
    });
    console.log(completion.data.choices[0].message.content);
    console.log([systemText, { role: "user", content: `${user}` }]);
    resText = completion.data.choices[0].message.content;
    res.status(200).json({ result: completion.data.choices[0].message });
    return resText;
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
