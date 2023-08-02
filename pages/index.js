import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState([]);
  const [limit, setLimit] = useState(1);

  async function onSubmit(event) {
    // document.getElementById("result").innerHTML += event.target.elements.user.value;
    if (limit <= 0) {
      alert("もう終わりです");
      return;
    }
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      // setResult(data.result);
      //dataの中身をわかりやすく表示
      console.log(data.result.content);
      setResult([
        ...result,
        "あなた:" + event.target.elements.user.value,
        "GPT:" + data.result.content,
      ]);
      setLimit(limit - 1);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>ほげほげ</title>
        <link rel="icon" href="/dog.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <main className={styles.main}>
        <img src="/gpt.png" className={styles.icon} />
        <h3>GPTとバトル</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="user"
            placeholder="話したいことを入力してください"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input
            type="submit"
            id="submit"
            value="Send Message"
            disabled={limit <= 0}
          />
        </form>

        <div
          id="limit"
          class="
        mt-6 p-2
        border rounded-xl border-gray-800 border-2 shadow-xl
        font-bold text-xl text-gray-800
        "
        >
          {limit <= 0 ? <p>もう終わりです</p> : <p>残り{limit}回</p>}
        </div>

        <div className={styles.result}>
          {result.map((fact, index) => (
            <p
              key={index}
              class="
            border rounded-xl border-gray-800 border-2 shadow-xl
            p-6 m-4
            text-xl font-bold text-gray-800
            "
            >
              {fact}
            </p>
          ))}
        </div>

        <div id="result"></div>
      </main>
    </div>
  );
}
