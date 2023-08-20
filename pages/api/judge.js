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
      model: "gpt-3.5-turbo",
      messages: [systemText, { role: "user", content: judgeMessage }],
      temperature: 0,
    });
    const resText = judge.data.choices[0].message.content;
    console.log("resText");
    console.log(resText);
    res.status(200).json({
      result: resText,
    });
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
