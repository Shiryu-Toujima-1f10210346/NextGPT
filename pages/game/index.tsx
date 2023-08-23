import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Sideber from "../../components/Sidebar";
import { useRef } from "react";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState<string[]>([]); // add type annotation for result state
  const [limit, setLimit] = useState(10);
  const [odai, setOdai] = useState("バナナ");
  const [NG, setNG] = useState<string[]>(["黄色", "甘い", "酸っぱい"]); // add type annotation for NG state
  const [alert, setAlert] = useState("");
  const [thiking, setThiking] = useState(false);
  const [debug, setDebug] = useState(false);
  const [win, setWin] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
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
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userInput,
          odai: odai,
          NG: NG,
        }),
      });

      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      //data.result.contentにodaiが含まれていたら
      if (data.result.includes(odai)) {
        //勝ち
        setWin(true);
        //result配列の一番最後の要素の背景を変える
      }

      // setResult(data.result);
      //dataの中身をわかりやすく表示
      setResult([
        ...result,
        "あなた:" + event.target.elements.user.value,
        "GPT:" + data.result,
      ]);
      setLimit(limit - 1);
      setThiking(false);
      //0.5秒後にスクロール､その要素の背景を変える
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
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
      <Sideber />
      <main className={styles.main}>
        <div
          className="
        sm:flex sm:flex-row sm:justify-strech sm:items-center
         border-red-800 border-4 border-solid

         "
        >
          <div className={styles.left}>
            <div
              className="
              left 
              text-center
              border-2 border-black mt-2
              "
            >
              <div
                id="title"
                className="text-3xl font-bold"
                style={{ color: win ? "red" : "" }}
              >
                {win ? "あなたの勝ちです！" : "GPTからお題を引き出せ！"}
                <button onClick={() => setDebug(!debug)}>@</button>
              </div>

              <div className={`flex flex-row ${debug ? "hidden" : ""}`}>
                {/* お題設定 */}
                <div>
                  <p className="m-2">デバッグ用:お題を設定</p>
                  <input
                    type="text"
                    placeholder="お題を入力してください"
                    value={odai}
                    onChange={(e) => setOdai(e.target.value)}
                    className="border-2 border-black text-center"
                  />
                </div>

                {/* NGワード設定 */}
                <div>
                  <p className="m-2">デバッグ用:NGワードを設定</p>
                  <input
                    type="text"
                    placeholder="NGワードを入力してください"
                    value={NG}
                    onChange={(e) => setNG([e.target.value])}
                    className="border-2 border-black text-center"
                  />
                </div>
              </div>
              <p
                id="odai"
                className="
        text-lg 
        "
              >
                お題:{odai} NGワード:{NG.join(",")}
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
                  className="border-2 border-black text-center
        "
                />
                <input
                  type="submit"
                  id="submit"
                  value="送信"
                  disabled={
                    limit <= 0 || userInput.length === 0 || thiking || win
                  }
                />
              </form>
              <div
                id="limit"
                className="
        lg:m-6 m-2 p-2 mx-16
        border rounded-xl border-gray-800 border-2 shadow-xl
        font-bold text-xl text-gray-800 text-center
        "
              >
                {limit <= 0 ? (
                  <p>もう終わりです</p>
                ) : thiking ? (
                  <p>GPTくん考え中</p>
                ) : (
                  <p>残り{limit}回</p>
                )}
              </div>
            </div>
          </div>{" "}
          {/* left */}
          <div className={styles.resultContainer} id="right">
            <div className={styles.result}>
              <p
                className="
            border border-gray-800 border-2 
            shadow-xl rounded-xl 
            my-8 mx-16
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
                  style={{
                    backgroundColor: fact.includes(odai) ? "#f79999" : "",
                  }}
                >
                  {fact}
                </p>
              ))}
              <div ref={resultRef} />
            </div>

            <div id="result"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
