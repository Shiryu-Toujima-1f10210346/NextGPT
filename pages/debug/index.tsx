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
  const [odaiScore, setOdaiScore] = useState<Number>(0);
  const [official, setOfficial] = useState<Boolean>(false);
  const [password, setPassword] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);

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
    console.log("res:" + res);
    const data = await res.json();
    setResult(data.result);
  }

  async function fetchAddOdai() {
    const res = await fetch("/api/addOdai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        odai: odai,
        ng: ngList,
        limit: limit,
        score: odaiScore,
        official: official,
      }),
    });
    console.log(res);
  }

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setIsAuthorized(true);
    } else {
      alert("パスワードが正しくありません。");
    }
  };

  if (!isAuthorized) {
    return (
      <div>
        <Head>
          <title>Debug</title>
        </Head>
        <Sidebar />
        <form onSubmit={handlePasswordSubmit}>
          <label>
            パスワード：
            <input
              type="password"
              value={password}
              className="border-2"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="border-2 bg-gray-300">
            ログイン
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Debug</title>
      </Head>
      <Sidebar />
      <main>
        <div className={global.container}>
          <p>デバッグ用ページ</p>

          <div className="border-2 border-gray-500 p-4 rounded-xl m-4">
            <input
              placeholder="name"
              maxLength={10}
              onChange={(e) => setName(e.target.value)}
              className="border-2"
            />
            <br />
            <input
              placeholder="score"
              onChange={(e) => setScore(Number(e.target.value))}
              className="border-2"
            />
            <br />

            <div>{name}さん</div>
            <div>{score.toString()}点</div>
            <button
              onClick={() => fetchAddRank()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ランキング更新
            </button>
          </div>
          <div className="border-2 border-gray-500 p-4 rounded-xl m-4">
            <p>お題追加</p>
            <input
              placeholder="お題"
              onChange={(e) => setOdai(e.target.value)}
              className="border-2"
            />
            <br />
            <input
              placeholder="NGワード"
              className="border-2"
              value={ngTmp.toString()}
              onChange={(e) => setNgTmp(e.target.value)}
            />
            <br />
            <input
              placeholder="制限回数"
              className="border-2"
              onChange={(e) => setLimit(Number(e.target.value))}
            />
            <br />
            <input
              placeholder="点数"
              className="border-2"
              onChange={(e) => setOdaiScore(Number(e.target.value))}
            />
            <br />
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
              <div>
                公式お題:
                <input
                  type="checkbox"
                  onChange={() => setOfficial(!official)}
                />
              </div>
              お題:{odai} 制限回数:
              {limit.toString()}回 点数:{odaiScore.toString()}点
            </div>
            <div>NGワード:{ngList.join(",")}</div>

            <button
              onClick={() => fetchAddOdai()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              お題追加
            </button>
          </div>

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
        </div>
      </main>
    </div>
  );
}

export default debug;
