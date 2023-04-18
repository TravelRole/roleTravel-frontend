import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 5px solid pink;
  padding: 2rem;
`;

const DayRangeContainer = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const DayBox = styled.div`
  box-shadow: 0 0 0 0.3px gray;
  padding: 10px;
  border: ${(props) => (props.selected ? "2px solid black" : "none")};

  &:hover {
    background-color: skyblue;
    cursor: pointer;
  }
`;

const Day = styled.div``;
const Date = styled.div``;

const ScheduleDetailContainer = styled.div`
  border: 2px solid black;
  padding: 1rem;
`;
const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ColumnBox = styled.div`
  flex: ${(props) => (props.flex === undefined ? 2 : props.flex)};
  padding: 0.5rem;
  box-shadow: 0 0 0 0.3px gray;
  overflow: scroll;
  white-space: nowrap;
  overflow: scroll hidden;

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
`;

const DayTime = [
  { Day: "1일차", Date: "03.10(금)" },
  { Day: "2일차", Date: "03.11(토)" },
  { Day: "3일차", Date: "03.12(일)" },
];

function ScheduleContainer({ schedulelist }) {

  for (const property in schedulelist) {
    schedulelist[property].sort((a, b) => {
      const Atime = a.time.split(":");
      const AMinutes = Number(Atime[0]) * 60 + Number(Atime[1]);
      const Btime = b.time.split(":");
      const BMinutes = Number(Btime[0]) * 60 + Number(Btime[1]);

      if (AMinutes - BMinutes < 0) return -1;
      if (AMinutes - BMinutes > 0) return 1;
      return 0;
    });
  }

  const [day, setDay] = useState(1);
  const [checked, setChecked] = useState();

  return (
    <Container>
      <DayRangeContainer className="일차컨테이너">
        {DayTime.map((item, i) => {
          return (
            <DayBox
              key={i}
              className="일자박스"
              onClick={() => {
                setDay(i + 1);
                setChecked(false);
              }}
              selected={i + 1 === day ? true : false}
            >
              <Day>{item.Day}</Day>
              <Date>{item.Date}</Date>
            </DayBox>
          );
        })}
      </DayRangeContainer>

      <ScheduleDetailContainer>
        <ColumnContainer>
          <ColumnBox flex={0.5}></ColumnBox>
          <ColumnBox flex={0.5}>순번</ColumnBox>
          <ColumnBox>장소 (주소)</ColumnBox>
          <ColumnBox>시간</ColumnBox>
          <ColumnBox>예약여부</ColumnBox>
          <ColumnBox>금액</ColumnBox>
          <ColumnBox>링크</ColumnBox>
          <ColumnBox>비고</ColumnBox>
        </ColumnContainer>

        {schedulelist[day].map((item, i) => {
          const uniqueKey = item.Day + (i + 1);
          return (
            <ColumnContainer key={i}>
              <ColumnBox flex={0.5}>
                <input
                  key={uniqueKey}
                  type="checkbox"
                  checked={uniqueKey === checked ? true : false}
                  onChange={() => {
                    console.log(uniqueKey);
                    setChecked(uniqueKey);
                  }}
                ></input>
              </ColumnBox>
              <ColumnBox flex={0.5}>{i + 1}</ColumnBox>
              <ColumnBox>
                {item.placeName} ({item.placeAddress})
              </ColumnBox>
              <ColumnBox>{item.time}</ColumnBox>
              <ColumnBox>{item.reserve}</ColumnBox>
              <ColumnBox>미정</ColumnBox>
              <ColumnBox><a href={item.WebsiteLink} target="_blank" rel="noreferrer">{item.WebsiteLink}</a></ColumnBox>
              <ColumnBox>{item.Extra}</ColumnBox>
            </ColumnContainer>
          );
        })}
      </ScheduleDetailContainer>
    </Container>
  );
}

export default ScheduleContainer;
