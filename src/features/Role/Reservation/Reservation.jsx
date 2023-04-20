import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #f4f6fb;
  /* border: 5px solid aqua; */

  font-size: 1.6rem;
  overflow: ${(props) =>
    props.isAddModal ? "hidden hidden" : "hidden scroll"};

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
`;

const PageHeader = styled.header`
  margin: 8rem 0 5.5rem 8rem;
  font-size: 3rem;
  font-weight: 600;
`;

const StyledBox = styled(Box)`
  padding-left: 8rem;
`;

const StyledTabs = styled(TabList)`
  position: relative;
  top: 0.25rem;

  .MuiButtonBase-root {
    text-align: left;
    padding: 0;
  }
  .MuiTabs-indicator {
    height: 0.4rem;
    width: 100%;
    border-radius: 1rem;
    background-image: ${({ indicatorColor }) => indicatorColor};
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  padding-left: 1.5rem;
  padding-bottom: 1.2rem;
`;

const Day = styled.div`
  font-family: "Pretendard";
  font-size: 2.4rem;
  color: rgba(83, 100, 127, 1); ;
`;

const Date = styled.div`
  font-family: "Pretendard";
  font-size: 1.8rem;
  color: rgba(132, 144, 164, 1);
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 7.4rem 8rem !important;
`;
const ReservationDay = [
  { CountDay: 1, Date: "4.17(월)" },
  { CountDay: 2, Date: "4.18(화)" },
  { CountDay: 3, Date: "4.19(수)" },
  { CountDay: 4, Date: "4.20(목)" },
  { CountDay: 5, Date: "4.21(금)" },
  { CountDay: 6, Date: "4.22(토)" },
  { CountDay: 7, Date: "4.23(일)" },
];

const ReserveWrapper = styled.div`
  display: grid;
  padding: 10px;
  height: 100%;
  grid-template-columns: repeat(4, 25%);
  grid-auto-rows: 300px;
  grid-gap: 2px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 50%);
  }
`;

const ReserveCell = styled.div`
  border: 2px solid purple;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  div {
    margin-bottom: 1rem;
  }
`;

function Reservation({ reserveList }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const objArray = Object.keys(reserveList).map((key) => {
    return reserveList[key].filter((item) => item.reserve === "예약필요");
  });

  const needResrveArr = objArray.map((item) => {
    return item.map((item) => {
      return (
        <ReserveCell>
          <div>
            <input type="checkbox"></input>
          </div>
          <div>{item.Day} 일차 </div>
          <div>장소(주소) : {item.placeName}</div>
          <div>시간 : {item.time}</div>
          <div>링크 : {item.WebsiteLink}</div>
          <div>비고 : {item.Extra}</div>
          <div>커멘트 :</div>
        </ReserveCell>
      );
    });
  });

  return (
    <>
      <Wrapper>
        <PageHeader>예약</PageHeader>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <StyledBox sx={{ borderBottom: 2, borderColor: "#D8E2F4" }}>
              <StyledTabs
                indicatorColor="linear-gradient(270deg, #3884fd 0%, #9fa9ff 100%)"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {ReservationDay.map((item, i) => {
                  return (
                    <Tab
                      sx={{ marginRight: "5rem" }}
                      label={
                        <DateBox>
                          <Day>{item.CountDay}일차</Day>
                          <Date>{item.Date}</Date>
                        </DateBox>
                      }
                      value={`${i + 1}`}
                    />
                  );
                })}
              </StyledTabs>
            </StyledBox>
            <StyledTabPanel value="1">Item One</StyledTabPanel>
            <StyledTabPanel value="2">Item Two</StyledTabPanel>
            <StyledTabPanel value="3">Item Three</StyledTabPanel>
            <StyledTabPanel value="4">Item 4</StyledTabPanel>
            <StyledTabPanel value="5">Item 5</StyledTabPanel>
            <StyledTabPanel value="6">Item 6</StyledTabPanel>
            <StyledTabPanel value="7">Item 7</StyledTabPanel>
          </TabContext>
        </Box>
        <ReserveWrapper>{needResrveArr}</ReserveWrapper>
      </Wrapper>
    </>
  );
}

export default Reservation;
