import React, { useEffect } from "react";
import style from "./index.module.css";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
function resultList() {
  const [resultList, setResultList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getResultList = async () => {
    const chachedData = localStorage.getItem("resultListData");
    if (chachedData) setResultList(JSON.parse(chachedData));
    const res = await fetch("/api/getResultList", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.table(data);
    localStorage.setItem("resultListData", JSON.stringify(data));
    setResultList(data);
    setLoading(false);
  };

  const playThisOdai = async (id) => {
    //gameページに遷移
    router.push({
      pathname: "/game",
      query: { OdaiId: id },
    });
  };

  const loadThisResult = async (id) => {
    //resultページに遷移
    router.push({
      pathname: "/result",
      query: { resultId: id },
    });
  };

  useEffect(() => {
    getResultList();
  }, []);

  return (
    <div>
      <Head>
        <title>わからせンクラテス！ 対戦履歴検索</title>
      </Head>
      <Sidebar />
      <main className={global.container}>
        {resultList.length == 0 ? (
          <p>対戦履歴データ取得中･･･</p>
        ) : (
          <p>対戦履歴データ</p>
        )}
        <CircularProgress
          size={20}
          className={loading ? "opacity-100" : "opacity-0"}
        />
        <div className={style.resultListContainer}>
          {resultList.map((item) => {
            return (
              <div
                key={item.id}
                className="border-b-4 border-r-4 border p-2 rounded-2xl my-4"
              >
                <p className={style.player}>プレイヤー名</p>
                <p>
                  {item.name}
                  <span className={style.san}>さん</span>
                </p>
                <p>お題:{item.odai}</p>
                <p>スコア:{item.score}点</p>
                {/* <p>{item.odai}<p> */}
                {/* <p>{item.NG}<p> */}

                <Button
                  variant="contained"
                  className="bg-blue-500 mb-2"
                  onClick={() => loadThisResult(item.id)}
                >
                  この対戦履歴を見る！
                </Button>
                <br />
                <Button
                  variant="contained"
                  className="bg-blue-500"
                  onClick={() => playThisOdai(item.OdaiId)}
                >
                  このお題で遊ぶ！
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default resultList;
