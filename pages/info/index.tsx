import Head from "next/head";
import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

function info() {
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<
    { id: string; name: string; comment: string; createdAt: Date }[]
  >([]);
  const [commentSending, setCommentSending] = useState<boolean>(false);

  const router = useRouter();
  const linkClass =
    "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-3";

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setCommentSending(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/addComment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment: comment, name: name }),
      });
      const data = await res.json();
      console.log(data);
      setComment("");
      setCommentSending(false);
    } catch (error) {
      console.error(error);
      setCommentSending(false);
    }
  };
  const submitCommentForm = () => {
    return (
      <form className="flex flex-col">
        <input
          className="border-2"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div>
          <input
            className="border-2"
            placeholder="Enter your comment"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button
            className={`${
              comment === "" || name === ""
                ? "bg-gray-500"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold p-2 rounded`}
            onClick={(e) => handleSubmit(e)}
            disabled={comment === "" || name === ""}
          >
            送信
          </button>
        </div>
      </form>
    );
  };

  const fetchComments = async () => {
    const chachedData = localStorage.getItem("commentList");
    if (chachedData) setCommentList(JSON.parse(chachedData));
    console.log("fetching comments");
    try {
      const res = await fetch("/api/getComments", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
      localStorage.setItem("commentList", JSON.stringify(data));
      //commentListにコメントを追加
      setCommentList(data);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  };

  //5秒ごとにコメントデータを取得する
  const refreshInterval = 10;
  useEffect(() => {
    fetchComments();
    const interval = setInterval(() => {
      fetchComments();
    }, 1000 * refreshInterval);
    return () => clearInterval(interval);
  }, [commentSending]);

  return (
    <div>
      <Sidebar />
      <main className={global.container}>
        <div className="text-2xl m-4 mt-2">info</div>
        <Link href="/github" className={linkClass}>
          <p>既知のバグ､機能要望､改善案はこちらから</p>
        </Link>
        <Link href="/aboutGPT" className={linkClass}>
          <p>GPT､プロンプトエンジニアリングとは</p>
        </Link>
        <div className="text-2xl m-4 mt-2">コメント</div>
        <div>{submitCommentForm()}</div>
        <div>{commentSending ? "送信中･･･" : "コメント欄"}</div>
        <CircularProgress size={20} className={loaded ? "hidden" : ""} />
        <div>{loaded ? "読み込み完了" : "読み込み中･･･"}</div>{" "}
        <div className="overflow-y-scroll h-2/5 bg-gray-100">
          {commentList.map((comment) => (
            <div
              key={comment.id}
              className="border-b-2 border-r-2 m-2 p-2 rounded bg-white"
            >
              <p>
                {comment.name}さん{" "}
                {new Date(comment.createdAt).toLocaleString("ja-JP")}
              </p>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default info;
