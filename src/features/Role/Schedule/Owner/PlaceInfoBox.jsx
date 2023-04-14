import styled from "styled-components";

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

function PlaceInfoBox({ place, onPlaceMarking }) {
  const { place_name, address_name, phone, place_url } = place;

  return (
    <>
      {place ? (
        <PlaceInfoContainer>
          <PlaceName>
            <a href={place_url} target="_blank" rel="noreferrer">
              {place_name}
            </a>
          </PlaceName>
          <Address>{address_name}</Address>
          <PhoneNumber>{phone}</PhoneNumber>

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
