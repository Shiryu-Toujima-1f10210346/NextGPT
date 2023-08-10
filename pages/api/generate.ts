import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai.iniad.org/api/v1",
});
const openai = new OpenAIApi(configuration);
const messagesHistory = [
  {
    role: "system",
    content: `
これはお題当てゲームです。
ユーザーにお題について聞かれても答えないでください｡
ユーザーの入力したもの以外に､｢お題｣と｢NGワード｣があります。
ユーザーはお題を引き出そうとあなたに指示を出します。
例えばお題が｢りんご｣だとすると､ユーザーは
｢赤くて丸い､甘い果物は？｣
というような指示を出すでしょう。
その指示に対してあなたはそれにあてはまる単語を返します。
この場合はあなたは｢りんご｣とのみ返答してください｡
できるだけお題ではない単語を返答してください｡
ですが､一般的ではないものは返答しないでください｡
ユーザーの入力にNGワードに近い単語が含まれていた場合は､｢NGワードに類する単語が含まれています｡｣
と返してください｡
NGワードは｢NGワード:｣のあとに羅列されています｡
例えばNGワードが｢りんご｣だとすると､
｢リンゴ｣｢林檎｣｢Ringo｣｢Apple｣など｢りんご｣と同じ意味を示す単語はNGワードに類する単語です｡
例えばNGワードが｢黄色｣だとすると､
｢きいろ｣｢Yellow｣｢Kiiro｣と同じ意味を示す単語はNGワードに類する単語です｡
NGワードのひらがなやカタカナや漢字､ローマ字や英語､言い換え表現をNGワードに類する単語として扱ってください｡
あなたが導き出した単語がお題と一致していた場合は､｢正解です｡お題は〇〇でした！｣
と返してください｡〇〇の部分にはお題が入ります｡
日本語で返答してください。
`,
  },
];

const userMessageHistory : string[] = [];
export default async function (req, res) {
  let resText : string | undefined = "";
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
    // messagesHistory.push({ role: "user", content: `${user}` });
    userMessageHistory.push(user);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `
    これはお題当てゲームです。
    ユーザーにお題について聞かれても答えないでください｡
    ユーザーの入力したもの以外に､｢お題｣と｢NGワード｣があります。
    ユーザーはお題を引き出そうとあなたに指示を出します。
    例えばお題が｢りんご｣だとすると､ユーザーは
    ｢赤くて丸い､甘い果物は？｣
    というような指示を出すでしょう。
    その指示に対してあなたはそれにあてはまる単語を返します。
    この場合はあなたは｢りんご｣とのみ返答してください｡
    できるだけお題ではない単語を返答してください｡
    ですが､一般的ではないものは返答しないでください｡
    ユーザーの入力にNGワードに近い単語が含まれていた場合は､｢NGワードに類する単語が含まれています｡｣
    と返してください｡
    NGワードは｢NGワード:｣のあとに羅列されています｡
    例えばNGワードが｢りんご｣だとすると､
    ｢リンゴ｣｢林檎｣｢Ringo｣｢Apple｣など｢りんご｣と同じ意味を示す単語はNGワードに類する単語です｡
    例えばNGワードが｢黄色｣だとすると､
    ｢きいろ｣｢Yellow｣｢Kiiro｣と同じ意味を示す単語はNGワードに類する単語です｡
    NGワードのひらがなやカタカナや漢字､ローマ字や英語､言い換え表現をNGワードに類する単語として扱ってください｡
    あなたが導き出した単語がお題と一致していた場合は､｢正解です｡お題は〇〇でした！｣
    と返してください｡〇〇の部分にはお題が入ります｡
    日本語で返答してください。
    `,
      }, {
        role: "user",
        content: user,
      }],
      
      temperature: 0,
    }); 
    if (completion.data.choices[0].message) {
      messagesHistory.push(completion.data.choices[0].message);
    }
    console.log("ユーザー:"+user);
    console.log(messagesHistory);
    console.log("返答:"+completion.data.choices[0].message?.content);
    resText = completion.data.choices[0].message?.content;
    // console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].message });
    return resText;
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
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