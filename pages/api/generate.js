import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai.iniad.org/api/v1",
  
});
const openai = new OpenAIApi(configuration);
const messagesHistory = [{ role: "system", content: `

` }];
export default async function (req, res) {
  let resText = "";
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    messagesHistory.push({ role: "user", content: `${animal}` });
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:messagesHistory,
    });
    messagesHistory.push(completion.data.choices[0].message);
    console.log(messagesHistory);
    console.log(completion.data.choices[0].message.content);
    resText = completion.data.choices[0].message.content;
    // console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].message });
    console.log(resText);
    return resText;
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}