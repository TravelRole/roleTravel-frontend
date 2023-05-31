import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Icons from "../../../../../assets/icon/icon";
import CustomIcons from "../../../../../assets/icon/customIcons";
import { useSelector } from "react-redux";
import AllPlanMemberCard from "./AllPlanMemberCard";

const AllPlanMembersWrap = styled.section``;

const AllPlanMembersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  dl.all-plan-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    dt {
      width: 2.9rem;
      height: 2.9rem;
      color: #333;
      svg {
        width: 2.4rem;
        height: 2.4rem;
      }
    }
    dd {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 2.4rem;
      font-weight: 500;
      color: #333;

      span {
        font-size: 2rem;
        font-weight: 500;
        color: #707070;
      }
    }
  }

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
    button {
      padding: 0;
      background: none;
      border: none;
      width: 2.7rem;
      height: 2.7rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #8490a4;
      svg {
        width: 100%;
        height: 100%;
      }

      &:disabled {
        color: #d9d9d9;
      }
    }
  }
`;

const AllPlanMembersContainer = styled.div`
  margin-top: 2rem;
  overflow: hidden;
`;

const AllPlanMembersSliderWrap = styled.div`
  width: ${({ currentLength }) => `calc(${currentLength} * 37rem)`};
`;

const AllPlanMembersSlider = styled.div`
  display: flex;
  gap: 1rem;
  transition: transform 0.3s ease-in-out;
`;

const AllPlanMembersSlide = styled.div`
  width: 100%;
  max-width: 36rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function chunkArray(array, size) {
  var chunkedArray = [];
  for (var i = 0; i < array?.length; i += size) {
    chunkedArray.push(array?.slice(i, i + size));
  }
  return chunkedArray;
}

const AllPlanMembers = () => {
  const { roomData, roomDataLoading } = useSelector((state) => state.allPlan);
  const [currentSlide, setCurrentSlide] = useState(0);
  const members = chunkArray(roomData?.roles, 2);

  const handleSlider = useCallback(
    (e) => {
      const { className } = e.currentTarget;
      if (className === "members-left" && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      } else if (
        className === "members-right" &&
        currentSlide < members?.length - 1
      ) {
        setCurrentSlide((prev) => prev + 1);
      }
    },
    [currentSlide, members?.length]
  );

  return (
    <AllPlanMembersWrap>
      <AllPlanMembersHeader>
        <dl className="all-plan-title">
          <dt>
            <CustomIcons.AllPlanMemberIcon />
          </dt>
          <dd>
            참여자 <span>({roomData?.roles?.length}명)</span>
          </dd>
        </dl>
        <div>
          <button
            className="members-left"
            disabled={currentSlide === 0}
            onClick={handleSlider}
          >
            <Icons.HiOutlineChevronLeft />
          </button>
          <button
            className="members-right"
            disabled={
              members?.length === currentSlide + 1 || members?.length < 5
            }
            onClick={handleSlider}
          >
            <Icons.HiOutlineChevronRight />
          </button>
        </div>
      </AllPlanMembersHeader>
      <AllPlanMembersContainer>
        <AllPlanMembersSliderWrap
          currentLength={
            roomData?.roles.length < 4
              ? roomData?.roles.length
              : members?.length
          }
        >
          <AllPlanMembersSlider
            style={{
              transform: `translateX(-${currentSlide * 37}rem)`,
            }}
          >
            {roomData?.roles &&
              (roomData?.roles.length < 4
                ? roomData?.roles.map((member, index) => (
                    <AllPlanMembersSlide key={index}>
                      <AllPlanMemberCard {...member} />
                    </AllPlanMembersSlide>
                  ))
                : members?.map((member, index) => (
                    <AllPlanMembersSlide key={index}>
                      {member.map((data, index) => (
                        <AllPlanMemberCard key={index} {...data} />
                      ))}
                    </AllPlanMembersSlide>
                  )))}
          </AllPlanMembersSlider>
        </AllPlanMembersSliderWrap>
      </AllPlanMembersContainer>
    </AllPlanMembersWrap>
  );
};

export default AllPlanMembers;
