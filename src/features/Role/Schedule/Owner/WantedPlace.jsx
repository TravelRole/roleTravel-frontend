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

function WantedPlace({ place, index, setCenter, showAddModal }) {
  const { name, formatted_address, formatted_phone_number, geometry } = place;
  const lat = geometry.location.lat();
  const lng = geometry.location.lng();
  console.log(index);
  return (
    <>
      <PlaceBox>
        <PlaceName>{`${index + 1}. ${name}`}</PlaceName>
        <Address>{formatted_address}</Address>
        <PhoneNumber>{formatted_phone_number}</PhoneNumber>
        <button>삭제하기</button>
        <button onClick={() => setCenter(lat, lng)}>위치보기</button>
        <button onClick={()=>showAddModal(place)}>추가하기</button>
      </PlaceBox>
    </>
  );
}

export default WantedPlace;
