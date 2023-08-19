import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";

function debug() {
  //scoreはNumber型
  const [score, setScore] = useState<Number>(0);
  const [name, setName] = useState<String>("testUser");
  const [odai, setOdai] = useState<String>("バナナ");
  const [userInput, setUserInput] = useState<String>("ばなな");
  let result = "待機";
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

  async function fetchJudge() {
    const res = await fetch("/api/judge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userInput, odai: odai }),
    });
    console.log("res:");
    console.log(res);
    result = await res.json();
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
          <p>デバッグ用ページ</p>
          <input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="border-2"
          />
          <input
            placeholder="score"
            onChange={(e) => setScore(Number(e.target.value))}
            className="border-2"
          />

          <div>{name}さん</div>
          <div>{score.toString()}点</div>
          <button
            onClick={() => fetchAddRank()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            ランキング更新
          </button>
          <br />
          <p>NG判別</p>
          <input
            placeholder="お題"
            onChange={(e) => setOdai(e.target.value)}
            className="border-2"
          />
          <input
            placeholder="ユーザー入力"
            onChange={(e) => setUserInput(e.target.value)}
            className="border-2"
          />
          <div>{odai}</div>
          <div>{userInput}</div>
          <button
            onClick={() => fetchJudge()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            判定
          </button>
          <br />
          <div>{result}</div>
        </div>
      </main>
    </div>
  );
}

export default debug;
