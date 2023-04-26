import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReserveCellLayout from "./layout/ReserveCell";
import BlankPanel from "./layout/BlankPanel";

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
  margin: 7.8rem 0 6rem 5rem;
  font-size: 3rem;
  font-weight: 600;
`;

const StyledBox = styled(Box)`
  padding-left: 5rem;
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
  padding-bottom: 1.2rem;
  padding-right: 7.5rem;
`;

const Day = styled.div`
  font-family: "Pretendard";
  font-size: 2rem;
  color: rgba(83, 100, 127, 1);
`;

const Date = styled.div`
  font-family: "Pretendard";
  font-size: 1.8rem;
  color: rgba(132, 144, 164, 1);
`;

const StyledTabPanel = styled(TabPanel)`
  margin-right: 2.6rem;
  padding: 0 !important;
`;

const ReserveWrapper = styled.div`
  display: grid;
  padding: 3rem 5rem !important;
  height: 100%;
`;

const InsidePanel = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 50%);
`;

const ReserveListColumn = styled.div`
  padding: 2.5rem;
  background-color: #eef1f8;
  border-radius: 1.6rem;
  & > header {
    margin-bottom: 2.5rem;

    font-size: 2.4rem;
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

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const isUndefined = reserveList[value];

  //예약이 필요한 객체들만 분류
  const needResrve =
    reserveList[value] &&
    reserveList[value].filter((item) => item.reserve === "예약필요");
  
  //예약이 완료된 객체들만 분류 
  const doneResrve =
    reserveList[value] &&
    reserveList[value].filter((item) => item.reserve === "예약완료"); 

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
                {isUndefined === undefined || isUndefined.length === 0 ? (
                  <BlankPanel />
                ) : (
                  <InsidePanel>
                    <ReserveListColumn>
                      <header>예약 예정</header>
                      {needResrve &&
                        needResrve.map((element) => (
                          <ReserveCellLayout
                            element={element}
                          ></ReserveCellLayout>
                        ))}
                    </ReserveListColumn>
                    <ReserveListColumn>
                      <header>최종 일정</header>
                      {doneResrve &&
                        doneResrve.map((element) => (
                          <ReserveCellLayout
                            element={element}
                          ></ReserveCellLayout>
                        ))}
                    </ReserveListColumn>
                  </InsidePanel>
                )}
              </StyledTabPanel>
            </ReserveWrapper>
          </TabContext>
        </Box>
      </Wrapper>
    </>
  );
}

export default Reservation;
