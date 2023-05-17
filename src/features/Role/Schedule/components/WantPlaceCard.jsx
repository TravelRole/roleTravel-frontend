import React from 'react';
import styled from "styled-components";


const StyledPlaceCard = styled.li`
  position: relative;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 13rem;

  padding: 2rem;
  background: ${(props) => (props.selected ? "#EEF1F8" : "#ffffff")};
  border-radius: 0.8rem;

  header {
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1.7rem;
    color: #333333;
  }
  p:nth-child(2) {
    margin-bottom: 0.4rem;
    font-weight: 500;
    font-size: 1.4rem;
    color: #707070;
  }
  p:nth-child(3) {
    margin-bottom: 0.8rem;
    font-weight: 400;
    font-size: 1.4rem;
    color: #c4c4c4;
  }
  span {
    font-weight: 400;
    font-size: 1.4rem;
    color: #3884fd;
  }

  input {
    appearance: none;
    position: absolute;
    top: 2rem;
    right: 2rem;
    background-image: url("data:image/svg+xml, %3Csvg width='20' height='18' viewBox='0 0 20 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.05313 9.18027C0.0958258 6.54023 0.748262 2.58017 4.01044 1.26015C7.27263 -0.0598677 9.22993 2.58017 9.88237 3.90019C10.5348 2.58017 13.1446 -0.0598677 16.4067 1.26015C19.6689 2.58017 19.6689 6.54023 17.7116 9.18027C15.7543 11.8203 9.88237 17.1004 9.88237 17.1004C9.88237 17.1004 4.01044 11.8203 2.05313 9.18027Z' stroke='%23A7A7A7' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");

    width: 2rem;
    height: 1.8rem;
    cursor: pointer;

    &:checked {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='18' viewBox='0 0 20 18' fill='none'%3E%3Cpath d='M2.05313 9.18027C0.0958258 6.54023 0.748262 2.58017 4.01044 1.26015C7.27263 -0.0598677 9.22993 2.58017 9.88237 3.90019C10.5348 2.58017 13.1446 -0.0598677 16.4067 1.26015C19.6689 2.58017 19.6689 6.54023 17.7116 9.18027C15.7543 11.8203 9.88237 17.1004 9.88237 17.1004C9.88237 17.1004 4.01044 11.8203 2.05313 9.18027Z' fill='%23FF6D6D' stroke='%23FF6D6D' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }

  button {
    height: 2.6rem;
    position: absolute;
    right: 2rem;
    bottom: 2rem;
    padding: 0.2rem 1rem;
    font-size: 1.2rem;
    color: ${(props) => (props.selected ? " #3884FD;" : "#8B8B8B")};
    border: none;
    background: #fafafa;
    border: ${(props) =>
      props.selected ? "1px solid #3884FD" : "1px solid #DADADA"};
    border-radius: 0.8rem;
  }
`;
const WantPlaceCard = (props) => {
    const { place, isExist, handleWantPlace, locationFn, Info } = props;
  const { setlat, setlng } = locationFn;
  const { info, setInfo } = Info;
    return (
        <StyledPlaceCard
        key={`${place.latitude} + ${place.placeName}`}
        selected={
          String(info?.id) === String(place.mapPlaceId)
        }
        onClick={() => {
          const newPlace = {
            ...place,
            id: String(place.mapPlaceId),
          };
          setInfo(newPlace);
          setlat(place.latitude);
          setlng(place.longitude);
        }}
      >
        <header>{place.placeName}</header>
        <p>{place.placeAddress}</p>
        <p>{place.lotNumberAddress}</p>
        <span>
          {place.phoneNumber
            ? place.phoneNumber
            : "전화번호 없음"}
        </span>
        <input
          type="checkbox"
          onChange={(e) =>
            handleWantPlace(e, place, isExist)
          }
          checked={true}
        />
        <button>일정에 추가</button>
      </StyledPlaceCard>
    );
};

export default WantPlaceCard;