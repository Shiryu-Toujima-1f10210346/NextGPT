import React from 'react'
import {SidebarData} from './SidebarData'
import styles from './Sidebar.module.css'

// css


function Sidebar() {
  return (
    <div>
      <ul className={styles.sidebar}>
        {SidebarData.map((val, key) => {
          return (
            <div >
            <li key = {key} onClick={() => {window.location.pathname = val.path}}
             className="
             m-4 object-center flex flex-row justify-center items-center
              hover:bg-gray-200 rounded-xl text-gray-800
              py-4 shadow 
             ">
              <div>{val.icon}</div>
              <div>{val.title}</div>
            </li>
            </div>
          );
        })}
      </ul>
    </div>
  )
}


export default Sidebar