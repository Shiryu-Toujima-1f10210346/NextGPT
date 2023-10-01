import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function odaiCreate() {
  //scoreはNumber型
  const [odai, setOdai] = useState<String>("");
  const [userInput, setUserInput] = useState<String>("");
  const [ngList, setNgList] = useState<String[]>([]);
  const [ngTmp, setNgTmp] = useState<String>("");
  const [limit, setLimit] = useState<Number>(10);
  const [odaiScore, setOdaiScore] = useState<Number>(0);
  const [official, setOfficial] = useState<boolean>(false);
  const [submit, setSubmit] = useState<"done" | "error" | "ing" | "not">("not");

  async function fetchAddOdai() {
    setSubmit("ing");
    try {
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
      const data = await res.json();
      console.log(data);
      setSubmit("done");
    } catch (e) {
      console.log(e);
      setSubmit("error");
    }
  }

  async function getIPAddress() {
    try {
      const response = await fetch("https://api64.ipify.org?format=json");
      if (!response.ok) {
        throw new Error("IPアドレスの取得に失敗しました。");
      }
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("エラー:", error);
      return null;
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームの送信動作をキャンセルする
    setNgList([...ngList, ngTmp]);
    setNgTmp("");
  };

  //パスワードを聞き､正しければofficialをtrueにする
  //パスワードは環境変数から取得する
  const checkOfficial = async () => {
    const check = confirm("あなたは管理者ですか？");
    if (!check) return;
    const input = prompt("管理者用パスワードを入力してください");
    if (input === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setOfficial(true);
      return;
    } else {
      alert("違います いたずらしないでね");
      //IPアドレスを取得する
      const ip = await getIPAddress();
      alert("あなたのIPアドレスを保存しました:" + ip);
      setOfficial(false);
      return;
    }
  };

  return (
    <div>
      <Head>
        <title>Debug</title>
      </Head>
      <Sidebar />
      <main>
        <div className={global.container}>
          <p>お題投稿フォーム</p>
          <div className="text-xl">
            NGワードは一つごとに+ボタン､またはEnterを押してください！
          </div>
          <div className="border-2 border-gray-500 p-4 rounded-xl m-4">
            <p>お題追加</p>
            <input
              placeholder="お題"
              onChange={(e) => setOdai(e.target.value)}
              className="border-2"
            />
            <br />
            <div className="flex flex-row">
              <form>
                <input
                  placeholder="NGワード"
                  className="border-2"
                  value={ngTmp.toString()}
                  onChange={(e) => setNgTmp(e.target.value)}
                />
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  +
                </button>
              </form>
            </div>

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

            <div>
              <div id="official" className="">
                公式お題(管理者用):
                <input
                  type="checkbox"
                  checked={official}
                  onChange={() =>
                    official ? setOfficial(false) : checkOfficial()
                  }
                />
              </div>
              <div> お題:{odai} </div>
              <div>
                制限回数:
                {limit.toString()}回
              </div>
              <div>点数:{odaiScore.toString()}点</div>
              <div>NGワード:{ngList.join(",")}</div>
            </div>

            <button
              onClick={() => fetchAddOdai()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              お題追加
            </button>
          </div>

          <CircularProgress
            size={30}
            className={submit === "ing" ? "" : "hidden"}
          />
          <div className={submit === "done" ? "" : "hidden"}>
            お題を追加しました！
          </div>
        </div>
      </main>
    </div>
  );
}

export default odaiCreate;
