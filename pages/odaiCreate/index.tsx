import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

interface Odai {
  name: string;
  odai: string;
  ngList: string[];
  limit: number;
  odaiScore: number;
  official: boolean;
}

function odaiCreate() {
  const [odai, setOdai] = useState<string>("");
  const [ngList, setNgList] = useState<string[]>([]);
  const [ngTmp, setNgTmp] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [odaiScore, setOdaiScore] = useState<number>(0);
  const [official, setOfficial] = useState<boolean>(false);
  const [submit, setSubmit] = useState<"done" | "error" | "ing" | "not">("not");
  const [name, setName] = useState<string>("名無しさん");

  async function fetchAddOdai() {
    // 以下の内容でよろしいですか？ という確認
    const firstCheck = confirm(
      "以下の内容でよろしいですか？\n" +
        "名前:" +
        name +
        "\nお題:" +
        odai +
        "\nNGワード:" +
        ngList.join(",") +
        "\n制限回数:" +
        limit.toString() +
        "\n点数:" +
        odaiScore.toString()
    );
    if (!firstCheck) return;
    if (submit === "ing") return;
    if (ngList.length === 0) {
      const check = confirm("NGワードが指定されていませんがよろしいですか？");
      if (!check) return;
    }

    setSubmit("ing");
    try {
      const res = await fetch("/api/addOdai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          odai: odai,
          ngList: ngList,
          limit: limit,
          odaiScore: odaiScore,
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

  const handleAddNg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ngTmp === "") return;
    setNgList([...ngList, ngTmp]);
    setNgTmp("");
  };

  const checkOfficial = async () => {
    const check = confirm("あなたは管理者ですか？");
    if (!check) return;
    const input = prompt("管理者用パスワードを入力してください");
    if (input === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      setOfficial(true);
      return;
    } else {
      alert("違います いたずらしないでね");
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
          <div className="text-xl font-serif font-bold ">
            NGワードは一つごとに+ボタン､またはEnterを押してください
          </div>
          <div className="border-2 border-gray-500 p-4 rounded-xl m-4">
            <input
              placeholder="あなたの名前"
              onChange={(e) => setName(e.target.value)}
              className="border-2"
            />
            <br />
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
                  onClick={(e) => handleAddNg(e)}
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
              placeholder="スコア"
              className="border-2"
              hidden={!official}
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
              <div> 名前:{name} </div>
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
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                submit === "ing" || name === "" || odai === ""
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={submit === "ing" || name === "" || odai === ""}
            >
              お題追加
            </button>
          </div>

          <CircularProgress
            size={30}
            hidden={submit !== "ing"}
            className="text-xl"
          />
          <div hidden={submit !== "done"} className="text-xl">
            お題を追加しました！
          </div>
        </div>
      </main>
    </div>
  );
}

export default odaiCreate;
