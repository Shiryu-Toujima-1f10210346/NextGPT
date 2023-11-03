import React from "react";
import styles from "./index.module.css";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import PersonIcon from "@mui/icons-material/Person";

function SocratesIcon() {
  return (
    <img
      src="/Ncrates.png"
      width={50}
      height={50}
      className={styles.socratesIcon}
    />
  );
}

function gpt() {
  return (
    <div>
      <Head>
        <title>わからせンクラテス！ GPTとは</title>
      </Head>
      <Sidebar />
      <div className={styles.title}>～生成系AIってなぁに？～</div>
      <main className={styles.container}>
        <div>
          <PersonIcon className="text-6xl" />
          <span>其「教えて！ンクラテスー！」</span>
        </div>
        <div>
          <SocratesIcon />
          <span>ン「先生と呼ばんかい馬鹿者。どうしたんじゃ？」</span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>
            其「ンクラテス先生！最近ChatGPTって流行ってるけど実際にそれが何なのかわかんないんです！」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「なるほどなぁ。では少しChatGPTについて話していくかのう」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「ChatGPTとはOpenAI社が提供している生成系AIと呼ばれるAIの一つじゃ。」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「Googleが提供している検索補助の「Bard」、文章を入力することで画像生成をしてくれる「Midjourny」や「stable
            diffusion」なども生成系AIと呼ばれているものじゃ」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「ChatGPTはこの中でも文章を作り出すことに特化しておるぞ」
          </span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>
            其「なるほど！生成系AIにも色々あるんですね！でも、そもそも生成系Aiってなんなんですか？普通のAIとは違うの？」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「そう、ポイントはそこじゃ。生成系AIは今までのAiとは明確に違う点があるんじゃ。ソナタは今までのAiと言ったら何が思い浮かぶ？」
          </span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>
            其「え？うーん...。顔認証のアプリって確かそうだった気がします。」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「そうじゃな。あとはSiriやアレクサといった音声認識も含まれるのう」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「生成系AIの登場でそう言ったものは認識系AIと呼ばれることもあるようじゃ」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「顔認証や音声認識ら認識系AIの仕組みをざっくりと説明するとな、」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>①大量のデータから学習を行う。</span>
        </div>
        <div>
          <SocratesIcon />
          <span>②学習した内容を元に次のデータを判別する</span>
        </div>
        <div>
          <SocratesIcon />
          <span>③その結果から次のアクションを起こす</span>
        </div>
        <div>
          <SocratesIcon />
          <span>このような仕組みになっておるんじゃ」</span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「顔認証で例えるとな。たくさんの顔のデータから設定した人の特徴的な部分、いわゆる個性を機械的に見つけ出すんじゃ。それを元に認証しようとしている人の顔を判別する。正しければ認証を通して、間違っていれば」
          </span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>
            其「なるほど...。データを元に認識をするから認識系AIって呼ばれているんですね」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>ン「そうじゃ。よく理解しているのう。」</span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「それに対して生成系AIというのは大量のデータを元に0から生み出すことができるという点が特徴じゃ」
          </span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>
            其「0から...生み出す...？Siriも似たようなことをしていると思うんですけど、それとはまた違うんですか？」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「いいところに目をつけたが、ちと違うんじゃ。Siriやアレクサなどの認識系AIは受け取ったデータを元に決められた文章やアクションを出力しているんじゃよ。」
          </span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>
            其「なるほど...。でもほんとに0から生み出すなんてできるんですか？」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「そうじゃな...。ではこちらも大まかな仕組みをざっくりと解説しよう。」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「生成系AIがデータから学習しているのは『それっぽさ』じゃ」
          </span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>其「そ、それっぽさ...ですか？」</span>
        </div>
        <div>
          <SocratesIcon />
          <span>ン「そうじゃ。例えば文章を生成するときに</span>
        </div>
        <div>
          <SocratesIcon />
          <span>『りんごは』</span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            という言葉の後には何が入りやすいかを学習しているようなものじゃ。この後には例えば「赤い」や「甘い」や「果物」などが入ると思うんじゃが、このような候補中で一番『それっぽい』ものを次に出力するんじゃ」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「これをインターネット上にある大量のデータを学習に当てて『それっぽい』文章を出力しているんじゃ」
          </span>
        </div>
        <div>
          <PersonIcon className="text-6xl" />
          <span>其「それで生成系AIと呼ばれているんですね」</span>
        </div>
        <div>
          <SocratesIcon />
          <span>ン「だがのう、この生成系AIも完璧ではないんじゃ。」</span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「このような生成を行っているから、身も蓋もない嘘情報が生成されることもあるんじゃ...。このことを「ハルシネーション」と呼んだりもするぞ」
          </span>
        </div>
        <div>
          <SocratesIcon />
          <span>
            ン「だから生成系AIに頼り切らずに自分で考えることが大事なんじゃな。」
          </span>
        </div>
      </main>
    </div>
  );
}

export default gpt;
