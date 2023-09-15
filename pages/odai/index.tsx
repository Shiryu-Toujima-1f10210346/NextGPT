import React from "react";
import { useState, useEffect } from "react";
import Sideber from "../../components/Sidebar";
import Head from "next/head";
import global from "../../styles/global.module.css";
import style from "./index.module.css";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  const [odai, setOdai] = useState([
    /*{ odai: "バナナ", ng: ["黄色", "甘い", "酸っぱい"], limit: 10 },*/
  ]);

  //test用
  /*
  for (let i = 0; i < 10; i++) {
    odai.push({
      id: i,
      odai: "バナナ",
      ng: ["黄色", "甘い", "酸っぱい"],
      limit: 10,
    });
  }*/

  const fetchOdaiList = async () => {
    const chachedData = localStorage.getItem("odaiList");
    if (chachedData) setOdai(JSON.parse(chachedData));
    const res = await fetch("/api/getOdaiList");
    const data = await res.json();
    console.table(data);
    const OdaiList = data.map(
      (item: {
        id: number;
        odai: string;
        ng: string[];
        limit: number;
        like: number;
        dislike: number;
        score: number;
        official: boolean;
      }) => ({
        id: item.id,
        odai: item.odai,
        ng: item.ng,
        limit: item.limit,
        like: item.like,
        dislike: item.dislike,
        score: item.score,
        official: item.official,
      })
    );
    localStorage.setItem("odaiList", JSON.stringify(OdaiList));
    setOdai(OdaiList);
  };

  //2分ごとにランキングデータを取得する
  useEffect(() => {
    fetchOdaiList();
    const interval = setInterval(() => {
      fetchOdaiList();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const likeThisOdai = async (id: number) => {
    console.log("like");
  };

  const playThisOdai = async (id: number) => {
    //gameページに遷移
    router.push({
      pathname: "/game",
      query: { id: id },
    });
  };

  return (
    <div>
      <Sideber />
      <main className={global.container}>
        <div className="border-2 border-gray-600 lg:px-32 lg:py-2 lg:mt-8 px-16 py-2 m-2 rounded-xl">
          {odai.length == 0 ? <p>お題取得中･･･</p> : <p>お題一覧</p>}
        </div>
        <ul className={style.odaiContainer}>
          {odai.map((item) => (
            <div
              className="border-2 border-blue-500 p-4 rounded-xl m-2 ease-in transition-all duration-100 shadow-xl"
              key={item.id}
            >
              <li key={item.odai}>お題: {item.odai}</li>
              <li key={item.ng}>NGワード: {item.ng.join("､")}</li>
              <li key={item.limit}>制限回数: {item.limit}回</li>
              {item.official ? (
                <li key={item.official}>公式お題</li>
              ) : (
                <li key={item.official}>ユーザーお題</li>
              )}
              {item.score ? (
                <li key={item.score}>スコア: {item.score}</li>
              ) : (
                <li key={item.score}>スコア: 未設定</li>
              )}
              <li key={item.like}>いいね: {item.like}</li>

              <div className="flex justify-end ">
                <button
                  className="button w-40 h-16 bg-blue-500  cursor-pointer select-none
                  active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841]
                  active:border-b-[0px]
                  transition-all duration-150 [box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]
                  rounded-full  border-[1px] border-blue-400
                  
                "
                  onClick={() => playThisOdai(item.id)}
                >
                  <span className="flex flex-col justify-center items-center h-full text-white font-bold text-xl  hover:scale-125">
                    Play
                  </span>
                </button>
              </div>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
