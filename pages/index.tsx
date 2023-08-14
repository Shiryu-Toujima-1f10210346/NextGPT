import React from 'react'
import Sideber from '../components/Sidebar'
import Head from 'next/head'

function index() {
  return (
    <div>
        <Head>
        <title>ホーム</title>
        <link rel="icon" href="/gpt.png" />
        <script src="https://cdn.tailwindcss.com"></script>
        </Head>
        <Sideber />
    </div>
  )
}

export default index