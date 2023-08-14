import React from 'react'
import Sideber from "../components/Sidebar"
import Head from 'next/head'
import global from '../styles/global.module.css'
import createRanking from '../repo/rankingRepo'

function index() {
  return (
    <div>
        <Head>
        <title>ホーム</title>
        <link rel="icon" href="/gpt.png" />
        <script src="https://cdn.tailwindcss.com"></script>
        </Head>
        <Sideber />
        <main>
            <div className={global.container}>
                <p>このサイトはGPTとお題当てゲームができるサイトです</p>
                <p>･ルール NGワードに近い言葉を使わずにGPTからお題の単語を引き出そう！</p>
                <p>例) お題: お寿司</p>
                <p>NGワード: 寿司 魚 回転 シャリ ネタ</p>
                <p>指示文: 

                </p>
            </div>
            <button onClick={createRanking}>ランキング作成:デバッグ</button>
        </main>
    </div>
  )
}

export default index