import React from 'react'
import Icon from "../images/blog.png"
import '../App.css';

function SidebarIcon() {
  return (
    <div className='sidebar-icon'>
      <img src={Icon} alt="" className="icon-size"/>
    </div>
  )
}

export default SidebarIcon