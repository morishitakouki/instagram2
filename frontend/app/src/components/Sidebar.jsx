import React from 'react'

import SidebarIcon from './SidebarIcon';
import { SidebarData } from "./SidebarData"
import {  Link } from "react-router-dom";

import '../App.css';

function Sidebar() {
  return (
    <div className='Sidebar'>
      <SidebarIcon/>
      <ul className='SidebarList'>
        {SidebarData.map((value, key) => {
          return (
            <li className='sidebar-item'>
              <div id="icon">{value.icon}</div>
              <div id="title"><Link to={`${value.link}`}>{value.title}</Link></div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar