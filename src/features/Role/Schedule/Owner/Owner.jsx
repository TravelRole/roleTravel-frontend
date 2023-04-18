import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import styled from "styled-components";
import GoogleApi from "./MapApi";
import PlaceInfoBox from "./PlaceInfoBox";
import WantedPlace from "./WantedPlace";
import AddSpaceModal from "./Modal";
import ScheduleContainer from "./ScheduleContainer";
import { Map, MapMarker } from "react-kakao-maps-sdk";


const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: 5px solid aqua;
  position: absolute;
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
const OwnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 700px;
  border: 5px solid purple;
  margin-bottom: 0;
`;

const PlaceListBox = styled.div`
  width: 22%;
  height: 700px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  overflow: scroll;

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

const WantPlaceInfoBox = styled(PlaceListBox)``;

const GoogleMapBox = styled.div`
  position: relative;
  width: 56%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const SearchBox = styled.input`
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 1;
`;

const NearSpaceData = [
  {
    name: "아쯔다무라",
    formatted_address: "해운대 473-6",
    formatted_phone_number: "010-8558-0728",
    photos: ["없음"],
    website: "www.naver.com",
    geometry: { lat: 35.19444383571, lng: 129.11940758542 },
  },
  {
    name: "제주거리",
    formatted_address: "제주 473-6",
    formatted_phone_number: "010-8558-0728",
    photos: ["없음"],
    website: "www.naver.com",
    geometry: { lat: 33.4996213, lng: 126.5311884 },
  },
  {
    name: "속초해수욕장",
    formatted_address: "강원도 473-6",
    formatted_phone_number: "010-8558-0728",
    photos: ["없음"],
    website: "www.naver.com",
    geometry: { lat: 38.2070148, lng: 128.5918488 },
  },
  {
    name: "여수",
    formatted_address: "여수 473-6",
    formatted_phone_number: "010-8558-0728",
    photos: ["없음"],
    website: "www.naver.com",
    geometry: { lat: 34.7603737, lng: 127.6622221 },
  },
];

let MarkerList = [];
const schedule = { 1: [], 2: [], 3: [] };

function Owner({ setReserveList }) {
  //지도 초기 중앙 값 및 검색 후 해당 장소로 이동하는 useState
  const [lat, setlat] = useState(37.4953064);
  const [lng, setlng] = useState(126.9551549);

  const setCenter = (x, y) => {
    setlat(x);
    setlng(y);
  };

  const onPlaceMarking = (place) => {
    console.log(place);
    if (place) {
      MarkerList.push(place);
      const x = place.x;
      const y = place.y;
      setCenter(y, x);
    } else {
      console.log("im placeMarking error");
    }
  };

  // 모달관련 코드
  const [isAddModal, setIsAddModal] = useState(false);
  const [modalPlace, setModalPlace] = useState(null);
  const showAddModal = useCallback((place) => {
    setModalPlace(place);
    setIsAddModal((prev) => !prev);
  }, []);

  // 스케쥴컨테이너 관련코드
  const [schedulelist, setScheduleList] = useState(schedule);

  const AddScheduleList = (placeobj) => {
    const day = placeobj.Day;
    schedule[day].push(placeobj);
    setScheduleList(schedule);
    setReserveList(schedule);
  };

  //DeletPlace 관련 및 마커 찍는 코드

  const [MarkerList, setMarkerList] = useState([]);

  const DeletePlace = (place) => {
    const NewMarker = MarkerList.filter((item) => item.name !== place.name);
    setMarkerList(NewMarker);
  };

  // 카카오맵 관련
  const { kakao } = window;
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      addSearchResult(inputRef.current.value);
    }
  };

  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  let markersPoint = [];

  const addSearchResult = (keyWord) => {
    if (!map) return;

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markersPoint.push(data[i]);
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markersPoint);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };

  return (
    <>
      {true ? (
        <>
          <Wrapper isAddModal={isAddModal}>
            <h1
              style={{ fontSize: "25px", margin: "1rem", fontWeight: "bold" }}
            >
              일정
            </h1>
            <OwnerWrapper>
              <PlaceListBox>
                {markers.length === 0
                  ? "가고싶은 곳을 검색해보세요 😊"
                  : markers.map((place, i) => {
                      return (
                        <>
                          <PlaceInfoBox
                            key={i}
                            place={place}
                            onPlaceMarking={onPlaceMarking}
                          />
                        </>
                      );
                    })}
              </PlaceListBox>
              <GoogleMapBox>
                <Map
                  center={{ lat: lat, lng: lng }}
                  style={{ width: "100%", height: "100%" }}
                  onCreate={setMap}
                >
                  {markers.map((marker) => {
                    console.log(marker)
                    const position = {
                      lat: Number(marker.y),
                      lng: Number(marker.x),
                    };
                    return (
                      <MapMarker
                        key={`marker-${position}-${position.lat},${position.lng}`}
                        position={position}
                        onClick={() => setInfo(marker)}
                      >
                        {info && info.place_name === marker.place_name && (
                          <div style={{ color: "#000" }}>
                            {marker.place_name}
                          </div>
                        )}
                      </MapMarker>
                    );
                  })}
                </Map>
                <SearchBox ref={inputRef} onKeyDown={handleKeyDown}></SearchBox>
              </GoogleMapBox>

              <WantPlaceInfoBox>
                {MarkerList.map((place, i) => {
                  return (
                    <>
                      <WantedPlace
                        key={i}
                        place={place}
                        index={i}
                        setCenter={setCenter}
                        showAddModal={showAddModal}
                        DeletePlace={DeletePlace}
                      />
                    </>
                  );
                })}
              </WantPlaceInfoBox>
            </OwnerWrapper>

            <ScheduleContainer schedulelist={schedulelist} />

            {isAddModal ? (
              <AddSpaceModal
                modalPlace={modalPlace}
                isAddModal={isAddModal}
                setIsAddModal={setIsAddModal}
                AddScheduleList={AddScheduleList}
              />
            ) : null}
          </Wrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default React.memo(Owner);
