import { useState } from "react";
import styles from "./index.module.css";
import Sideber from "../../components/Sidebar";
import { useRef } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { TwitterShareButton, TwitterIcon } from "react-share";
import globalCss from "../../styles/global.module.css";
import Conv from "../../components/conversation";
import { examples } from "../../components/examples";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CircularProgress } from "@mui/material";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

export default function Home() {
  const [game, setGame] = useState<"win" | "lose" | "playing">("playing");
  const [userInput, setUserInput] = useState<string>("");
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState<number>(10);
  const [odai, setOdai] = useState<string>("お題を取得中･･･");
  const [NG, setNG] = useState<string[]>(["ちょっとまってね"]);
  const [alert, setAlert] = useState<string>("");
  const [thinking, setThinking] = useState<boolean>(false);
  const [debug, setDebug] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const [canRegister, setCanRegister] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [ranking, setRanking] = useState([]);
  const [userScore, setUserScore] = useState<number>();
  const [count, setCount] = useState<number>(0);
  const [exampleHide, setExampleHide] = useState<boolean>(false);
  const [example, setExample] = useState(examples);
  const [resultSaved, setResultSaved] = useState<boolean>(false);
  const [resultId, setResultId] = useState<number>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [resultURLShare, setResultURLShare] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const setExampleHideCache = () => {
    const exampleHideCache = localStorage.getItem("exampleHide");
    if (exampleHideCache) setExampleHide(JSON.parse(exampleHideCache));
  };

  useEffect(() => {
    setExampleHideCache();
  }, []);
  const router = useRouter();

  const id = router.query.OdaiId;

  const handleCloseModal = () => {
    window.location.href = "/game";
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    for (let i = 0; i < NG.length; i++) {
      if (NG[i] === "") continue;
      if (value.includes(NG[i]) || value.includes(odai)) {
        setAlert("NGワードが含まれています");
        return;
      } else {
        setAlert("");
      }
    }
    //アラート以外にする
  };

  const cacheOdai = () => {
    const cacheOdai = localStorage.getItem("odai");
    const cacheNG = localStorage.getItem("NG");
    const cacheLimit = localStorage.getItem("limit");
    const cacheScore = localStorage.getItem("score");
    if (cacheOdai) setOdai(cacheOdai);
    if (cacheNG) setNG(JSON.parse(cacheNG));
    if (cacheLimit) setLimit(JSON.parse(cacheLimit));
    if (cacheScore) setUserScore(JSON.parse(cacheScore));
  };

  const getSpecificOdai = async () => {
    cacheOdai();
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
    localStorage.setItem("odai", data.odai);
    localStorage.setItem("NG", JSON.stringify(data.ng));
    localStorage.setItem("limit", JSON.stringify(data.limit));
    localStorage.setItem("score", JSON.stringify(data.score));
  };

  const fetchRanking = async () => {
    console.log("Rankingdata取得中");
    const res = await fetch("/api/getRanking");
    const data = await res.json();
    console.log("↓Rankingdata↓");
    console.table(data);
    const newRanking = data.map((item: { name: String; score: Number }) => ({
      name: item.name,
      score: item.score,
    }));

    compareRanking();
    setRanking(newRanking);
  };

  const compareRanking = async () => {
    //RankingにuserScoreが勝っているか
    for (let i = 0; i < ranking.length; i++) {
      console.log(ranking[i].score);
      if (userScore > ranking[i].score) {
        console.log(userScore + ">" + ranking[i].score);
        console.log("ランキングに登録できます");
        setCanRegister(true);
        return;
      }
    }
    if (!canRegister) {
      console.log("canRegister:" + canRegister);
      return;
    }
    if (userScore == 0) {
      console.log("0点でした");
      setCanRegister(false);
      return;
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
    console.log("regRank" + data);
  };

  const submitResult = async () => {
    setSubmitting(true);
    console.log("対戦結果を送信します");
    const jsonResult = JSON.stringify(result);
    const res = await fetch("/api/submitResult", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        odai: odai,
        NG: NG,
        playerName: userName,
        odaiId: id ? id : "0",
        result: jsonResult,
        score: userScore,
        count: count,
      }),
    });
    registerRanking();
    const data = await res.json();
    console.log(data);
    console.log("対戦履歴ID:" + data.id);
    setResultSaved(true);
    setResultId(data.id);
  };

  useEffect(() => {
    if (id) {
      console.log("idがあります");
      getSpecificOdai();
    } else {
      console.log("idがありません");
      randomOdai();
    }
  }, [id]);

  const randomOdai = async () => {
    console.log("ランダムなお題を取得中");
    const res = await fetch("/api/getRandomOdai");
    const data = await res.json();
    console.log(data);
    setOdai(data.odai);
    setNG(data.ng);
    setLimit(data.limit);
    setUserScore(data.score);
    setCount(0);
    setResult([]);
    setGame("playing");
    localStorage.setItem("odai", data.odai);
    localStorage.setItem("NG", JSON.stringify(data.ng));
    localStorage.setItem("limit", JSON.stringify(data.limit));
    localStorage.setItem("score", JSON.stringify(data.score));
    router.push("/game?OdaiId=" + data.id);
  };

  async function onSubmit(event) {
    event.preventDefault();
    //エラー処理
    if (userInput.trim().length === 0) {
      setAlert("文字を入力してください");
      return;
    }
    //userInputの文字列にNGの文字列が含まれていたら
    for (let i = 0; i < NG.length; i++) {
      if (NG[i] === "") continue;
      if (userInput.includes(NG[i]) || userInput.includes(odai)) {
        setAlert("NGワードが含まれています");
        return;
      } else {
        setAlert("");
      }
    }

    //残り回数が0以下だったら
    if (limit <= 0) {
      setAlert("もう終わりです");
      return;
    }

    setThinking(true);

    try {
      console.log({ user: userInput + " NGワードは" + NG });
      console.log(NG);
      const response = await fetch("/api/judge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: userInput,
          odai: odai,
          NG:
            JSON.stringify(NG) === JSON.stringify([])
              ? "NGワードはありません｡"
              : NG,
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
          setGame("win");
        }, 2000);
        setModalIsOpen(true);
      } else {
        setCount(count + 1);
        setUserScore(Math.floor(userScore * ((limit - count - 1) / limit)));
      }

      //userの入力をuserというkeyでresultに追加､GPTの回答をGPTというkeyでresultに追加
      setResult([...result, { userInput: userInput, gptOutput: data.result }]);
      console.table(result);
      setLimit(limit - 1);

      //0.5秒後にスクロール､その要素の背景を変える
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      setThinking(false);
      setUserInput("");
      setIsEmpty(false);
      console.log("done");
    } catch (error) {
      // Consider implementing your own error handling logic here
      setThinking(false);
      console.error(error);
      setAlert(error.message);
    }
  }

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
      borderRight: "solid 6px #172439",
      borderBottom: "solid 6px #172439",
      borderRadius: "15px",
      fontSize: "1.5rem",
    },
  };

  const debugModal = () => {
    return (
      <div>
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
      </div>
    );
  };

  //const resultURL = "localhost:3000/result"; //本番環境では変更する
  const resultURL = "wakarates.vercel.app/result";

  const copyToClipboard = async () => {
    await global.navigator.clipboard.writeText(
      resultURL + "?resultId=" + resultId
    );
  };

  const submitModal = () => {
    return (
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold">
          {canRegister ? "ランキング入り！" : "勝利！"}
        </p>
        <p className="text-2xl font-bold">スコア:{userScore}点</p>
        <button
          onClick={() => {
            fetchRanking();
          }}
          hidden={!canRegister}
        >
          ランキング登録
        </button>
        <button
          onClick={() => {
            //クエリの初期化
            window.location.href = "/game";
          }}
          hidden={!canRegister}
        >
          登録しない
        </button>
        <div>
          <input
            type="text"
            className="border-2"
            placeholder="名前を入力 (10文字以内)"
            maxLength={10}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={() => registerRanking()}
            className={`${userName.length > 0 ? "" : "text-gray-400"}`}
            hidden={!canRegister}
          >
            登録
          </button>
        </div>

        <div hidden={!resultSaved}>
          <TwitterShareButton
            url={" "}
            // url={` ${
            //   resultURLShare
            //     ? resultURL + "?resultId=" + resultId
            //     : "wakarates.vercel.app"
            // }`}
            title={`知を証明し､字飛茶(じぴてぃ)を救出しました！\nお題: ${odai}\nスコア: ${userScore}点\n${
              resultURLShare ? "対戦履歴: " : "あなたもやってみて！"
            }${
              resultURLShare
                ? resultURL + "?resultId=" + resultId
                : "wakarates.vercel.app"
            }\n\n#WAKARATES #INIADFES`}
            // hashtags={["INIADFES", "WAKARATES"]}
            className="mt-4 flex items-center"
          >
            <TwitterIcon size={40} round={true} />
            <span>結果をシェア</span>
          </TwitterShareButton>
          <div>
            対戦履歴もシェアする
            <input
              type="checkbox"
              onChange={() => setResultURLShare(!resultURLShare)}
            />
          </div>
        </div>
        <button
          onClick={() => submitResult()}
          disabled={userName.length == 0 || submitting}
          hidden={resultSaved}
          className={`${
            !submitting ? "text-blue-500 hover:text-blue-700" : "text-gray-500"
          }`}
        >
          対戦結果を保存
        </button>
        <button
          onClick={() => {
            setModalIsOpen(false);
          }}
          className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 p-0.5 rounded-full"
        >
          <CloseIcon />
        </button>
        <div hidden={!resultSaved}>
          <Tooltip title="Copy" placement="top" arrow>
            <IconButton
              color="primary"
              size="small"
              onClick={() => copyToClipboard()}
            >
              対戦履歴のURLをコピー
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    );
  };
  const gameOverModal = () => {
    return (
      <div>
        <p>ゲームオーバー</p>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => {
            window.location.href = "/game" + "?Odaid=" + id;
          }}
        >
          もう一度同じお題で遊ぶ
        </button>
        <button
          className="bg-blue-500 text-white rounded-full px-4 py-2"
          onClick={() => {
            router.push("/odai");
          }}
        >
          別のお題で遊ぶ
        </button>
      </div>
    );
  };
  return (
    <div>
      <Sideber />
      <main className={`${globalCss.container} ${styles.main} `}>
        <Modal
          isOpen={debug && modalIsOpen}
          ariaHideApp={false}
          style={customStyles}
          onRequestClose={handleCloseModal}
        >
          {debugModal()}
        </Modal>
        <Modal
          isOpen={game === "win" && modalIsOpen}
          ariaHideApp={false}
          style={customStyles}
          onRequestClose={handleCloseModal}
        >
          {submitModal()}
        </Modal>
        <Modal
          isOpen={game === "lose" && modalIsOpen}
          ariaHideApp={false}
          style={customStyles}
          onRequestClose={handleCloseModal}
        >
          {gameOverModal()}
        </Modal>
        <div
          className="
           rounded-xl lg:mt-16 
         "
        >
          <div className={styles.left}>
            <div
              className="
              lg:px-48  lg:m-4 
              text-center  rounded-xl 
              "
            >
              {/* <div
                id="title"
                className="
                text-2xl lg:text-3xl font-bold
                lg:mb-8
                "
                style={{ color: game === "win" && "red" }}
              >
                {game === "win"
                  ? "あなたの勝ちです！"
                  : "GPTからお題を引き出せ！"}
              </div> */}

              <div hidden={true}>
                <button
                  onClick={() => {
                    setGame("win");
                    setModalIsOpen(true);
                  }}
                >
                  @
                </button>
                <button
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
                >
                  デバッグ
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-xl px-2  py-1 m-2 lg:p-4 relative">
                {/* 右上にXボタン */}
                <button
                  onClick={() => {
                    randomOdai();
                    setOdai("お題を変更･･･");
                    setNG(["ちょっとまってね"]);
                  }}
                  className="absolute top-0 right-0 "
                >
                  <span className="bg-red-200 mt-2 mr-2 px-4 rounded-full">
                    お題を変更
                  </span>
                  <ChangeCircleIcon fontSize="large" />
                </button>
                <div
                  id="odai"
                  className="
              lg:text-4xl text-2xl
              lg:mb-4 mb-2 font-serif font-bold
              mt-4 lg:mt-0
              "
                >
                  ― お題 ―<br />
                  <p className="text-4xl lg:text-5xl">｢{odai}｣</p>
                </div>
                {/* <button
                  onClick={() => {
                    randomOdai();
                  }}
                  className="
                lg:text-2xl text-xl
                lg: font-serif font-bold
                "
                >
                  お題を変更
                </button> */}
                <p
                  id="odai"
                  className="
              lg:text-2xl text-xl
              lg:mb-4 mb-2 font-serif font-bold
              "
                >
                  NGワード:{NG.join(",")}
                </p>
                <span
                  id="score"
                  className="lg:text-2xl text-xl flex justify-around"
                >
                  {userScore > 0 ? `スコア:${userScore}点` : "スコアなし"}
                  <span>制限回数:残り{limit}回</span>
                </span>
                <p id="alert" className="text-xl mb-4">
                  {alert}
                </p>
              </div>
              {/* <p
                className="
            border-gray-800 border
            shadow-xl rounded-xl
            my-4 mx-16 px-4
            text-xl font-bold text-gray-800 text-center lg:hidden
            "
              >
                会話履歴
              </p> */}

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
                ) : thinking ? (
                  <p>GPTくん考え中</p>
                ) : (
                  <p>残り{limit}回</p>
                )}
              </div> */}
            </div>
          </div>
          <div className={styles.resultContainer} id="right">
            <div className="hidden lg:block h-2/5 lg:h-1/3" hidden={isEmpty} />
            <div className={styles.result}>
              {/*  浮くやつ
              <div className="mx-6">
                {example.map((example, key) =>
                  example.userInput.length > 0 ? (
                    <div key={key} className={exampleHide ? "hidden" : ""}>
                      <div className="my-16 ml-32">
                        <Conv target={"user"} text={example.userInput} />
                      </div>
                    </div>
                  ) : (
                    <div key={key} className={exampleHide ? "hidden" : ""}>
                      <div className="my-16 mr-32">
                        <Conv target={"bot"} text={example.gptOutput} />
                      </div>
                    </div>
                  )
                )}
              */}
              {/* デバッグ用の会話ダミー */}
              <div>
                {example.map((example, key) => (
                  <div key={key} className={exampleHide ? "hidden" : ""}>
                    <div className="my-4">
                      {/* <div
                        className={`flex flex-row-reverse ${
                          example.userInput.length == 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="text-xl lg:text-3xl text-right mx-2 px-4 py-1 bg-blue-500 text-white rounded-2xl border-2 border-gray-300">
                          あなた
                        </div>
                      </div> */}
                      <div
                        className={`flex flex-row-reverse ${
                          example.userInput.length == 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="relative w-2/3 ml-8 bg-blue-500 p-4 rounded-2xl  border-r-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                          <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 -z-10"></div>
                          <p
                            className={`text-xl lg:text-3xl text-left text-white ${
                              example.userInput.length > 200 ? "text-2xl" : ""
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
                        <div className="text-lg lg:text-3xl text-left px-4 py-1">
                          ンクラテス
                        </div>
                      </div>
                      <div
                        className={`flex ${
                          example.gptOutput.length == 0 ? "hidden" : ""
                        }`}
                      >
                        <div className="relative w-2/3  bg-white p-4 rounded-2xl border-l-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 left-6 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 border-r-2 border-b-2 border-gray-400" />
                          <div className="absolute bottom-0 left-6 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 -z-10" />
                          <p
                            className={`text-gray-800 text-xl lg:text-3xl text-left ${
                              example.gptOutput.length > 200 ? "text-2xl" : ""
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
                    className="bg-gray-200 rounded-full mb-8 px-4 py-2 text-gray-8"
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
                        <div className="relative w-2/3  bg-blue-500 p-4 rounded-2xl border-r-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                          <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 -z-10"></div>
                          <p
                            className={`text-2xl lg:text-3xl text-left text-white ${
                              result[key]?.length > 20 ? "text-xl" : "mx-2"
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
                        <div className="text-xl lg:text-3xl text-left mx-2 px-4 py-1 bg-white rounded-2xl border-2 border-gray-300">
                          字飛茶
                        </div>
                      </div>
                      <div className="flex">
                        <div className="relative w-2/3  bg-white p-4 rounded-2xl shadow-xl border-l-4 border-b-4 mt-1 border-gray-400">
                          <div className="absolute -bottom-0.5 left-11 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
                          <div className="absolute bottom-0 left-11 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 shadow-xl -z-10"></div>
                          <p
                            className={`text-gray-800 text-xl lg:text-3xl text-left ${
                              result[key]?.length > 20 ? "text-2xl" : "mx-2"
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
            <div className="lg:hidden h-1/3" />

            <div id="result"></div>
          </div>
          {/* スマホ版 smartphone*/}
          <div className="flex justify-center bg-blue-500">
            <div className={`lg:hidden mb-8 py-2 ${styles.inputBar}`}>
              <form
                onSubmit={(e) => onSubmit(e)}
                className="px-2"
                autoComplete="off"
              >
                <input
                  style={{ WebkitAppearance: "none" }}
                  type="text"
                  name="user"
                  placeholder="お題を引き出そう！"
                  value={userInput}
                  onChange={(e) => onInputChange(e)}
                  className="border-2 border-gray-200 text-center rounded-xl text-md lg:text-3xl mx-2 p-1 w-2/3 lg:w-40"
                />

                <input
                  type="submit"
                  id="submit"
                  value="送信"
                  disabled={
                    limit <= 0 ||
                    userInput.length === 0 ||
                    thinking ||
                    game === "win"
                  }
                  className={`"text-center my-1 rounded-full lg:text-3xl w-16 lg:w-32 bg-blue-500 text-white "
                    ${
                      limit <= 0 ||
                      userInput.length === 0 ||
                      thinking ||
                      game === "win"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                />
                <CircularProgress
                  size={20}
                  className={thinking ? "" : "opacity-0"}
                />
              </form>
            </div>
          </div>
          {/* パソコン版 */}
          <div className="hidden lg:block mb-8 py-2">
            <form
              onSubmit={(e) => onSubmit(e)}
              className="px-2"
              autoComplete="off"
            >
              <input
                style={{ WebkitAppearance: "none" }}
                type="text"
                name="user"
                placeholder="お題を引き出そう！"
                value={userInput}
                onChange={(e) => onInputChange(e)}
                className="border-2 border-gray-200 text-center rounded-xl text-md lg:text-3xl mx-2 p-1 w-2/3 "
              />

              <input
                type="submit"
                id="submit"
                value="送信"
                disabled={
                  limit <= 0 ||
                  userInput.length === 0 ||
                  thinking ||
                  game === "win"
                }
                className={`"text-center rounded-full lg:text-3xl w-32 bg-blue-500 text-white "
                  ${
                    limit <= 0 ||
                    userInput.length === 0 ||
                    thinking ||
                    game === "win"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
              />
              <CircularProgress
                size={20}
                className={thinking ? "" : "opacity-0"}
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
