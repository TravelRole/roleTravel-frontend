import React from "react";
import styled from "styled-components";
import AllPlanContent from "./layout/AllPlanContent";
import AllPlanHeader from "./layout/AllPlanHeader/AllPlanHeader";
import AllPlanMembers from "./layout/AllPlanMembers";

const AllPlanWrap = styled.section`
  padding: 8rem 5rem;
  h2 {
    margin-bottom: 3rem;
    font-weight: 500;
    color: #333;
    font-size: 3rem;
  }
`;

const AllPlanContainer = styled.div``;

function AllPlan() {
  return (
    <>
      <AllPlanWrap>
        <h2>모든 여행 계획</h2>
        <AllPlanContainer>
          <AllPlanHeader />
          <AllPlanMembers />
          <AllPlanContent />
        </AllPlanContainer>
      </AllPlanWrap>
    </>
  );
}
export default AllPlan;
