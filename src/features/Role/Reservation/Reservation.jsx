import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReserveCellLayout from "./layout/ReserveCell";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #f4f6fb;

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
  padding-right: 5rem;
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
  padding: 0 !important;
`;

const ReserveWrapper = styled.div`
  display: grid;
  padding: 7.4rem 8rem !important;
  height: 100%;
`;

const InsidePanel = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
`;

const ReserveListColumn = styled.div`
  padding-right: 13rem;
  & > header {
    margin-bottom: 2.5rem;

    font-size: 2.6rem;
    font-weight: 600;
    color: black;
  }
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

function Reservation({ reserveList }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const needResrve =
    reserveList[value] &&
    reserveList[value].filter((item) => item.reserve === "예약필요"); //예약이 필요한 객체들만 분류
  const doneResrve =
    reserveList[value] &&
    reserveList[value].filter((item) => item.reserve === "예약완료"); //예약이 완료된 객체들만 분류

  const needReserveCell =
    needResrve &&
    needResrve.map((element) => {
      return ReserveCellLayout(element);
    });

  const doneReserveCell =
    doneResrve &&
    doneResrve.map((element) => {
      return ReserveCellLayout(element);
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
            <ReserveWrapper>
              {" "}
              <StyledTabPanel value={value}>
                <InsidePanel>
                  <ReserveListColumn>
                    <header>예약필요</header>
                    {needReserveCell}
                  </ReserveListColumn>
                  <ReserveListColumn>
                    <header>예약완료</header>
                    {doneReserveCell}
                  </ReserveListColumn>
                </InsidePanel>
              </StyledTabPanel>
            </ReserveWrapper>
          </TabContext>
        </Box>
      </Wrapper>
    </>
  );
}

export default Reservation;
