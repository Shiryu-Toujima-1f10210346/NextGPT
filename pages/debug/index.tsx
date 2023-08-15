import Head from 'next/head'
import React from 'react'
import Sidebar from '../../components/Sidebar'
import global from '../../styles/global.module.css'

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
        </main>
    </div>
  )
}

export default debug