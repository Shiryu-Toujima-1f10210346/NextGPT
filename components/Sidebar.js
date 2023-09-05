import React from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.css";
import Head from "next/head";

// css

function Sidebar() {
  return (
    <div>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <ul className={styles.sidebar}>
        {SidebarData.map((val, key) => {
          return (
            <div className="">
              <li
                key={key}
                onClick={() => {
                  window.location.pathname = val.path;
                }}
                className="
             md:m-4 lg:m-4 object-center flex flex-row justify-center items-center
              hover:bg-gray-200 rounded-xl text-gray-800
              lg:p-6 shadow-md hover:shadow-2xl py-4
              "
              >
                <div className={styles.icon}>{val.icon}</div>
                <div className={styles.title}>{val.title}</div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
