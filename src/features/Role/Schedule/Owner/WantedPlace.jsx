import styled from "styled-components";

const PlaceBox = styled.div`
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

function WantedPlace({ place, index, setCenter, showAddModal ,DeletePlace }) {
  const { place_name, address_name, phone, place_url, x,y } = place;
  
  const lat = x
  const lng = y
  return (
    <>
      <PlaceBox>
        <PlaceName>{`${index + 1}. ${place_name}`}</PlaceName>
        <Address>{address_name}</Address>
        <a href={place_url} target="_blank" rel="noreferrer">
            {place_url}
          </a>
        <PhoneNumber>{phone}</PhoneNumber>
        <button onClick={()=>DeletePlace(place)}>삭제하기</button>
        <button onClick={() => setCenter(lng, lat)}>위치보기</button>
        <button onClick={()=>showAddModal(place)}>일정에 추가하기</button>
      </PlaceBox>
    </>
  );
}

export default WantedPlace;
