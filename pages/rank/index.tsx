import { useEffect, useState } from "react";
import Sideber from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import Head from "next/head";
import styles from "./index.module.css";

export default function Home() {
  //ランキングデータの配列
  const [ranking, setRanking] = useState([]);

  // ランキングデータを取得する
  const fetchRanking = async () => {
    const chachedData = localStorage.getItem("rankingData");
    if (chachedData) setRanking(JSON.parse(chachedData));

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
      <Head>
        <title>ほげほげ</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Sideber />
      <main>
        <div className={global.container}>
          <span className="text-xl mt-6">
            {ranking.length == 0 ? (
              <p>ランキングデータ取得中･･･</p>
            ) : (
              <p>ランキングデータ</p>
            )}
          </span>
          <ul className={styles.resultContainer}>
            {ranking.map((item, index) => (
              <li key={index} className="border-2 p-2 rounded-xl my-4">
                <div className="">{index + 1}位</div>
                <div id="rankContainer" className="">
                  <span>{item.name} </span>
                  <span className={styles.san}>さん: </span>

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
