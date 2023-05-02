import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import axios from "axios";
import tokenApi from "../../../../lib/customAPI";
import { useParams } from "react-router-dom";

const StyledTabContext = styled(TabContext)``;

const StyledTabs = styled(TabList)`
  position: relative;
  top: -2.5rem;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;

  .MuiButtonBase-root {
    text-align: left;
    justify-content: flex-end;
    margin-bottom: 0.6rem;
    padding: 0;
  }
  .MuiTabs-indicator {
    height: 0.2rem;
    width: 100%;
    border-radius: 1rem;
    background-image: ${({ indicatorColor }) => indicatorColor};
  }
`;
const StyleTab = styled(Tab)`
  margin-right: 2.6rem !important;
`;

const StyleinnerTabBox = styled.div`
  width: 100%;
  text-align: left;
  color: #3884fd;
  p {
    width: 10rem;
    font-family: "Pretendard";
    font-weight: 600;
    font-size: 2rem;
    &.active {
      &::after {
        content: "";
        position: absolute;
        margin-left: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        background-color: #ffc759;
        border-radius: 50%;
      }
    }
  }
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0 !important;
`;
const SearchAndWant = () => {
  const [filter, setFilter] = useState("search");

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { roomId } = useParams();

  useEffect(() => {
    tokenApi
      .get(`${baseUrl}api/want-place?roomId=${roomId}`)
      .then((Response) => {
        console.log(Response);
      })
      .catch((Error) => {
        console.log(Error);
      });
  }, [baseUrl, roomId]);

  return (
    <>
      <StyledTabContext value={filter}>
        <Box sx={{ mb: -1 }}>
          <StyledTabs
            indicatorColor="linear-gradient(270deg, #3884fd 0%, #9fa9ff 100%)"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <StyleTab
              label={
                <StyleinnerTabBox>
                  <p className={filter === "search" ? "active" : ""}>
                    검색하기
                  </p>
                </StyleinnerTabBox>
              }
              value={"search"}
            />
            <StyleTab
              label={
                <StyleinnerTabBox>
                  <p className={filter === "wish" ? "active" : ""}>
                    찜한여행지
                  </p>
                </StyleinnerTabBox>
              }
              value={"wish"}
            />
          </StyledTabs>
        </Box>
        <StyledTabPanel value={"search"}>검색</StyledTabPanel>
        <StyledTabPanel value={"wish"}>찜목록</StyledTabPanel>
      </StyledTabContext>
    </>
  );
};

export default SearchAndWant;
