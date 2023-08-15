import Head from 'next/head'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import global from '../../styles/global.module.css'
import { addRanking } from '../../repo/rankingRepo'

let score = 100;

function debug() {
  return (
    <div>
        <Head>
        <title>デバッグ</title>
        <link rel="icon" href="/gpt.png" />
        <script src="https://cdn.tailwindcss.com"></script>
        </Head>
        <Sidebar />
        <main>
            <div className={global.container}>
                デバッグ用ページやで
            </div>
            <input onChange={(e) => score = Number(e.target.value)} />
            <div>{score}</div>
            <button onClick={() => addRanking('test', score)}>ランキング更新</button>
        </main>
    </div>
  )
}

export default debug