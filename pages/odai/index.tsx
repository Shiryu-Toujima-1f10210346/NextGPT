import React from "react";
import { useState, useEffect } from "react";
import Sideber from "../../components/Sidebar";
import Head from "next/head";
import global from "../../styles/global.module.css";

export default function index() {
  const [odai, setOdai] = useState([
    /*{ odai: "バナナ", ng: ["黄色", "甘い", "酸っぱい"], limit: 10 },*/
  ]);

  const fetchOdaiList = async () => {
    const res = await fetch("/api/getOdaiList");
    const data = await res.json();
    console.table(data);
    const OdaiList = data.map((item) => ({
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

  return (
    <div>
      <Head>
        <title>お題一覧</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Sideber />
      <div className={global.container}>
        <div>{odai.length == 0 ? <p>お題取得中･･･</p> : <p>お題一覧</p>}</div>
        <ul>
          {odai.map((item) => (
            <div className="border-2 border-gray-500 p-4 rounded-xl m-2">
              <li key={item.odai}>お題: {item.odai}</li>
              <li key={item.ng}>NGワード: {item.ng.join("､")}</li>
              <li key={item.limit}>制限時間: {item.limit}回</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
