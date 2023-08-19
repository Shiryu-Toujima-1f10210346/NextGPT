import React from "react";
import { SidebarData } from "./SidebarData";
import styles from "./Sidebar.module.css";

// css

function Sidebar() {
  return (
    <div>
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
             md:m-4 lg:m-4 mx-4 object-center flex flex-row justify-center items-center
              hover:bg-gray-200 rounded-xl text-gray-800
              lg:p-6 p-2 shadow-md             "
              >
                <div>{val.icon}</div>
                <div className={styles.icon}>{val.title}</div>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
