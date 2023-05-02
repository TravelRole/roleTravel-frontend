import styled from "styled-components";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import SearchAndWant from "./layout/SearchAndWant";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #f4f6fb;

  font-size: 1.6rem;
  overflow: ${(props) =>
    props.isAddModal ? "hidden hidden" : "hidden scroll"};

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
`;

const PageHeader = styled.header`
  padding: 8.5rem 0 2.5rem 6rem;
  font-size: 3rem;
  font-weight: 600;
`;

const MapWrapper = styled.div`
  display: flex;
  flex-direction: row;

  height: 52rem;
  padding: 0 4.6rem 0 6rem;
`;

const SearchAndWantBox = styled.div`
  //원래 32rem인데 임의적으로 변경함 
  width: 40rem;
  padding-left: 2rem;
`;

function Schedule({ setReserveList }) {
  // 구현해놓은 모킹 페이지
  // <Owner setReserveList={setReserveList} />

  //카카오 맵 초기등록하기
  const [map, setMap] = useState();

  //지도 초기 중앙 값 및 검색 후 해당 장소로 이동하는 useState
  const [lat, setlat] = useState(37.4953064);
  const [lng, setlng] = useState(126.9551549);
  return (
    <>
      <Wrapper>
        <PageHeader>일정</PageHeader>
        <MapWrapper>
          <Map
            center={{ lat: lat, lng: lng }}
            style={{ width: "100%", height: "100%" }}
            onCreate={setMap}
          ></Map>
          <SearchAndWantBox>
            {/* 검색 및 찜목록 layout */}
            <SearchAndWant /> 
          </SearchAndWantBox>
        </MapWrapper>
      </Wrapper>
    </>
  );
}

export default Schedule;
