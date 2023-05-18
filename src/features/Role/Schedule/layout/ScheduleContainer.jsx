import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import ScheduleBlankPanel from "./ScheduleBlankPanel";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../scheduleSlice";
import { useParams } from "react-router-dom";

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
  gap: 0.5rem;
  flex-direction: column;
  text-align: left;
  width: 100%;
  padding-bottom: 1.5rem;
  padding-right: 7.5rem;
`;

const Day = styled.div`
  font-family: "Pretendard";
  font-size: 2rem;
  color: rgba(83, 100, 127, 1);
`;

const Date = styled.div`
  font-family: "Pretendard";
  font-size: 1.6rem;
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
  div {
    display: flex;
    justify-content: center;
  }
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
  width: 25%;
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
  width: 7%;

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    height: 0.4rem;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const DetailFeeColumn = styled(DetailColumn)`
  width: 10%;
`;

const DetailLinkColumn = styled(DetailColumn)`
  width: 14%;
  justify-content: flex-start;
  padding: 0 1rem;
  a {
    font-size: 1.6rem;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.6rem;
  }
`;

const NoteColumn = styled(Column)`
  border-right: none;
`;

const NoteDetailColumn = styled(NoteColumn)`
  width: 30%;

  justify-content: flex-start;
  padding: 0 1rem;

  span {
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 1.6rem;

    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    &::-webkit-scrollbar {
      height: 0.4rem;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #cdcdf4;
    }
  }
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

const ScheduleContainer = ({ travelDayList, firstDayDate }) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const [date, setDate] = useState(firstDayDate);
  const [value, setValue] = useState("1");

  useEffect(() => {
    setDate(firstDayDate);

    if (date) dispatch(getSchedule({ roomId, date }));
  }, [dispatch, date, roomId, firstDayDate]);

  const { scheduleList } = useSelector((state) => state.schedule);
 console.log(scheduleList)
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
              {travelDayList.map(({ idx, date, day }) => {
                const transformedDate =
                  date.split("-")[1] + "." + date.split("-")[2];
                return (
                  <StyleTab
                    key={date}
                    label={
                      <DateBox>
                        <Day>{idx}일차</Day>
                        <Date>
                          {transformedDate}({day})
                        </Date>
                      </DateBox>
                    }
                    value={`${idx}`}
                    onClick={() => {
                      setDate(date);
                      if (date) dispatch(getSchedule({ roomId, date }));
                    }}
                  />
                );
              })}
            </StyledScheduleTabs>
          </StyledBox>
          <ScheduleWrapper>
            <StyledTabPanel value="1">
              <ColumnHeader>
                <PlaceNameColumn>장소</PlaceNameColumn>
                <DetailColumn>시간</DetailColumn>
                <DetailColumn>예약여부</DetailColumn>
                <DetailColumn>카테고리</DetailColumn>
                <DetailFeeColumn>금액</DetailFeeColumn>
                <DetailLinkColumn>링크</DetailLinkColumn>
                <NoteDetailColumn>비고</NoteDetailColumn>
              </ColumnHeader>
              <ScheduleDetails>
                {scheduleList &&
                  scheduleList.map((schedule) => {
                    const extractedTime = schedule.time.slice(0, 5);
                    return (
                      <ScheduleRow>
                        <PlaceNameColumn>
                          <input type="checkbox" />
                          {schedule.placeName}
                        </PlaceNameColumn>
                        <DetailColumn>{extractedTime}</DetailColumn>
                        <DetailColumn>
                          {schedule.isBooked === null
                            ? "불필요"
                            : schedule.isBooked === true
                            ? "예약완료"
                            : "필요"}
                        </DetailColumn>
                        <DetailColumn>{schedule.category}</DetailColumn>
                        <DetailFeeColumn>{schedule.price}</DetailFeeColumn>
                        <DetailLinkColumn>
                          <span>
                            <a
                              href={schedule.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {schedule.link}
                            </a>
                          </span>
                        </DetailLinkColumn>
                        <NoteDetailColumn>
                          <span> {schedule.etc} </span>
                        </NoteDetailColumn>
                      </ScheduleRow>
                    );
                  })}
              </ScheduleDetails>
            </StyledTabPanel>
            <StyledTabPanel value="2">
              <ScheduleBlankPanel />
            </StyledTabPanel>
            <StyledTabPanel value="3">Item Three</StyledTabPanel>
          </ScheduleWrapper>
        </TabContext>
      </Box>
    </>
  );
};

export default ScheduleContainer;
