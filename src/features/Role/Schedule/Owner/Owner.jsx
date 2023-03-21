import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import styled from "styled-components";
import GoogleApi from "./MapApi";

const OwnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 700px;
`;

const PlaceInfoBox = styled.div`
  width: 30%;
  border: 1px solid black;
  overflow: scroll;
`;
const GoogleMapBox = styled.div`
  width: 70%;
  height: 100%;
  border: 1px solid black;
`;

const containerStyle = {
  width: "100%",
  height: "100%",
  padding: "5px",
  boxSizing: "border-box",
};

const options = {
  mapTypeControl: false, // 구글맵 내부의 지도, 위성 버튼을 감춘다.
  ZoomControl: true,
};

const MarkerList = [];

function Owner() {
  // 구글 맵 라이브러리 로드하기
  const { isLoaded } = GoogleApi.useJsApiLoader();

  // 구글 맵 로드시 mapRef에 담기
  const mapRef = useRef();

  //google map placesService 가져오기
  const placesService = GoogleApi.PlaceSerivec(mapRef);

  // 주변검색창 및 검색 함수
  const [nearSearchBox, setnearSearchBox] = useState();
  const [nearPlaces, setNearPlace] = useState([]);

  const searchNearPlace = () => {
    const placesInfo = nearSearchBox.getPlaces();
    FindNearPlaceInfo(placesInfo);
  };

  const FindNearPlaceInfo = (placesArray) => {
    console.log(placesArray);

    const nearPlaceArr = [];
    placesArray.forEach((item, i) => {
      if (placesService) {
        placesService.getDetails(
          {
            placeId: item.place_id,
          },
          (result, status) => {
            if (status === "OK") {
              nearPlaceArr.push(result);
            } else return console.log(`im error ${i}`);
          }
        );
      } else return console.log("noting");
    });
    // nearPlaceArr 배열에 값이 모두 들어올때까지 기다리기 위해 setTimeout을 지정하게 됨
    setTimeout(() => {
      setNearPlace(nearPlaceArr);
    }, 1000);
  };

  //지도 초기 중앙 값 및 검색 후 해당 장소로 이동하는 useState
  const [lat, setlat] = useState(37.4953064);
  const [lng, setlng] = useState(126.9551549);

  const center = {
    lat: lat,
    lng: lng,
  };

  //검색창 세팅 및 마커 찍는 함수
  const [searchBox, setSearchBox] = useState(null);

  const onPlaceMarking = () => {
    if (searchBox !== null) {
      const place = searchBox.getPlace();
      MarkerList.push(place);
      const x = place.geometry.location.lat();
      const y = place.geometry.location.lng();
      setlat(x);
      setlng(y);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <>
      {isLoaded ? (
        <>
          <OwnerWrapper>
            <GoogleMapBox>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={17}
                options={options}
                onLoad={(map) => (mapRef.current = map)}
              >
                {/* 주변 검색기능 */}
                <StandaloneSearchBox
                  onPlacesChanged={searchNearPlace}
                  onLoad={(ref) => setnearSearchBox(ref)}
                >
                  <input
                    type="text"
                    placeholder="맛집장소를 검색해보세요"
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `240px`,
                      height: `32px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      left: "15px",
                    }}
                  />
                </StandaloneSearchBox>

                {/* 자동완성기능 */}
                <Autocomplete
                  onLoad={(autocomplete) => setSearchBox(autocomplete)}
                  onPlaceChanged={onPlaceMarking}
                >
                  <input
                    type="text"
                    placeholder="가고싶은 곳을 검색해주세요."
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `240px`,
                      height: `32px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      right: "15px",
                      marginLeft: "-120px",
                    }}
                  />
                </Autocomplete>

                {MarkerList.length !== 0 &&
                  MarkerList.map((item) => {
                    console.log(item);
                    return (
                      <Marker
                        icon={
                          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                        }
                        position={{
                          lat: item.geometry.location.lat(),
                          lng: item.geometry.location.lng(),
                        }}
                      />
                    );
                  })}

                <Marker
                  icon={{
                    path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                    fillColor: "yellow",
                    fillOpacity: 0.9,
                    scale: 2,
                    strokeColor: "gold",
                    strokeWeight: 2,
                  }}
                  position={{ lat: 37.4953064, lng: 126.9551549 }}
                />
              </GoogleMap>
            </GoogleMapBox>
            <PlaceInfoBox>
              {MarkerList.map((item, i) => {
                return <div key={i}>{`${i + 1}. ${item.name} `}</div>;
              })}
              {nearPlaces.map((item, i) => {
                return (
                  <>
                    <div>{item.name}</div>
                  </>
                );
              })}
            </PlaceInfoBox>
          </OwnerWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default React.memo(Owner);
