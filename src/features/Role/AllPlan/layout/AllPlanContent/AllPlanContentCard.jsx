import styled from "@emotion/styled";
import React from "react";
import AllPlanContentSchedule from "./AllPlanContentSchedule";

const AllPlanContentCardWrap = styled.div`
  padding: 2.5rem 2rem;
  background-color: #eef1f8;
  border-radius: 1.6rem;
  width: 100%;
  max-width: 28rem;
`;

const AllPlanContentCardHeader = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 0.1rem solid #cfcfcf;
  dl {
    dt {
      font-weight: 500;
      font-size: 1.8rem;
      color: #333;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      span {
        font-size: 1.6rem;
        color: #707070;
      }
    }
    dd {
      font-size: 1.4rem;
      color: #a7a7a7;
      font-weight: 500;
    }
  }
`;

const AllPlanContentCardMainWrap = styled.div`
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AllPlanContentCard = ({
  day,
  date,
  dayOfTheWeek,
  travelExpense,
  schedules,
}) => {
  return (
    <AllPlanContentCardWrap>
      <AllPlanContentCardHeader>
        <dl>
          <dt>
            {day}일차
            <span>
              {date} ({dayOfTheWeek})
            </span>
          </dt>
          <dd>경비 {travelExpense}</dd>
        </dl>
      </AllPlanContentCardHeader>
      <AllPlanContentCardMainWrap>
        {schedules.map((schedule, i) => (
          <AllPlanContentSchedule key={i} {...schedule} />
        ))}
      </AllPlanContentCardMainWrap>
    </AllPlanContentCardWrap>
  );
};

export default AllPlanContentCard;
