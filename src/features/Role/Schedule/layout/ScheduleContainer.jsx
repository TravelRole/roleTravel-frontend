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
import { delSchedule, getSchedule } from "../scheduleSlice";
import { useParams } from "react-router-dom";
import changeLanCategory from "../utils/changeLanCategory";

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

const EditButtonSection = styled.section`
  width: 100%;
  height: 5.8rem;
  display: flex;
  justify-content: flex-end;
  button {
    padding: 0;
    margin: 1.8rem 0;
    font-family: "Pretendard";
    color: #8490a4;
    font-weight: 500;
    background-color: transparent;
    border: none;
    border-bottom: 0.1rem solid #8490a4;

    cursor: pointer;
  }
`;

const ScheduleWrapper = styled.div`
  padding: 0 6rem 5rem 6rem !important;
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
    background-image: url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11.5' cy='11.5' r='11' stroke='%23DADADA'/%3E%3C/svg%3E%0A");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
    width: 2.3rem;
    height: 2.3rem;
    margin: 0 1.5rem;
    cursor: pointer;

    &:checked {
      background-image: url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11.5' cy='11.5' r='11' fill='%23EEF1F8' style='mix-blend-mode:multiply'/%3E%3Ccircle cx='11.5' cy='11.5' r='11' stroke='%233884FD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.6947 7.29279C17.8822 7.48031 17.9875 7.73462 17.9875 7.99979C17.9875 8.26495 17.8822 8.51926 17.6947 8.70679L9.69471 16.7068C9.50718 16.8943 9.25288 16.9996 8.98771 16.9996C8.72255 16.9996 8.46824 16.8943 8.28071 16.7068L4.28071 12.7068C4.09855 12.5182 3.99776 12.2656 4.00004 12.0034C4.00232 11.7412 4.10749 11.4904 4.29289 11.305C4.4783 11.1196 4.72911 11.0144 4.99131 11.0121C5.25351 11.0098 5.50611 11.1106 5.69471 11.2928L8.98771 14.5858L16.2807 7.29279C16.4682 7.10532 16.7225 7 16.9877 7C17.2529 7 17.5072 7.10532 17.6947 7.29279Z' fill='%233884FD'/%3E%3C/svg%3E ");
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

  const [day, setDay] = useState("1");
  const [date, setDate] = useState(firstDayDate);
  const [delscheduleId, setDelscheduleId] = useState([]);

  useEffect(() => {
    setDate(firstDayDate);

    if (date) dispatch(getSchedule({ roomId, date }));
  }, [dispatch, date, roomId, firstDayDate]);

  const { scheduleList } = useSelector((state) => state.schedule);

  const handleChange = (event, newValue) => {
    setDelscheduleId([]);
    setDay(newValue);
  };

  const delScheduleState = (id) => {
    let copyDelSet = [...delscheduleId];
    let newDelSet = [];
    if (copyDelSet && copyDelSet.includes(id)) {
      newDelSet = copyDelSet.filter((idx) => idx !== id);
      setDelscheduleId(newDelSet);
    } else {
      // newDelSet = copyDelSet.push(id); //얜왜안됌?
      copyDelSet.push(id);
      newDelSet = copyDelSet;
      setDelscheduleId(newDelSet);
    }
  };

  const delScheduleFn = () => {
    dispatch(delSchedule({ roomId, delscheduleId }));
    dispatch(getSchedule({ roomId, date }))
  };

  return (
    <>
      <Box>
        <TabContext value={day}>
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
            <StyledTabPanel value={day}>
              <EditButtonSection>
                {delscheduleId?.length ? (
                  <button onClick={delScheduleFn}>선택삭제</button>
                ) : null}
              </EditButtonSection>
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
                {scheduleList ? (
                  scheduleList.map((schedule) => {
                    const extractedTime = schedule.time.slice(0, 5);
                    const categoryCon = changeLanCategory(schedule.category);
                    return (
                      <ScheduleRow key={schedule.mapPlaceId}>
                        <PlaceNameColumn>
                          <input
                            type="checkbox"
                            onChange={() => delScheduleState(schedule.id)}
                          />
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
                        <DetailColumn>{categoryCon}</DetailColumn>
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
                  })
                ) : (
                  <ScheduleBlankPanel />
                )}
              </ScheduleDetails>
            </StyledTabPanel>
          </ScheduleWrapper>
        </TabContext>
      </Box>
    </>
  );
};

export default ScheduleContainer;
