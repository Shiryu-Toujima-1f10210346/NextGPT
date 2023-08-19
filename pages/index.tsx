import React from 'react'
import Sideber from "../components/Sidebar"
import Head from 'next/head'
import global from '../styles/global.module.css'

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
                <p>･ルール お題の単語とNGワードに近い言葉を使わずにGPTからお題の単語を引き出そう！</p>
                <p>例) お題: 寿司</p>
                <p>NGワード: 寿司 回転 シャリ ネタ</p>
                <p>指示文:日本の料理で､皿に盛った､酢飯の上に､生魚や野菜などをのせたもの｡</p>
            </div>
        </main>
    </div>
  )
}

export default index