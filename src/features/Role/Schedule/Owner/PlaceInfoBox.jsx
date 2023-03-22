import styled from "styled-components";
import { useState } from "react";

const PlaceInfoContainer = styled.div`
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const PlaceName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Address = styled.div`
  font-size: 0.8rem;
  margin-bottom: 5px;
`;

const PhoneNumber = styled.div`
  margin-bottom: 5px;
`;

const ImagesSlide = styled.div``;

function PlaceInfoBox({ place, onPlaceMarking }) {
  console.log(place);
  const { name, formatted_address, formatted_phone_number, photos, website } =
    place;

  const [slideIndex, setSlideIndex] = useState(0);

  const showDivs = (n) => {
    if (slideIndex === 0 && n === -1) return setSlideIndex(photos.length - 1);
    if (slideIndex === photos.length - 1 && n === 1) return setSlideIndex(0);
    setSlideIndex(slideIndex + n);
  };

  return (
    <>
      {place ? (
        <PlaceInfoContainer>
          <PlaceName>
            <a href={website} target="_blank" rel="noreferrer">
              {name}
            </a>
          </PlaceName>
          <Address>{formatted_address}</Address>
          <PhoneNumber>{formatted_phone_number}</PhoneNumber>
          <ImagesSlide>
            <img
              src={photos ? photos[slideIndex].getUrl() : ""}
              style={{ width: "80%" }}
              alt="NoImages"
            ></img>
          </ImagesSlide>
          <button
            class="w3-button w3-display-left w3-black"
            onClick={() => showDivs(-1)}
          >
            &#10094;
          </button>
          <button
            class="w3-button w3-display-right w3-black"
            onClick={() => showDivs(1)}
          >
            &#10095;
          </button>
          <button onClick={() => onPlaceMarking(place)}>
            가고싶은 장소에 추가하기
          </button>
        </PlaceInfoContainer>
      ) : (
        "다시 로딩해주세요!"
      )}
    </>
  );
}

export default PlaceInfoBox;
