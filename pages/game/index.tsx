import { useState } from "react";
import styles from "./index.module.css";
import Sideber from "../../components/Sidebar";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { TwitterShareButton, TwitterIcon } from "react-share";
import global from "../../styles/global.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState<number>(10);
  const [odai, setOdai] = useState<string>("バナナ");
  const [NG, setNG] = useState<string[]>(["黄色", "甘い", "酸っぱい"]);
  const [alert, setAlert] = useState<string>("");
  const [thiking, setThiking] = useState<boolean>(false);
  const [debug, setDebug] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [ranking, setRanking] = useState([]);
  const [userScore, setUserScore] = useState<number>(700);
  const [count, setCount] = useState<number>(0);
  const [exampleHide, setExampleHide] = useState<boolean>(false);

  const setExampleHideCache = () => {
    const exampleHideCache = localStorage.getItem("exampleHide");
    if (exampleHideCache) setExampleHide(JSON.parse(exampleHideCache));
  };

  useEffect(() => {
    setExampleHideCache();
  }, []);
  const router = useRouter();
  const [example, setExample] = useState([
    {
      userInput: "",
      gptOutput: "このサイトはChatGPTとお題当てゲームができるサイトです",
    },
    {
      userInput: "",
      gptOutput:
        "ルール お題の単語とNGワードに近い言葉を使わずにGPTからお題の単語を引き出そう！",
    },
    {
      userInput: "",
      gptOutput: "例) お題: 寿司",
    },
    {
      userInput: "",
      gptOutput: "NGワード: 寿司 回転 シャリ ネタ",
    },
    {
      userInput:
        "日本の料理で､皿に盛った､酢飯の上に､生魚や野菜などをのせたもの",
      gptOutput: "",
    },
    {
      userInput: "",
      gptOutput: "それは寿司ですか？",
    },
    {
      userInput: "正解！これでクリアです！",
      gptOutput: "",
    },
    {
      userInput: "",
      gptOutput: "さあ君も色々なお題にチャレンジしてみよう！",
    },
  ]);

  const id = router.query.id;
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

  const submitResult = async () => {
    console.log("対戦結果を送信します");
    const res = await fetch("/api/addResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    if (id) {
      getSpecificOdai();
    }
  }, [id]);

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
        }, 2000);
      } else {
        setCount(count + 1);
        setUserScore(Math.floor(userScore * ((limit - count - 1) / limit)));
      }

      //userの入力をuserというkeyでresultに追加､GPTの回答をGPTというkeyでresultに追加
      setResult([...result, { userInput: userInput, gptOutput: data.result }]);
      console.table(result);
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
      <Sideber />
      <main className={`${global.container} ${styles.main} `}>
        <Modal isOpen={debug} ariaHideApp={false} style={customStyles}>
          <button onClick={() => setDebug(!debug)}>閉じる</button>
          <div className={`${debug ? "" : "hidden"}`}>
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
          </div>
        </Modal>
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
                //クエリの初期化
                window.location.href = "/game";
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
                <button onClick={() => setDebug(!debug)}>デバ</button>
              </div>

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
                  className="border-2 border-gray-600 text-center rounded-full text-xl lg:text-3xl lg:w-96"
                />
                <input
                  type="submit"
                  id="submit"
                  value={`残り${limit}回 ➣`}
                  disabled={
                    limit <= 0 || userInput.length === 0 || thiking || win
                  }
                  className="text-center rounded-full lg:text-3xl lg:w-96"
                />
              </form>
              <p
                className="
            border-gray-800 border-2 
            shadow-xl rounded-xl 
            my-4 mx-16 px-4
            text-xl font-bold text-gray-800 text-center lg:hidden
            "
              >
                会話履歴
              </p>

              {/* <div>
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
              </div> */}

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
              <div>
                {example.map((example, key) => (
                  <div key={key} className={exampleHide ? "hidden" : ""}>
                    <div className="my-4">
                      <div
                        className={`flex flex-row-reverse ${
                          example.userInput.length == 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="text-xl lg:text-3xl text-right mx-2 px-4 py-1 bg-blue-500 text-white rounded-2xl border-2 border-gray-300">
                          あなた
                        </div>
                      </div>
                      <div
                        className={`flex flex-row-reverse ${
                          example.userInput.length == 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="relative bg-blue-500 p-4 rounded-2xl  border-r-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                          <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 -z-10"></div>
                          <p
                            className={`text-xl lg:text-3xl text-left text-white ${
                              example.userInput.length > 20
                                ? "text-2xl"
                                : "mx-10"
                            } `}
                          >
                            {example.userInput}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="my-4">
                      <div
                        className={`flex ${
                          example.gptOutput.length == 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="text-xl lg:text-3xl text-left mx-2 px-4 py-1 bg-gray-100 rounded-2xl border-2 border-gray-300">
                          GPTくん
                        </div>
                      </div>
                      <div
                        className={`flex ${
                          example.gptOutput.length == 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="relative bg-gray-100 p-4 rounded-2xl border-l-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 left-11 -mr-3 -mb-3 w-6 h-6 bg-gray-100 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                          <div className="absolute bottom-0 left-11 -mr-3 -mb-3 w-6 h-6 bg-gray-100 transform rotate-45 -z-10"></div>
                          <p
                            className={`text-gray-800 text-xl lg:text-3xl text-left ${
                              example.gptOutput.length > 20
                                ? "text-2xl"
                                : "mx-10"
                            } `}
                          >
                            {example.gptOutput}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center">
                  <button
                    className="bg-gray-200 rounded-full px-4 py-2 text-gray-8"
                    onClick={() => {
                      localStorage.setItem(
                        "exampleHide",
                        JSON.stringify(!exampleHide)
                      );
                      setExampleHide(!exampleHide);
                    }}
                  >
                    {exampleHide ? "説明を表示" : "説明を非表示"}
                  </button>
                </div>
              </div>
              {/* 会話履歴 */}
              {result.map((result, key) => (
                <div key={key}>
                  {result.userInput && result[key] != "" && (
                    <div>
                      <div className="flex flex-row-reverse">
                        <div className="text-xl lg:text-3xl text-right mx-2 px-4 py-1 bg-blue-500 text-white rounded-2xl border-2 border-gray-300">
                          あなた
                        </div>
                      </div>
                      <div className="flex flex-row-reverse ">
                        <div className="relative bg-blue-500 p-4 rounded-2xl border-r-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                          <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 -z-10"></div>
                          <p
                            className={`text-2xl lg:text-3xl text-left text-white ${
                              result[key]?.length > 20 ? "text-xl" : "mx-10"
                            } `}
                          >
                            {result.userInput}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {result.gptOutput && result[key] != "" && (
                    <div>
                      <div className="flex">
                        <div className="text-xl lg:text-3xl text-left mx-2 px-4 py-1 bg-gray-100 rounded-2xl border-2 border-gray-300">
                          GPTくん
                        </div>
                      </div>
                      <div className="flex">
                        <div className="relative bg-gray-100 p-4 rounded-2xl shadow-xl border-l-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 left-11 -mr-3 -mb-3 w-6 h-6 bg-gray-100 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                          <div className="absolute bottom-0 left-11 -mr-3 -mb-3 w-6 h-6 bg-gray-100 transform rotate-45 shadow-xl -z-10"></div>
                          <p
                            className={`text-gray-800 text-xl lg:text-3xl text-left ${
                              result[key]?.length > 20 ? "text-2xl" : "mx-10"
                            } `}
                          >
                            {result.gptOutput}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
