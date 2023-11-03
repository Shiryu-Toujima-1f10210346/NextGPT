import { useEffect, useState } from "react";
import Sideber from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import Head from "next/head";
import styles from "./index.module.css";
import { CircularProgress } from "@mui/material";

export default function Home() {
  //ランキングデータの配列
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  // ランキングデータを取得する
  const fetchRanking = async () => {
    const cacheData = localStorage.getItem("rankingData");
    if (cacheData) setRanking(JSON.parse(cacheData));
    try {
      const res = await fetch("/api/getRanking");
      const data = await res.json();
      console.log("data");
      console.table(data);

      const newRanking = data.map((item) => ({
        name: item.name,
        score: item.score,
      }));
      localStorage.setItem("rankingData", JSON.stringify(newRanking));
      setRanking(newRanking);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //3分ごとにランキングデータを取得する
  useEffect(() => {
    fetchRanking();
    const interval = setInterval(() => {
      fetchRanking();
    }, 1000 * 60 * 3);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Sideber />
      <main className={global.container}>
        <span className="border-2 border-gray-600 lg:px-32 lg:py-2 lg:mt-8 px-10 m-2 rounded-xl font-bold text-2xl py-4">
          {ranking.length == 0 ? <p>取得中･･･</p> : <p>RANKING</p>}
        </span>
        <CircularProgress
          size={20}
          className={loading ? "opacity-100" : "opacity-0"}
        />
        <ul className={styles.resultContainer}>
          {ranking.map((item, index) => (
            <li
              key={index}
              className="border-b-4 border-r-4 border p-2 rounded-2xl my-4"
            >
              {index + 1 == 1 ? (
                <div className="flex px-2 ">
                  <div className="bg-yellow-300 rounded px-4">
                    🥇{index + 1}位
                  </div>
                </div>
              ) : index + 1 == 2 ? (
                <div className="flex px-2 ">
                  <div className="bg-gray-300 rounded px-4">
                    🥈{index + 1}位
                  </div>
                </div>
              ) : index + 1 == 3 ? (
                <div className="flex px-2 ">
                  <div className="bg-yellow-700 rounded px-4">
                    🥉{index + 1}位
                  </div>
                </div>
              ) : (
                <div className="">{index + 1}位</div>
              )}
              <div id="rankContainer" className="">
                <span>{item.name} </span>
                <span className={styles.san}>さん</span>

                <span className="float-right">{item.score}点</span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
