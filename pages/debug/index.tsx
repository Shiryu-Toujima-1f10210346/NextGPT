import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";

function debug() {
  //scoreはNumber型
  const [score, setScore] = useState<Number>(0);
  const [name, setName] = useState<String>("testUser");
  async function fetchAddRank() {
    const res = await fetch("/api/addRank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, score: score }),
    });
    console.log(res);
  }
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
          <input
            placeholder="score"
            onChange={(e) => setScore(Number(e.target.value))}
            className="border-2"
          />
          <input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="border-2"
          />
          <div>{name}</div>
          <div>{score.toString()}</div>
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
