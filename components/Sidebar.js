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
                lg:justify-around lg:text-xl
                text-gray-800 
                lg:p-6 shadow-md 
                hover:shadow-2xl py-4 rounded-full ${
                  router.pathname == val.path
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-200 "
                }`}
              >
                <Link href={val.path}>
                  <div className={styles.icon}>
                    {/* urlとval.idが一緒なら */}
                    {router.pathname == val.path ? val.selected : val.icon}
                  </div>
                </Link>
                {router.pathname == val.path ? (
                  ""
                ) : (
                  <div className={`${styles.title} ml-4`}>{val.title}</div>
                )}
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
