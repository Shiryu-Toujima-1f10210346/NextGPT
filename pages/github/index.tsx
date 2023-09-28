// pages/index.js

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";

const HomePage = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // GitHubのAPIエンドポイントURL
    const apiUrl =
      "https://api.github.com/repos/Shiryu-Toujima-1f10210346/NextGPT/issues";

    // GitHubアクセストークン
    const accessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

    // APIリクエストを送信
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setIssues(data))
      .catch((error) => console.error("Error fetching data:", error));
    console.table(issues);
  }, []);

  return (
    <div>
      <Sidebar />
      <main className={global.container}>
        <ul>
          <li>
            <a
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=feature-request&projects=&template=feature_request.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 underline"
            >
              機能追加のリクエストはこちらから
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 underline"
            >
              バグ報告はこちらから
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=enhancement&projects=&template=improve-request.md&title="
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              改善要望はこちらから
            </a>
          </li>
          <marquee className="text-center">☆キリ番報告はこちらから☆</marquee>
        </ul>
        <h1>既知のバグ</h1>
        <ul>
          {issues.map((issue) => {
            if (issue.labels.some((label) => label.name === "bug")) {
              return (
                <li key={issue.id}>
                  <span>･</span>

                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500"
                  >
                    {issue.title}
                  </a>
                </li>
              );
            }
            return null; // バグでない場合はnullを返す
          })}
        </ul>
        <br />
        <h1>機能要望一覧</h1>
        <ul>
          {issues.map((issue) => {
            if (issue.labels.some((label) => label.name === "enhancement")) {
              return (
                <li key={issue.id}>
                  <span>･</span>

                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500"
                  >
                    {issue.title}
                  </a>
                </li>
              );
            }
            return null; // 機能追加でない場合はnullを返す
          })}
        </ul>

        <br />

        <h1>その他</h1>
        <ul>
          {issues.map((issue) => {
            if (issue.labels.some((label) => label.name === "")) {
              return (
                <li key={issue.id}>
                  <span>･</span>

                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {issue.title}
                  </a>
                </li>
              );
            }
            return null; // 質問でない場合はnullを返す
          })}
        </ul>
      </main>
    </div>
  );
};

export default HomePage;
