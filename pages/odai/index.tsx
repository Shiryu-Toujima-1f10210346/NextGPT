import React from "react";
import { useState, useEffect } from "react";
import Sideber from "../../components/Sidebar";
import Head from "next/head";
import global from "../../styles/global.module.css";
import style from "./index.module.css";

export default function index() {
  const [odai, setOdai] = useState([
    /*{ odai: "バナナ", ng: ["黄色", "甘い", "酸っぱい"], limit: 10 },*/
  ]);

  //test用
  /*
  for (let i = 0; i < 10; i++) {
    odai.push({
      id: i,
      odai: "バナナ",
      ng: ["黄色", "甘い", "酸っぱい"],
      limit: 10,
    });
  }*/

  const fetchOdaiList = async () => {
    const res = await fetch("/api/getOdaiList");
    const data = await res.json();
    console.table(data);
    const OdaiList = data.map((item) => ({
      id: item.id,
      odai: item.odai,
      ng: item.ng,
      limit: item.limit,
    }));
    setOdai(OdaiList);
  };

  //1分ごとにランキングデータを取得する
  useEffect(() => {
    fetchOdaiList();
    const interval = setInterval(() => {
      fetchOdaiList();
    }, 104000);
    return () => clearInterval(interval);
  }, []);

  const likeThisOdai = async (id: number) => {};

  const playThisOdai = async (id: number) => {
    //gameページに遷移
    window.location.href = "/game?id=" + id;
  };

  return (
    <div>
      <Head>
        <title>お題一覧</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Sideber />
      <main className={global.container}>
        <div className="border-2 border-gray-600 px-32 py-2 rounded-xl">
          {odai.length == 0 ? <p>お題取得中･･･</p> : <p>お題一覧</p>}
        </div>
        <ul className={style.odaiContainer}>
          {odai.map((item) => (
            <div className="border-2 border-blue-500 p-4 rounded-xl m-2 ease-in transition-all duration-300 hover:bg-blue-200">
              <li key={item.odai}>お題: {item.odai}</li>
              <li key={item.ng}>NGワード: {item.ng.join("､")}</li>
              <li key={item.limit}>制限時間: {item.limit}回</li>

              <button
                className={`${global.bluebtn} justify-end rounded-full px-8`}
                onClick={() => playThisOdai(item.id)}
              >
                Play
              </button>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
