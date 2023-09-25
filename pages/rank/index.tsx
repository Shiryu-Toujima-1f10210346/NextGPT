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
    const chachedData = localStorage.getItem("rankingData");
    if (chachedData) setRanking(JSON.parse(chachedData));
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
      <main>
        <div className={global.container}>
          <span className="border-2 border-gray-600 lg:px-32 lg:py-2 lg:mt-8 px-16 py-2 m-2 rounded-xl">
            {ranking.length == 0 ? (
              <p>ランキングデータ取得中･･･</p>
            ) : (
              <p>ランキングデータ</p>
            )}
          </span>
          <CircularProgress className={loading ? "opacity-100" : "opacity-0"} />
          <ul className={styles.resultContainer}>
            {ranking.map((item, index) => (
              <li
                key={index}
                className="border-b-4 border-r-4 border p-2 rounded-2xl my-4"
              >
                {index + 1 == 1 ? (
                  <div className="">🥇{index + 1}位</div>
                ) : index + 1 == 2 ? (
                  <div className="">🥈{index + 1}位</div>
                ) : index + 1 == 3 ? (
                  <div className="">🥉{index + 1}位</div>
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
        </div>
      </main>
    </div>
  );
}
