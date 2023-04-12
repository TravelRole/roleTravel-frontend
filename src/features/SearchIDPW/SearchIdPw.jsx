import React, { useCallback, useState } from "react";
import styled from "styled-components";
import SearchId from "./layout/id/SearchId";
import SearchPw from "./layout/pw/SearchPw";
import Header from "../layout/Header";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "./layout/TabPanel";

export const SearchWrap = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 54rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 1.5rem;
  padding: 6rem 6rem;

  dl {
    text-align: center;
    margin-bottom: 4.8rem;
    dt {
      font-size: 3.2rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }
    dd {
      font-size: 1.9rem;
      font-weight: 400;
      color: #868686;
    }
  }
`;

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SearchIdPw = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <SearchWrap>
      <Header />
      <SearchContainer>
        <dl>
          <dt>여행역할</dt>
          <dd>가입 시 입력한 정보를 입력해주세요.</dd>
        </dl>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab
            sx={{ fontSize: "1.6rem" }}
            label="아이디 찾기"
            {...a11yProps(0)}
          />
          <Tab
            sx={{ fontSize: "1.6rem" }}
            label="비밀번호 찾기"
            {...a11yProps(1)}
          />
        </Tabs>

        <SearchId value={value} index={0} />
        <SearchPw value={value} index={1} />
      </SearchContainer>
    </SearchWrap>
  );
};

export default SearchIdPw;
