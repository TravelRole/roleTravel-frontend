import React from "react";
import styled from "styled-components";

const MenuWrap = styled.div`
  border: 1px solid #dadada;
  background: #ffffff;
  width: 15rem;
  border-radius: 1rem;
  margin-top: 1rem;
  position: absolute;
  right: -1.2rem;
`;

const MenuContainer = styled.div`
  position: relative;
  padding: 2rem 1.5rem;
  &::after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 0.8rem 1.1rem;
    border-color: #ffffff transparent;
    display: block;
    width: 0;
    top: -1.1rem;
    left: 11.2rem;
  }
  &::before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 0 0.8rem 1.1rem;
    border-color: #dadada transparent;
    display: block;
    width: 0;
    top: -1.2rem;
    left: 11.2rem;
  }
`;

const Menu = ({ children }) => {
  return (
    <MenuWrap>
      <MenuContainer>{children}</MenuContainer>
    </MenuWrap>
  );
};

export default Menu;
