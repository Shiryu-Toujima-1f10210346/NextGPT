import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";

function odaiCreate() {
  //scoreはNumber型
  const [odai, setOdai] = useState<String>("");
  const [userInput, setUserInput] = useState<String>("");
  const [ngList, setNgList] = useState<String[]>([]);
  const [ngTmp, setNgTmp] = useState<String>("");
  const [limit, setLimit] = useState<Number>(10);
  const [odaiScore, setOdaiScore] = useState<Number>(0);
  const [official, setOfficial] = useState<Boolean>(false);

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

  return (
    <div>
      <Head>
        <title>Debug</title>
      </Head>
      <Sidebar />
      <main>
        <div className={global.container}>
          <p>お題投稿フォーム</p>
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

          {/* <span className="border-2 border-gray-500 p-4 rounded-xl m-4">
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
          </span> */}
        </div>
      </main>
    </div>
  );
}

export default odaiCreate;
