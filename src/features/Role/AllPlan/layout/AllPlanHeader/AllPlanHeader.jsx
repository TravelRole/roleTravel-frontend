import React, { useEffect } from "react";
import styled from "styled-components";
import { HiOutlineLocationMarker } from "react-icons/hi";
import CommentWrap from "./Comment/CommentWrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../../../Landing/userSlice";
import CustomIcons from "../../../../../assets/icon/customIcons";

const AllPlanHeaderWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

const AllPlanHeaderLocation = styled.div`
  flex: 2;
  max-width: 103rem;
  padding: 1.8rem;
  background-color: #fff;
  border-radius: 1.6rem;
  p {
    font-size: 2.4rem;
    display: flex;
    align-items: center;
    font-weight: 500;
    color: #2e3846;
    gap: 1rem;
    span {
      width: 3rem;
      height: 3rem;
      svg {
        color: #585858;
        font-size: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
    }
  }
`;

const AllPlanHeader = () => {
  const { roomData } = useSelector((state) => state.allPlan);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);
  return (
    <AllPlanHeaderWrap>
      <AllPlanHeaderLocation>
        <p>
          <span>
            <CustomIcons.AllPlanLocationIcon />
          </span>
          {roomData?.location}
        </p>
      </AllPlanHeaderLocation>
      <CommentWrap />
    </AllPlanHeaderWrap>
  );
};

export default AllPlanHeader;
