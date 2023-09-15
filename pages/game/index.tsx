import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Sideber from "../../components/Sidebar";
import { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { get } from "http";
import Modal from "react-modal";
import { Container } from "@mui/material";
import { serialize } from "v8";
import { TwitterShareButton, TwitterIcon } from "react-share";

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
  const [canRegister, setCanRegister] = useState(false);
  const [userName, setUserName] = useState("");
  const [ranking, setRanking] = useState([]);
  const [userScore, setUserScore] = useState(700);
  const [count, setCount] = useState(0);

  const paragraphs = [];

  const router = useRouter();

  const { id } = router.query;

  const getSpecificOdai = async () => {
    const res = await fetch(`/api/getSpecificOdai?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(id);
    const data = await res.json();
    console.log(data);
    setOdai(data.odai);
    setNG(data.ng);
    setLimit(data.limit);
    setUserScore(data.score);
    setCount(0);
  };

  const fetchRanking = async () => {
    console.log("Rankingdata取得中");
    const res = await fetch("/api/getRanking");
    const data = await res.json();
    console.log("↓Rankingdata↓");
    console.table(data);
    const newRanking = data.map((item) => ({
      name: item.name,
      score: item.score,
    }));

    compareRanking();
    setRanking(newRanking);
  };

  const compareRanking = async () => {
    if (ranking.length == 0) setCanRegister(true);
    //RankingにuserScoreが勝っているか
    for (let i = 0; i < ranking.length; i++) {
      if (userScore > ranking[i].score) {
        setCanRegister(true);
        console.log("canRegister:" + canRegister);
      }
    }
    if (!canRegister) {
      console.log("canRegister:" + canRegister);
    }
    if (userScore == 0) {
      setCanRegister(false);
    }
  };

  const registerRanking = async () => {
    console.log("ランキングに登録します");
    const res = await fetch("/api/addRank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName, score: userScore }),
    });
    const data = await res.json();
    console.log(data);
    setCanRegister(false);
    setWin(false);
    window.location.href = "/rank";
  };

  useEffect(() => {
    if (id) {
      getSpecificOdai();
    }
  }, [id]);

  const n = 5; // 生成する<p>要素の数

  for (let i = 0; i < n; i++) {
    paragraphs.push(
      <div key={i}>
        <div className="relative bg-gray-100 p-4 rounded-full shadow-xl my-6">
          <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-gray-100 transform rotate-45 "></div>
          <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-gray-100 transform rotate-45 shadow-xl -z-10"></div>
          <p className="text-gray-800">ここに吹き出しのテキスト</p>
        </div>
      </div>
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
        fetchRanking();
        setInterval(() => {
          setWin(true);
        }, 3000);
      } else {
        setCount(count + 1);
        setUserScore(Math.floor(userScore * ((limit - count - 1) / limit)));
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

  const shareURL = "Jissyu-Example.com";
  const customStyles = {
    content: {
      marginTop: "20%",
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-40%",
      transform: "translate(-50%, -50%)",
      minWidth: "40%",
      borderRight: "solid 8px #f79999",
      borderBottom: "solid 8px #f79999",
      borderRadius: "15px",
    },
  };
  return (
    <div>
      <Head>
        <title>ほげほげ</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Sideber />
      <main className={styles.main}>
        <Modal isOpen={win} ariaHideApp={false} style={customStyles}>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-bold">ランキング入り！</p>
            <p className="text-2xl font-bold">スコア:{userScore}点</p>
            <p>canRegister:{canRegister.toString()}</p>
            <button
              onClick={() => {
                setCanRegister(true);
                console.log("canRegister:" + canRegister);
                fetchRanking();
              }}
            >
              ランキング登録
            </button>
            <button
              onClick={() => {
                setCanRegister(false);
                setWin(false);
                //クエリの初期化
                router.push("/game");
                console.log("canRegister:" + canRegister);
              }}
            >
              登録しない
            </button>
            <div className={canRegister ? "" : "hidden"}>
              <input
                type="text"
                className="border-2"
                placeholder="名前を入力 (10文字以内)"
                maxLength={10}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button onClick={() => registerRanking()}>登録</button>
            </div>
            <TwitterShareButton
              url={shareURL}
              title={`${userScore}点を獲得しました！\n `}
              hashtags={["INIADFES", "JissyuTeam5"]}
              className="mt-4 flex items-center"
            >
              <TwitterIcon size={40} round={true} />
              <span>結果をシェアする</span>
            </TwitterShareButton>
          </div>
        </Modal>
        <div
          className="
        sm:flex sm:flex-row sm:justify-strech sm:items-center
          border-2 rounded-xl border-solid lg:mt-16
         "
        >
          <div className={styles.left}>
            <div
              className="
              lg:p-12 lg:m-4
              left 
              text-center
              "
            >
              <div
                id="title"
                className="
                text-2xl lg:text-3xl font-bold
                lg:mb-8 
                "
                style={{ color: win ? "red" : "" }}
              >
                {win ? "あなたの勝ちです！" : "GPTからお題を引き出せ！"}
                <button onClick={() => setWin(!win)}>@</button>
              </div>

              {/* <div className={`flex flex-row ${debug ? "hidden" : ""}`}>
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
              </div> */}
              <p
                id="odai"
                className="
              lg:text-4xl text-2xl
              lg:mb-4 mb-2
              "
              >
                お題:{odai}
              </p>
              <p
                id="odai"
                className="
              lg:text-2xl text-xl
              lg:mb-4 mb-2
              "
              >
                NGワード:{NG.join(",")}
              </p>
              <p id="score" className="lg:text-2xl text-xl">
                {userScore > 0 ? `スコア:${userScore}点` : "スコアなし"}
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
                  className="border-2 border-gray-600 text-center rounded-full"
                />
                <input
                  type="submit"
                  id="submit"
                  value={`残り${limit}回 ➣`}
                  disabled={
                    limit <= 0 || userInput.length === 0 || thiking || win
                  }
                />
              </form>
              <p
                className="
            border-gray-800 border-2 
            shadow-xl rounded-xl 
            my-4 mx-16
            text-xl font-bold text-gray-800 text-center lg:hidden
            "
              >
                会話履歴
              </p>
              <div>
                {result.length > 0 && (
                  <p
                    className="
          border-gray-800 border-2 
          shadow-xl rounded-xl 
          lg:p-6 lg:m-4 p-2 m-2
          text-xl font-bold text-gray-800
        "
                    style={{
                      backgroundColor: result[result.length - 1].includes(odai)
                        ? "#f79999"
                        : "",
                    }}
                  >
                    {result.length > 0
                      ? result[result.length - 1]
                      : "GPTの回答"}
                  </p>
                )}
              </div>
              {/* <div
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
              </div> */}
            </div>
          </div>{" "}
          {/* left */}
          <div className={styles.resultContainer} id="right">
            <p
              className="
            border-gray-800 border-2 
            shadow-xl rounded-xl 
            my-4 mx-16 py-4
            text-2xl font-bold text-gray-800 text-center hidden lg:block 
            "
            >
              会話履歴
            </p>
            <div className={styles.result}>
              {/* デバッグ用の会話ダミー */}
              {paragraphs}
              {result.map((fact, index) => (
                <p
                  key={index}
                  className="
            border-gray-800 border-2 
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
