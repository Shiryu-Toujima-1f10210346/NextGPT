import React from "react";
import style from "./index.module.css";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

function gpt() {
  return (
    <div>
      <Head>
        <title>わからせンクラテス！ GPTとは</title>
      </Head>
      <Sidebar />
      <main className={global.container}>
        <div>ここにGPTについての説明を書く</div>
        <div>エンジニアリングプロンプトとは</div>
      </main>
    </div>
  );
}

export default gpt;
