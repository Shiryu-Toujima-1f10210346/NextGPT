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
ユーザーはお題を引き出そうとあなたに指示を出します。
例えばお題が｢りんご｣だとすると､ユーザーは
｢赤くて丸い､甘い果物は？｣
というような指示を出すでしょう。
その指示に対してあなたはそれにあてはまる単語を返します。
この場合はあなたは｢りんご｣とのみ返答してください｡
日本語で返答してください。
`,
  },
];

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
    messagesHistory.push({ role: "user", content: `${user}` });
    userMessageHistory.push(user);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messagesHistory,
    });
    messagesHistory.push(completion.data.choices[0].message);
    console.log(messagesHistory);
    console.log(completion.data.choices[0].message.content);
    resText = completion.data.choices[0].message.content;
    // console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].message });
    console.log(resText);
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
