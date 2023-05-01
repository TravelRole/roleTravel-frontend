import React, { useCallback, useState } from "react";
import {
  TravelListContainer,
  TravelListSliderButtons,
  TravelListWrap,
} from "./Traveling";
import TravelSlider from "../../../lib/TravelSlider";
import { useSelector } from "react-redux";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const EndTravel = () => {
  const { currentEndTravelList } = useSelector((state) => state.travel);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlider = useCallback(
    (e) => {
      const { name } = e.currentTarget;
      if (name === "left" && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      } else if (
        name === "right" &&
        currentSlide < currentEndTravelList.length - 1
      ) {
        setCurrentSlide((prev) => prev + 1);
      }
    },
    [currentSlide, currentEndTravelList.length]
  );
  return (
    <TravelListWrap>
      <TravelListContainer>
        <TravelSlider
          travelData={currentEndTravelList}
          currentIndex={currentSlide}
        />
      </TravelListContainer>
      {currentEndTravelList.length > 3 && (
        <TravelListSliderButtons>
          <button
            className="travel-left-btn"
            name="left"
            onClick={handleSlider}
            disabled={currentSlide === 0}
          >
            <HiOutlineChevronLeft />
          </button>
          <button
            className="travel-right-btn"
            name="right"
            onClick={handleSlider}
            disabled={currentEndTravelList.length === currentSlide + 1}
          >
            <HiOutlineChevronRight />
          </button>
        </TravelListSliderButtons>
      )}
    </TravelListWrap>
  );
};

export default EndTravel;
