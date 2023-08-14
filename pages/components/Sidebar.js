import React from 'react'
import {SidebarData} from './SidebarData'
import Link from 'next/link';
function Sidebar() {
  return (
    <div>
      <ul>
        {SidebarData.map((val, key) => {
          return (
            <div className='p-2 m-2'>
            <li key = {key} onClick={() => {window.location.pathname = val.path}}>
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