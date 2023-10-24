import React from "react";
import Sideber from "../components/Sidebar";
import global from "../styles/global.module.css";
import styles from "./index.module.css";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
function Home() {
  const router = useRouter();

  function skipTutorial() {
    localStorage.setItem("exampleHide", "true");

    router.push("/game");

    console.log("skip");
  }

  return (
    <div>
      <Head>
        <title>わからせンクラテス！ ホーム</title>
      </Head>
      <Sideber />
      <main className={`${global.container} text-center`}>
        <div id="logo">
          <img src="/logo.png" alt="logo" className={styles.logo} />
          <p className="text-center font-serif text-3xl font-bold mt-3 pb-6 border-b-4">
            - わからせンクラテス -
          </p>
        </div>
        <div hidden>
          <p className="text-3xl font-serif my-10">How to play</p>
          <div className="text-left">ここにチュートリアル的なの</div>
        </div>
        <div className="relative hidden lg:block ">
          <Image
            src="/serif.png"
            alt="serif"
            width={1000}
            height={1000}
            className="z-index-0"
          />
          <button
            className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border-2 rounded px-4"
            onClick={() => {
              router.push("/game");
            }}
          >
            すた～と
          </button>
          <button
            className="absolute top-3/4 transform translate-x-1/2 -translate-y-1/2 z-10 border-2 rounded px-4"
            onClick={() => {
              skipTutorial();
            }}
          >
            説明スキップ
          </button>
        </div>

        {/* <div className={styles.text}>
            <p>このサイトはGPTとお題当てゲームができるサイトです</p>
            <p>
              ･ルール
              お題の単語とNGワードに近い言葉を使わずにGPTからお題の単語を引き出そう！
            </p>
            <p>例) お題: 寿司</p>
            <p>NGワード: 寿司 回転 シャリ ネタ</p>
            <p>
              指示文:日本の料理で､皿に盛った､酢飯の上に､生魚や野菜などをのせたもの｡
            </p>
          </div> */}

        {/* <p className={styles.text}>サイト制作者</p>
          <a
            href="https://twitter.com/shiryu_dev"
            className="font-bold text-blue-500 hover:text-blue-400 underline text-xl"
          >
            Twitter(X)
          </a>
          <p className={styles.text}>アンケートのご協力お願いします</p>
          <p className={styles.text}>↓PullRequest待ってます↓</p>
          <a
            href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT"
            className="font-bold text-blue-500 hover:text-blue-400 underline text-xl"
          >
            Github
          </a> */}
        <div className="fixed bottom-16 left-0 w-full p-4 text-2xl font-serif text-center lg:hidden">
          <div className="">ゲーム開始はこちらから</div>
          <div className="flex justify-center">
            <img src=".././hand.png" alt="hand" className="w-16" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
