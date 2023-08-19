import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { addRanking } from "../../repo/rankingRepo";

let score = 0;

async function fetchAddRank() {
  const res = await fetch("/api/addRank", {
    method: "POST",
    body: JSON.stringify({ name: "デバッグ", score: score }),
  });
}

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
        <div className={global.container}>
          デバッグ用ページやで
          <input
            onChange={(e) => (score = Number(e.target.value))}
            className="border-2"
          />
          <div>{score}</div>
          <button
            onClick={() => fetchAddRank()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ランキング更新
          </button>
          <p>デバッグ用ページ</p>
        </div>
      </main>
    </div>
  );
}

export default debug;
