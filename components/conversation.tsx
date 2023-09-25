import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from "./conversation.module.css";

const Conv = ({ target, text }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(text);
  }, [text]);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Baloo+2:400,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      {target === "bot" ? (
        <div className={styles.bot}>{message}</div>
      ) : (
        <div className={styles.user}>{message}</div>
      )}
    </>
  );
};

export default Conv;
