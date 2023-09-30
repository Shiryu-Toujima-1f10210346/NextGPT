import Head from "next/head";
import React from "react";
import Sidebar from "../../components/Sidebar";
import global from "../../styles/global.module.css";
import { useRouter } from "next/router";
import Github from "../../pages/github";

function info() {
  const router = useRouter();

  return (
    <div>
      <Sidebar />
      <Github />
      <main className={global.container}>
        <div>info</div>
        <div>既知のバグリスト</div>
        <ul>
          <li></li>
        </ul>
      </main>
    </div>
  );
}

export default info;
