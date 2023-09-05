import { useEffect, useState } from "react";
import Sideber from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import Head from "next/head";
import styles from "./index.module.css";

export default function Home() {
  //ランキングデータの配列
  const [ranking, setRanking] = useState([
    // { name: "ごーた", score: 0 },
    // { name: "ばくしんち", score: 100 },
    // { name: "けだ", score: 200 },
    // { name: "ふじ", score: 300 },
  ]);

  // ランキングデータを昇順に並び替える
  //   const sortRanking = () => {
  //     const newRanking = [...ranking];
  //     newRanking.sort((a, b) => a.score - b.score);
  //     setRanking(newRanking);
  //   };

  // ランキングデータを取得する
  const fetchRanking = async () => {
    const res = await fetch("/api/getRanking");
    const data = await res.json();
    console.log("data");
    console.table(data);
    const newRanking = data.map((item) => ({
      name: item.name,
      score: item.score,
    }));

    setRanking(newRanking);
  };

  //1分ごとにランキングデータを取得する
  useEffect(() => {
    fetchRanking();
    const interval = setInterval(() => {
      fetchRanking();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Head>
        <title>ほげほげ</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Sideber />
      <main>
        <div className={global.container}>
          {ranking.length == 0 ? (
            <p>ランキングデータ取得中･･･</p>
          ) : (
            <p>ランキングデータ</p>
          )}
          <ul className={styles.resultContainer}>
            {ranking.map((item, index) => (
              <li key={index} className="border-2">
                <div className="">{index + 1}位</div>
                <div id="rankContainer" className="">
                  <span className="">{item.name}さん: </span>
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
