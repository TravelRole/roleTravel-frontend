import styled from "styled-components";
import TravelCard from "../features/SpaceList/layout/TravelCard";

const TravelSliderWrap = styled.div`
  width: ${(currentLength) => `calc(${currentLength} * 35rem)`};
  overflow: hidden;
  position: relative;
`;

const TravelSliderContainer = styled.div`
  display: flex;
  gap: 2.3rem;
  transition: transform 0.3s ease-in-out;
`;

const TravelSlider = ({ travelData, currentIndex }) => {
  return (
    <TravelSliderWrap currentLength={travelData?.length}>
      <TravelSliderContainer
        style={{
          transform: `translateX(-${currentIndex * (35 + 2.3)}rem)`,
        }}
      >
        {travelData?.map((travel) => (
          <TravelCard key={travel.roomId} {...travel} />
        ))}
      </TravelSliderContainer>
    </TravelSliderWrap>
  );
};

export default TravelSlider;
