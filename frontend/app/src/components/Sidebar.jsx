import React from 'react';
import styled from 'styled-components';
import SidebarIcon from './SidebarIcon';
import { SidebarData } from "./SidebarData";
import { Link } from "react-router-dom";

const StyledSidebar = styled.div`
  width: 200px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: white;
  padding: 20px;
`;

const StyledLink = styled(Link)`
  display: block;
  color: black;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;

  &:hover {
    background-color: #ddd;
  }
`;

const StyledSidebarItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <SidebarIcon/>
      <ul className='SidebarList'>
        {SidebarData.map((value, key) => {
          return (
            <StyledSidebarItem key={key}>
              <div id="icon">{value.icon}</div>
              <div id="title"><StyledLink to={`${value.link}`}>{value.title}</StyledLink></div>
            </StyledSidebarItem>
          )
        })}
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;
