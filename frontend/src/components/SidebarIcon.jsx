import React from 'react';
import styled from 'styled-components';
import Icon from "../images/Logo.png";

const StyledSidebarIcon = styled.div`
  margin-bottom: 90px;

  img.icon-size {
    width: 196px;
    height: auto;
  }
`;

const SidebarIcon = () => {
  return (
    <StyledSidebarIcon>
      <img src={Icon} alt="" className="icon-size"/>
    </StyledSidebarIcon>
  );
};

export default SidebarIcon;
