import { useEffect, useState } from "react";
import Sideber from "../../components/Sidebar";
import styles from "./index.module.css";
import Head from "next/head";

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

  useEffect(() => {
    fetchRanking();
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
        <div className={styles.container}>
          <h1>Ranking</h1>
          <ul>
            {ranking.map((item, index) => (
              <li key={index}>
                <span>{item.name}:</span>
                <span>{item.score}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
