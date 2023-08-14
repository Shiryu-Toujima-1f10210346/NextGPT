import {useState} from 'react'
import Sideber from '../components/Sidebar'
import styles from './index.module.css'
import Head from "next/head";

export default function Home(){
    // ランキングデータの配列
    const [ranking, setRanking] = useState([
        {name: 'ばくしんち', stars: 100},
        {name: 'けだ', stars: 200},
        {name: 'ふじ', stars: 300},
    ])

    // ランキングデータを昇順に並び替える
    const sortRanking = () => {
        const newRanking = [...ranking]
        newRanking.sort((a, b) => a.stars - b.stars)
        setRanking(newRanking)
    }

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
                        <span>{item.stars}</span>
                    </li>
                ))}
            </ul>
        </div>
        </main>
        </div>
    )
}