import React, { useEffect } from "react";
import styled from "styled-components";
import AllPlanHeader from "./layout/AllPlanHeader/AllPlanHeader";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../Landing/userSlice";
import { getAllPlanList, getRoomData } from "./allPlanSlice";
import { useParams } from "react-router-dom";
import AllPlanContent from "./layout/AllPlanContent/AllPlanContent";
import AllPlanMembers from "./layout/AllPlanMember/AllPlanMembers";

const AllPlanWrap = styled.section`
  padding: 8rem 15rem 8rem 5rem;
  h2 {
    margin-bottom: 3rem;
    font-weight: 500;
    color: #333;
    font-size: 3rem;
  }
`;

const AllPlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

function AllPlan() {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(getAllPlanList(roomId));
    dispatch(getRoomData(roomId));
    dispatch(getUserInfo());
  }, [dispatch, roomId]);

  return (
    <AllPlanWrap>
      <h2>모든 여행 계획</h2>
      <AllPlanContainer>
        <AllPlanHeader />
        <AllPlanMembers />
        <AllPlanContent />
      </AllPlanContainer>
    </AllPlanWrap>
  );
}
export default AllPlan;
