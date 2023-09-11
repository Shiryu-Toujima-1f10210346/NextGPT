import React from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
// css

function Sidebar() {
  const router = useRouter();
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
                className={`md:m-4 lg:m-4 
                object-center 
                flex flex-row justify-center items-center 
                
                text-gray-800 
                lg:p-6 shadow-md 
                hover:shadow-2xl py-4 rounded-xl  ${
                  router.pathname == val.path
                    ? "bg-gray-900"
                    : "hover:bg-gray-200 "
                }`}
              >
                <Link href={val.path}>
                  <div className={styles.icon}>
                    {/* urlとval.idが一緒なら */}
                    {router.pathname == val.path ? val.seleced : val.icon}
                  </div>
                </Link>
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
