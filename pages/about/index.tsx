import React from 'react'
import Sideber from "../../components/Sidebar"
import Head from 'next/head'
import global from '../../styles/global.module.css'

function about() {
  return (
    <div>
        <Head>
        <title>About</title>
        <link rel="icon" href="/gpt.png" />
        <script src="https://cdn.tailwindcss.com"></script>
        </Head>
        <Sideber />
        <main>
            <div className={global.container}>
                <p>このサイトは、GPT-3を用いたお題を出してくれるサイトです。</p>
                <p>お題を出してくれるのはGPT-3の中の人です。</p>
                <h1>アンケートのご協力お願いします</h1>
            </div>
        </main>
    </div>
  )
}

export default about