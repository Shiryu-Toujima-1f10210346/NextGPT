import { useState } from "react";
import Sideber from "../../components/Sidebar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { TwitterShareButton, TwitterIcon } from "react-share";
import global from "../../styles/global.module.css";
import Conv from "../../components/conversation";
import styles from "./index.module.css";
import { CircularProgress } from "@mui/material";
import Head from "next/head";
import Button from "@mui/material/Button";
import { json } from "stream/consumers";
import { type } from "os";
export default function Home() {
  const [odai, setOdai] = useState<string>("");
  const [NG, setNG] = useState<string[]>([""]);
  const [userName, setUserName] = useState<string>("");
  const [userScore, setUserScore] = useState<number>(0);
  const [tmp, setTmp] = useState<string>("");
  const [result, setResult] = useState([]);
  const [fetching, setFetching] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [odaiId, setOdaiId] = useState<number>(0);
  const router = useRouter();
  const id = Number(router.query.resultId);

  const getResult = async () => {
    console.log("getresult");
    console.log("id:" + id);
    try {
      const res = await fetch("/api/getResult?resultId=" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.table(data);
      console.log(data.result);

      console.table(JSON.parse(data.result));
      console.log(typeof JSON.parse(data.result));
      setUserName(data.name);
      setResult(JSON.parse(data.result));
      setFetching(false);
      setOdai("ここにお題");
      setNG(["ここにNGワード"]);
      setOdaiId(data.odaiId);
      return true;
    } catch (e) {
      console.log(e);
      setOdai("IDが不正です!");
      setNG(["URLのIDを再確認してください"]);
      setFetching(false);
      setError(true);
      return false;
    }
  };

  const playThisOdai = async (id: number) => {
    //gameページに遷移
    router.push({
      pathname: "/game",
      query: { resultId: id },
    });
  };

  useEffect(() => {
    if (id) getResult();
    else {
      setOdai("IDが不正です!");
      setNG(["URLのIDを再確認してください"]);
      setFetching(false);
      setError(true);
    }
  }, [id]);
  return (
    <div>
      <Head>
        <title>わからせンクラテス！ 対戦履歴</title>
      </Head>
      <Sideber />
      <main className={`${global.container} ${styles.main} `}>
        <div
          className="
        sm:flex sm:flex-row sm:justify-strech sm:items-center
           rounded-xl lg:mt-16 
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
              <p
                id="odai"
                className="
              lg:text-4xl text-2xl
              lg:mb-4 mb-2 mt-2
              "
              >
                {error ? "" : "お題:"}
                {odai}
              </p>
              <p
                id="odai"
                className="
              lg:text-2xl text-xl
              lg:mb-4 mb-2
              "
              >
                {error ? "" : "NGワード:"}
                {NG.join(",")}
              </p>
              <span
                id="score"
                className="lg:text-2xl text-xl flex justify-around"
              >
                {error
                  ? ""
                  : userScore > 0
                  ? `スコア:${userScore}点`
                  : "スコアなし"}
                {error && (
                  <div>
                    <span>問い合わせ先:</span>
                    <a
                      href="https://twitter.com/shiryu_dev"
                      className="font-bold text-blue-500 hover:text-blue-400 underline text-xl"
                    >
                      Twitter(X)
                    </a>
                  </div>
                )}
              </span>

              <p
                className="
            border-gray-800 border
            shadow-xl rounded-xl 
            my-4 mx-16 px-4
            text-xl font-bold text-gray-800 text-center lg:hidden
            "
              >
                会話履歴
              </p>
              <Button
                variant="contained"
                className="bg-blue-500"
                onClick={() => playThisOdai(odaiId)}
                hidden={error}
              >
                このお題で遊ぶ！
              </Button>
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
              {fetching && (
                <div className="flex justify-center items-center mt-10">
                  <CircularProgress />
                </div>
              )}
              {result.map((result, key) => (
                <div key={key}>
                  {result.userInput && result[key] != "" && (
                    <div>
                      <div className="flex flex-row-reverse">
                        <div className="text-xl lg:text-3xl text-right mx-2 px-4 py-1 bg-blue-500 text-white rounded-2xl border-2 border-gray-300">
                          {userName}さん
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
              {/* 会話履歴 */}
            </div>

            <div id="result"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
