import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";

let score = 0;
function debug() {
  return (
    <div>
      <Head>
        <title>デバッグ</title>
        <link rel="icon" href="/gpt.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Sidebar />
      <main>
        <div className={global.container}>デバッグ用ページやで</div>
        <input onChange={(e) => (score = Number(e.target.value))} />
        <div>{score}</div>
        {/* <button onClick={() => addRanking("test", score)}>
          ランキング更新
        </button> */}
        <p>デバッグ用ページ</p>
      </main>
    </div>
  );
}

export default debug;
