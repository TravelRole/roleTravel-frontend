import React from "react";
import styled from "styled-components";

const AllPlanContentScheduleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  p {
    font-size: 1.6rem;
    color: #585858;
    font-weight: 500;
  }
`;

const AllPlanContentScheduleMain = styled.div`
  padding: 1.5rem;
  background-color: #fff;
  width: 100%;
  border-radius: 0.8rem;

  dl {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    dt {
      font-size: 1.6rem;
      color: #585858;
      font-weight: 500;
    }
    dd {
      font-size: 1.4rem;
      color: #a7a7a7;
      font-weight: 400;
    }
  }
`;

const AllPlanContentSchedule = ({ placeName, time, isBooked, scheduleEtc }) => {
  const formatTime = time.slice(0, -3);
  return (
    <AllPlanContentScheduleWrap>
      <p>{formatTime}</p>
      <AllPlanContentScheduleMain>
        <dl>
          <dt>{placeName}</dt>
          <dd>
            {isBooked === null
              ? "예약 불필요"
              : isBooked
              ? "예약 완료"
              : "예약 필요"}
          </dd>
          <dd>{scheduleEtc}</dd>
        </dl>
      </AllPlanContentScheduleMain>
    </AllPlanContentScheduleWrap>
  );
};

export default AllPlanContentSchedule;
