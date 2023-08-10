import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState(3);
  const [odai, setOdai] = useState("バナナ");
  const [NG, setNG] = useState(["黄色", "甘い", "酸っぱい"]);
  const [alert, setAlert] = useState("");

  async function onSubmit(event) {
    //エラー処理
    if (userInput.trim().length === 0) {
      setAlert("文字を入力してください");
      return;
    }
    //userInputの文字列にNGの文字列が含まれていたら
    for (let i = 0; i < NG.length; i++) {
      if (userInput.includes(NG[i]) || userInput.includes(odai)) {
        setAlert("NGワードが含まれています");
        return;
      }
    }

    //残り回数が0以下だったら
    if (limit <= 0) {
      setAlert("もう終わりです");
      return;
    }

    event.preventDefault();
    try {
      console.log({ user: userInput + " お題は" + odai + " NGワードは" + NG });
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user:
            "ユーザーの入力は:" +
            userInput +
            "､お題は" +
            odai +
            "､NGワードは" +
            NG,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      //data.result.contentにodaiが含まれていたら
      if (data.result.content.includes(odai)) {
        //勝ち
        document.getElementById("title").innerHTML = "あなたの勝ちです";
        document.getElementById("title").style.color = "red";
      }

      // setResult(data.result);
      //dataの中身をわかりやすく表示
      console.log(data.result.content);
      setResult([
        ...result,
        "あなた:" + event.target.elements.user.value,
        "GPT:" + data.result.content,
      ]);
      setLimit(limit - 1);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      setAlert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>ほげほげ</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <main className={styles.main}>
        <img src="/gpt.png" className={styles.icon} />
        <h3 id="title">GPTとバトル</h3>

        <div class="flex flex-row">
          {/* お題設定 */}
          <div>
            <p class="text-xl m-6">デバッグ用:お題を設定</p>
            <input
              type="text"
              placeholder="お題を入力してください"
              value={odai}
              onChange={(e) => setOdai(e.target.value)}
            />
          </div>

          {/* NGワード設定 */}
          <div>
            <p class="text-xl m-6">デバッグ用:NGワードを設定</p>
            <input
              type="text"
              placeholder="NGワードを入力してください"
              value={NG}
              onChange={(e) => setNG(e.target.value)}
            />
          </div>
        </div>
        <p
          id="odai"
          class="
        text-xl mb-4
        "
        >
          お題:{odai}
        </p>
        <p id="alert" class="text-xl mb-4">
          {alert}
        </p>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            name="user"
            placeholder="お題を引き出そう！"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input
            type="submit"
            id="submit"
            value="Send Message"
            disabled={limit <= 0 || userInput.length === 0}
          />
        </form>

        <div
          id="limit"
          class="
        mt-6 p-2
        border rounded-xl border-gray-800 border-2 shadow-xl
        font-bold text-xl text-gray-800
        "
        >
          {limit <= 0 ? <p>もう終わりです</p> : <p>残り{limit}回</p>}
        </div>

        <div className={styles.result}>
          {result.map((fact, index) => (
            <p
              key={index}
              class="
            border rounded-xl border-gray-800 border-2 shadow-xl
            p-6 m-4
            text-xl font-bold text-gray-800
            "
            >
              {fact}
            </p>
          ))}
        </div>

        <div id="result"></div>
      </main>
    </div>
  );
}
