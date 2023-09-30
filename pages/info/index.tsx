import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

function info() {
  const router = useRouter();
  const linkClass =
    "bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded m-3";

  return (
    <div>
      <Sidebar />
      <main className={global.container}>
        <div className="text-2xl m-4 mt-2">info</div>

        <Link href="/github" className={linkClass}>
          <p>既知のバグ､機能要望､改善案はこちらから</p>
        </Link>
        <Link href="/aboutGPT" className={linkClass}>
          <p>GPT､プロンプトエンジニアリングとは</p>
        </Link>
      </main>
    </div>
  );
}

export default info;
