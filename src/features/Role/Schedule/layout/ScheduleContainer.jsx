import React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";

const StyledBox = styled(Box)`
  padding-left: 6rem;
`;

const StyledScheduleTabs = styled(TabList)`
  position: relative;
  top: 0.3rem;

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

const StyleTab = styled(Tab)`
  margin-right: 2.6rem !important;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0 !important;
`;

const ScheduleWrapper = styled.div`
  padding: 3rem 6rem 0 6rem !important;
`;
const ColumnHeader = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 5rem;
  padding: 1.4rem 0;
  background: #eef1f8;
  border-radius: 0.8rem;
`;

const Column = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: 1.8rem;
  color: #8490a4;
  border-right: 0.2rem solid #d8e2f4;
`;
const PlaceNameColumn = styled(Column)`
  justify-content: flex-start;
  font-weight: 500;
  color: #333333;

  input {
    appearance: none;
    border-radius: 50%;
    background-color: #d9d9d9;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.78247 4.27374L5.4121 7.89268L12.2177 1.10718' stroke='%23F5F5F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
    width: 2.1rem;
    height: 2.1rem;
    margin: 0 1.5rem;
    cursor: pointer;

    &:checked {
      background-color: #3884fd;
      background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.78247 4.27374L5.4121 7.89268L12.2177 1.10718' stroke='%23F5F5F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
`;
const DetailColumn = styled(Column)`
  font-size: 1.6rem;
`;

const NoteColumn = styled(Column)`
  border-right: none;
`;

const NoteDetailColumn = styled(NoteColumn)`
  font-size: 1.6rem;
`;

const ScheduleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 0;
`;

const ScheduleRow = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  padding: 1.3rem 0;
  border-radius: 0.8rem;
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

const ScheduleBox = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box>
        <TabContext value={value}>
          <StyledBox sx={{ borderBottom: 2, borderColor: "#D8E2F4" }}>
            <StyledScheduleTabs
              indicatorColor="linear-gradient(270deg, #3884fd 0%, #9fa9ff 100%)"
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              {ReservationDay.map((item, i) => {
                return (
                  <StyleTab
                    key={i}
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
            </StyledScheduleTabs>
          </StyledBox>
          <ScheduleWrapper>
            <StyledTabPanel value="1">
              <ColumnHeader>
                <Column flex={3.5}>장소</Column>
                <Column flex={1}>시간</Column>
                <Column flex={1}>예약여부</Column>
                <Column flex={1}>카테고리</Column>
                <Column flex={1.5}>금액</Column>
                <Column flex={2}>링크</Column>
                <NoteColumn flex={4}>비고</NoteColumn>
              </ColumnHeader>
              <ScheduleDetails>
                <ScheduleRow>
                  <PlaceNameColumn flex={3.5}>
                    <input type="checkbox" />
                    연돈
                  </PlaceNameColumn>
                  <DetailColumn flex={1}>10:00</DetailColumn>
                  <DetailColumn flex={1}>필요</DetailColumn>
                  <DetailColumn flex={1}>식당</DetailColumn>
                  <DetailColumn flex={1.5}>1,231,230원</DetailColumn>
                  <DetailColumn flex={2}>https://www.naver</DetailColumn>
                  <NoteDetailColumn flex={4}>
                    제일깔끔하고 괜찮아보여서 선정했어요.
                  </NoteDetailColumn>
                </ScheduleRow>
                <ScheduleRow>
                  <PlaceNameColumn flex={3.5}>
                    <input type="checkbox" />
                    연돈
                  </PlaceNameColumn>
                  <DetailColumn flex={1}>10:00</DetailColumn>
                  <DetailColumn flex={1}>필요</DetailColumn>
                  <DetailColumn flex={1}>식당</DetailColumn>
                  <DetailColumn flex={1.5}>1,231,230원</DetailColumn>
                  <DetailColumn flex={2}>https://www.naver</DetailColumn>
                  <NoteDetailColumn flex={4}>
                    제일깔끔하고 괜찮아보여서 선정했어요.
                  </NoteDetailColumn>
                </ScheduleRow>
                <ScheduleRow>
                  <PlaceNameColumn flex={3.5}>
                    <input type="checkbox" />
                    연돈
                  </PlaceNameColumn>
                  <DetailColumn flex={1}>10:00</DetailColumn>
                  <DetailColumn flex={1}>필요</DetailColumn>
                  <DetailColumn flex={1}>식당</DetailColumn>
                  <DetailColumn flex={1.5}>1,231,230원</DetailColumn>
                  <DetailColumn flex={2}>https://www.naver</DetailColumn>
                  <NoteDetailColumn flex={4}>
                    제일깔끔하고 괜찮아보여서 선정했어요.
                  </NoteDetailColumn>
                </ScheduleRow>
              </ScheduleDetails>
            </StyledTabPanel>
            <StyledTabPanel value="2">Item Two</StyledTabPanel>
            <StyledTabPanel value="3">Item Three</StyledTabPanel>
          </ScheduleWrapper>
        </TabContext>
      </Box>
    </>
  );
};

export default ScheduleBox;
