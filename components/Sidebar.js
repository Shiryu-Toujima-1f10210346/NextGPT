import React, { useState } from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
// css

function Sidebar() {
  const router = useRouter();
  const [samePath, setSamePath] = useState(false);
  return (
    <div>
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes"></meta>
        <meta name="mobile-web-app-capable" content="yes"></meta>
        {/* router.pathでSidebarDataから検索*/}
        {SidebarData.map((val, key) => {
          if (router.pathname == val.path) {
            return <title key={key}>わからせンクラテス！{val.title}</title>;
          }
        })}
        <link rel="icon" href="/Ncrates.png" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <ul className={styles.sidebar}>
        {SidebarData.map((val, key) => {
          return (
            <div className="bg-black" key={key}>
              <li
                onClick={() => {
                  router.push({
                    pathname: val.path,
                    query: { ...router.query },
                  });
                }}
                key={key}
                className={`
                ${router.pathname == val.path && "border-4 border-gray-800"}
                md:m-4 lg:m-4 
                object-center
                flex flex-row justify-center items-center 
                lg:justify-around lg:text-xl
                text-gray-800 
                lg:p-6 
                hover:shadow-2xl py-4 rounded-full ${
                  router.pathname == val.path
                    ? "bg-white text-black scale-125 lg:scale-100 -translate-y-2 lg:-translate-y-0 transition ease-in-out duration-500"
                    : " "
                }`}
              >
                <div className={`${styles.icon} `}>
                  {/* urlとval.idが一緒なら */}
                  {router.pathname == val.path ? val.selected : val.icon}
                </div>
                {router.pathname != val.path ? (
                  <div className={`${styles.title} ml-4`}>{val.title}</div>
                ) : (
                  ""
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
