import React, { useEffect } from "react";
import style from "./index.module.css";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { CircularProgress, Button } from "@mui/material";
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
      query: { id: id },
    });
  };

  const loadThisResult = async (id) => {
    //resultページに遷移
    router.push({
      pathname: "/result",
      query: { id: id },
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
      <main>
        <div className={global.container}>
          {resultList.length == 0 ? (
            <p>対戦履歴データ取得中･･･</p>
          ) : (
            <p>対戦履歴データ</p>
          )}
          <CircularProgress
            size={20}
            className={loading ? "opacity-100" : "opacity-0"}
          />
          {resultList.map((item) => {
            return (
              <div key={item.id}>
                <p>{item.name}</p>
                <p>{item.score}</p>
                {/* <p>{item.odai}<p> */}
                {/* <p>{item.NG}<p> */}

                <Button onClick={() => loadThisResult(item.id)}>
                  この対戦履歴を見る！
                </Button>
                <br />
                <Button onClick={() => playThisOdai(item.OdaiId)}>
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
