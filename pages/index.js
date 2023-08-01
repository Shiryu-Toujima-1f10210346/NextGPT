import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState([]);

  async function onSubmit(event) {
    // document.getElementById("result").innerHTML += event.target.elements.animal.value;
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      // setResult(data.result);
      //dataの中身をわかりやすく表示
      console.log(data.result.content);
      setResult([...result,event.target.elements.animal.value ,data.result.content]);
    } catch(error) {
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
            name="animal"
            placeholder="話したいことを入力してください"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>
          {result.map((fact, index) => (
            <p key={index} class ="
            border rounded-xl border-gray-800 border-4
            p-6 mr-64 ml-4 mb-4 
            text-xl font-bold text-gray-800
            " >{fact}</p>
          ))}
        </div>
        <div id="result"></div>
      </main>
    </div>
  );
}
