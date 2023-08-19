import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Sidever from "../../components/Sidebar";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState<string[]>([]); // add type annotation for result state
  const [limit, setLimit] = useState(10);
  const [odai, setOdai] = useState("バナナ");
  const [NG, setNG] = useState<string[]>(["黄色", "甘い", "酸っぱい"]); // add type annotation for NG state
  const [alert, setAlert] = useState("");
  const [thiking, setThiking] = useState(false);

  const n = 10; // 生成する<p>要素の数
  const paragraphs = [];

  for (let i = 0; i < n; i++) {
    paragraphs.push(
      <p
        key={i}
        className="
          border border-gray-800 border-2 
          shadow-xl rounded-xl 
          p-6 m-4
          text-xl font-bold text-gray-800
        "
      >
        デバッグ用会話ダミー
      </p>
    );
  }

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

    setThiking(true);

    event.preventDefault();
    try {
      console.log({ user: userInput + " NGワードは" + NG });
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "ユーザーの入力:" + userInput + " NGワード:" + NG,
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
      setThiking(false);
    } catch (error) {
      // Consider implementing your own error handling logic here
      setThiking(false);
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
      <Sidever />
      <main className={styles.main}>
        <div
          className="
        sm:flex sm:flex-row  p-4 lg:mt-16 m-auto
         border-red-800 border-4 

         "
          style={{ position: "sticky", top: "0" }}
        >
          <div>
            <div
              className="
              left 
              text-center
              border-2 border-black mt-6 
              "
            >
              <div id="title" className="text-3xl font-bold">
                GPTとバトル！
              </div>

              <div className="flex flex-row">
                {/* お題設定 */}
                <div>
                  <p className="text-xl m-2">デバッグ用:お題を設定</p>
                  <input
                    type="text"
                    placeholder="お題を入力してください"
                    value={odai}
                    onChange={(e) => setOdai(e.target.value)}
                  />
                </div>

                {/* NGワード設定 */}
                <div>
                  <p className="text-xl m-2">デバッグ用:NGワードを設定</p>
                  <input
                    type="text"
                    placeholder="NGワードを入力してください"
                    value={NG}
                    onChange={(e) => setNG([e.target.value])}
                  />
                </div>
              </div>
              <p
                id="odai"
                className="
        text-xl mb-4
        "
              >
                お題:{odai}
              </p>
              <p id="alert" className="text-xl mb-4">
                {alert}
              </p>
              <form onSubmit={(e) => onSubmit(e)} className="mx-auto">
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
              <div>
                {thiking ? (
                  <div className="flex justify-center mt-6">
                    {/* <img src="/thinking.gif" className={styles.thinking} /> */}
                    GPTくん考え中...
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              <div
                id="limit"
                className="
        m-6 p-2 mx-36
        border rounded-xl border-gray-800 border-2 shadow-xl
        font-bold text-xl text-gray-800 text-center
        "
              >
                {limit <= 0 ? <p>もう終わりです</p> : <p>残り{limit}回</p>}
              </div>
            </div>
          </div>{" "}
          {/* left */}
          <div
            className={styles.resultContainer}
            id="right"
            style={{ width: 500, height: 550 }}
          >
            <div className={styles.result}>
              <p
                className="
            border border-gray-800 border-2 
            shadow-xl rounded-xl 
            my-8 mx-32
            text-xl font-bold text-gray-800 text-center
            "
              >
                会話履歴
              </p>
              {/* デバッグ用の会話ダミー */}
              {paragraphs}
              {result.map((fact, index) => (
                <p
                  key={index}
                  className="
            border border-gray-800 border-2 
            shadow-xl rounded-xl 
            p-6 m-4
            text-xl font-bold text-gray-800
            "
                >
                  {fact}
                </p>
              ))}
            </div>

            <div id="result"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
