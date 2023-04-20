import React, { useCallback, useState } from "react";
import styled from "styled-components";
import {
  HiPlus,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi";
import airPlan from "../../../assets/images/airplan.png";
import addTravelImg from "../../../assets/images/addTravelImg.png";
import { useSelector } from "react-redux";
import TravelCard from "./TravelCard";

const TravelingWrap = styled.section`
  width: 100%;
  position: relative;
`;

const TravelingContainer = styled.div`
  padding: 0 11.2rem;
  display: flex;
  gap: 2.3rem;
`;

const AddTravelCard = styled.div`
  padding: 4.4rem 3rem;
  border-radius: 1.5rem;
  min-width: 35rem;
  min-height: 48rem;
  background-image: url(${addTravelImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;

  dl {
    dt {
      width: 4rem;
      height: 2.5rem;
      background-image: url(${airPlan});
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      margin-bottom: 2.4rem;
    }
    dd {
      font-size: 3.2rem;
      line-height: 4rem;
      color: #fff;
      font-weight: 500;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 50%;
    border: none;
    background-color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    svg {
      color: #3884fd;
      width: 2.837rem;
      height: 2.877rem;
    }
  }
`;

const TravelingSliderWrap = styled.div`
  width: ${(currentLength) => `calc(${currentLength} * 35rem)`};
  overflow: hidden;
  position: relative;
`;

const TravelingSlider = styled.div`
  display: flex;
  gap: 2.3rem;
  transition: transform 0.3s ease-in-out;
`;

const TravelingSliderBtn = styled.div`
  display: flex;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      font-size: 2rem;
      color: #fff;
      stroke-width: 0.3rem;
    }

    &.travel-left-btn {
      left: 4.4rem;
    }
    &.travel-right-btn {
      right: 4.4rem;
    }
  }
`;

const Traveling = () => {
  const { currentTravelingList } = useSelector((state) => state.travel);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlider = useCallback(
    (e) => {
      const { name } = e.currentTarget;
      if (name === "left" && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      } else if (
        name === "right" &&
        currentSlide < currentTravelingList.length - 1
      ) {
        setCurrentSlide((prev) => prev + 1);
      }
    },
    [currentSlide, currentTravelingList.length]
  );
  return (
    <TravelingWrap>
      <TravelingContainer>
        <AddTravelCard>
          <dl>
            <dt></dt>
            <dd>
              새로운 여행 계획을
              <br />
              시작해보세요!
            </dd>
          </dl>
          <button>
            <HiPlus />
          </button>
        </AddTravelCard>
        <TravelingSliderWrap currentLength={currentTravelingList.length}>
          <TravelingSlider
            style={{
              transform: `translateX(-${currentSlide * (35 + 2.3)}rem)`,
            }}
          >
            {currentTravelingList.map((travel) => (
              <TravelCard key={travel.roomId} {...travel} />
            ))}
          </TravelingSlider>
        </TravelingSliderWrap>
      </TravelingContainer>
      <TravelingSliderBtn>
        <button className="travel-left-btn" name="left" onClick={handleSlider}>
          <HiOutlineChevronLeft />
        </button>
        <button
          className="travel-right-btn"
          name="right"
          onClick={handleSlider}
        >
          <HiOutlineChevronRight />
        </button>
      </TravelingSliderBtn>
    </TravelingWrap>
  );
};

export default Traveling;
