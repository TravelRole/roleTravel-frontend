import React from "react";
import styled from "styled-components";
import AllPlanContent from "./layout/PlanContent/AllPlanContent";
import AllPlanComment from "./layout/Comment/AllPlanComment";

const AllPlanWrap = styled.section`
  padding: 8rem 5rem;
  h2 {
    margin-bottom: 4rem;
    font-weight: 500;
    color: #333;
    font-size: 3rem;
  }
`;

const AllPlanContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

function AllPlan() {
  return (
    <>
      <AllPlanWrap>
        <h2>모든 여행 계획</h2>
        <AllPlanContainer>
          <AllPlanContent />
          <AllPlanComment />
        </AllPlanContainer>
      </AllPlanWrap>
    </>
  );
}
export default AllPlan;
