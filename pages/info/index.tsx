import Head from "next/head";
import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import style from "./index.module.css";

function info() {
  const [comment, setComment] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<
    { id: string; name: string; comment: string; createdAt: Date }[]
  >([]);
  const [commentSending, setCommentSending] = useState<boolean>(false);

  const router = useRouter();
  const linkClass = "underline text-xl mb-2";

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("submitting comment");
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
          className="border-2 p-1 w-72 lg:w-96"
          placeholder="名前を入力"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div>
          <input
            className="border-2 p-1 w-60 lg:w-96"
            placeholder="コメントを入力"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button
            className={`${
              comment === "" || name === ""
                ? "bg-gray-500"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold px-2 py-1 rounded`}
            onClick={(e) => handleSubmit(e)}
            disabled={comment === "" || name === "" || commentSending}
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
        <Link
          href="https://docs.google.com/forms/d/1ne_r4-WAZpP0Pf914x-PcoP8tILoKNkLW3kkzYRau6g/viewform?edit_requested=true#settings"
          className={linkClass}
        >
          <span className="text-3xl text-red-500 font-bold">
            アンケートにご協力ください！
          </span>
        </Link>
        <Link href="/github" className={linkClass}>
          <p className={style.mainText}>
            バグ報告､機能要望､改善案
            <br />
            はこちら
            <span className="text-sm">(Github)</span>
          </p>
        </Link>
        <Link href="/aboutGPT" className={linkClass}>
          <p className={style.mainText}>
            GPT､生成系AI､
            <br />
            プロンプトエンジニアリングとは
          </p>
        </Link>
        <Link
          href="https://twitter.com/shiryu_dev"
          className="underline text-blue-500 text-xl mb-2"
        >
          <p className={style.mainText}>作者の𝕏(旧Twitter)</p>
        </Link>
        <div>{submitCommentForm()}</div>
        <div className="text-xl text-center">
          <div className="px-2">
            感想等､気軽に書いていってくれると
            <br />
            とても喜びます！
            <br />
            バグ報告はコメント欄でも大丈夫です｡
            <br />
            ｢バグ報告｣と含めてください！
          </div>
          <div className="font-bold">
            {commentSending ? "送信中･･･" : "コメント欄"}
            <CircularProgress size={20} className={loaded && "opacity-0"} />
          </div>
        </div>

        <div className="overflow-y-scroll h-2/5 lg:h-2/3 bg-gray-100 lg:text-3xl lg:w-2/3 mb-0 lg:mb-4 rounded-2xl">
          {commentList.map((comment) => (
            <div
              key={comment.id}
              className="border-b-4 border-r-4 m-2 p-2 bg-white rounded-2xl"
            >
              <p className={style.userInfoText}>
                {comment.name}さん{" "}
                <span className={style.time}>
                  {new Date(comment.createdAt).toLocaleString("ja-JP")}
                </span>
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
