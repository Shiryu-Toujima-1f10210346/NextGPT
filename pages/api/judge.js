import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai.iniad.org/api/v1",
});

const openai = new OpenAIApi(configuration);

const systemText = {
  role: "system",
  content: "絶対に true or falseで返してください｡",
};

async function mainChat(req, res) {
  try {
    const userInput = req.body.userInput || "";
    const NG = req.body.NG || "";
    console.log({ user: userInput + " NGワードは" + NG });
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: userInput + " NGワードは" + NG,
      }),
    });
    const data = await response.json();
    console.log("mainchat" + data);
    return data;
  } catch (error) {
    console.log("MainChaterror");
    console.error(error);
    return error;
  }
}

export default async function (req, res) {
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
  const odai = req.body.odai || "";
  const judgeMessage = user + "と" + odai + "は同じ意味ですか？";
  if (user.trim().length === 0 || odai.trim().leodaith === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a message.",
      },
    });
    return;
  }

  try {
    const judge = await openai.createChatCompletion({
      //True なら同じ言葉 False なら違う言葉
      model: "gpt-3.5-turbo",
      messages: [systemText, { role: "user", content: judgeMessage }],
      temperature: 0,
    });
    const resText = judge.data.choices[0].message.content;
    const judgeResult = resText === "True" ? true : false;
    console.log("judgeResult:" + judgeResult);

    if (!judgeResult) {
      console.log("judge passed");
      lastRes = mainChat(req, res);
      res.status(200).json({
        result: lastRes,
      });
    } else {
      console.log("judge failed");
      res.status(200).json({
        result: "お題と同じ単語と判斷されました｡",
      });
    }
  } catch (error) {
    if (error.response) {
      console.log("error");
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
