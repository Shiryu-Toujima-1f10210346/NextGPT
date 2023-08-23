import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";

function debug() {
  //scoreはNumber型
  const [score, setScore] = useState<Number>(0);
  const [name, setName] = useState<String>("testUser");
  const [odai, setOdai] = useState<String>("");
  const [userInput, setUserInput] = useState<String>("");
  const [result, setResult] = useState<String>("");
  const [ngList, setNgList] = useState<String[]>([]);
  const [ngTmp, setNgTmp] = useState<String>("");
  const [limit, setLimit] = useState<Number>(10);
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
    const data = await res.json();
    setResult(data.result);
  }

  async function fetchAddOdai() {
    const res = await fetch("/api/addOdai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ odai: odai, ng: ngList }),
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
          <p>デバッグ用ページ</p>
          <span className="border-2 border-gray-500 p-4 rounded-xl m-4">
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
          </span>
          <span className="border-2 border-gray-500 p-4 rounded-xl m-4">
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
            <div>お題:{odai}</div>
            <div>指示:{userInput}</div>
            <button
              onClick={() => fetchJudge()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              判定
            </button>
            <div>結果:{result ? "同じ単語" : "違う単語"}</div>
          </span>
          <span className="border-2 border-gray-500 p-4 rounded-xl m-4">
            <p>お題追加</p>
            <input
              placeholder="お題"
              onChange={(e) => setOdai(e.target.value)}
              className="border-2"
            />
            <input
              placeholder="NGワード"
              className="border-2"
              onChange={(e) => setNgTmp(e.target.value)}
            />
            <input
              placeholder="制限回数"
              className="border-2"
              onChange={(e) => setLimit(Number(e.target.value))}
            />
            <button
              onClick={() => {
                setNgList([...ngList, ngTmp]);
                setNgTmp("");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              NGワード追加
            </button>
            <div>
              お題:{odai} NGワード:{ngList.join(",")} 制限回数:
              {limit.toString()}
            </div>
            <button
              onClick={() => fetchAddOdai()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              お題追加
            </button>
          </span>
        </div>
      </main>
    </div>
  );
}

export default debug;
