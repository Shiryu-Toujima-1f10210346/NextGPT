import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";

const Github = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // GitHubのAPIエンドポイントURL
    const apiIssueUrl =
      "https://api.github.com/repos/Shiryu-Toujima-1f10210346/NextGPT/issues";

    // GitHubアクセストークン
    const accessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

    // APIリクエストを送信
    fetch(apiIssueUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredIssues = data.filter(
          (issue: { labels: { name: string }[] }) =>
            issue.labels.some(
              (label: { name: string }) => label.name === "checked"
            )
        );
        setIssues(filteredIssues);
      })
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
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=bug&projects=&template=bug-report.md&title="
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 underline"
            >
              バグ報告はこちらから
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=enhancement&projects=&template=fature-request.md&title="
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 underline"
            >
              機能追加のリクエストはこちらから
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
        </ul>
        <h1 className="text-2xl">既知のバグ</h1>
        <ul>
          {issues.map((issue) => {
            if (
              issue.labels.some(
                (label: { name: string }) => label.name === "bug"
              )
            ) {
              return (
                <li key={issue.id}>
                  <span>･</span>

                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 underline"
                  >
                    {issue.title}
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <br />
        <h1 className="text-2xl">機能要望</h1>
        <ul>
          {issues.map((issue) => {
            if (
              issue.labels.some(
                (label: { name: string }) => label.name === "enhancement"
              )
            ) {
              return (
                <li key={issue.id}>
                  <span>･</span>

                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 underline"
                  >
                    {issue.title}
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>

        <br />

        <h1 className="text-2xl">改善案</h1>
        <ul>
          {issues.map((issue) => {
            if (
              issue.labels.some(
                (label: { name: string }) => label.name === "improve"
              )
            ) {
              return (
                <li key={issue.id}>
                  <span>･</span>

                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {issue.title}
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </main>
    </div>
  );
};

export default Github;
