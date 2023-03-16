import React from "react";
import styled from "styled-components";
import RadioButton from "../../../components/RadioButton";

const SearchAuthTabWrap = styled.div`
  display: flex;
  gap: 40px;
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const SearchAuthTab = ({ setSearchAuth }) => {
  return (
    <SearchAuthTabWrap>
      <div>
        <RadioButton
          id="email-search"
          name="searchAuth"
          value="email-search"
          onChange={(e) => {
            setSearchAuth(e.target.id);
          }}
        />
        <label htmlFor="email-search">이메일 인증</label>
      </div>
      <div>
        <RadioButton
          id="phone-search"
          name="searchAuth"
          value="phone-search"
          onChange={(e) => {
            setSearchAuth(e.target.id);
          }}
        />
        <label htmlFor="phone-search">휴대폰 인증</label>
      </div>
    </SearchAuthTabWrap>
  );
};

export default SearchAuthTab;
