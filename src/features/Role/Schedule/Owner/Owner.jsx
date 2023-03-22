import React, { useState, useEffect, useRef } from "react";
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

const OwnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 700px;
`;

const PlaceListBox = styled.div`
  width: 30%;
  /* border-bottom: 1px solid gray; */
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

const WantPlaceInfoBox = styled(PlaceListBox)`
  width: 20%;
`;

const GoogleMapBox = styled.div`
  width: 70%;
  height: 100%;
  /* border: 1px solid black; */
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
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
    setTimeout(() => {
      console.log(nearPlaceArr);
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

  const setCenter = (x,y) => {
    setlat(x)
    setlng(y)
  }

  //검색창 세팅 및 마커 찍는 함수 // 없어도 되는기능 현재
  // const [searchBox, setSearchBox] = useState(null);

  // const onPlaceMarking = () => {
  //   if (searchBox !== null) {
  //     const place = searchBox.getPlace();
  //     MarkerList.push(place);
  //     const x = place.geometry.location.lat();
  //     const y = place.geometry.location.lng();
  //     setlat(x);
  //     setlng(y);
  //   } else {
  //     console.log("Autocomplete is not loaded yet!");
  //   }
  // };

  const onPlaceMarking = (place) => {
    if (place) {
      MarkerList.push(place);
      const x = place.geometry.location.lat();
      const y = place.geometry.location.lng();
      setCenter(x,y)
    } else {
      console.log("im placeMarking error");
    }
  };

  //GeoCorder
  const [address, setAddress] = useState();
  const [GeoService, setGeoService] = useState();

  useEffect(() => {
    setTimeout(() => {
      const geocoder = new window.google.maps.Geocoder();
      setGeoService(geocoder);
    }, 1000);
  }, [mapRef]);

  const geocodeAddress = (address) => {
    GeoService.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        console.log(
          `입력한 주소 ${address}의 위도는 ${lat}이고, 경도는 ${lng}입니다.`
        );
      } else {
        console.log(
          `Geocode was not successful for the following reason: ${status}`
        );
      }
    });
  };

  // 사용 예시

  return (
    <>
      {isLoaded ? (
        <>
          <OwnerWrapper>
            <PlaceListBox>
              {nearPlaces.length === 0
                ? "가고싶은 곳을 검색해보세요 😊"
                : nearPlaces.map((place, i) => {
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
                    placeholder="장소 + 맛집&가볼만한 곳 을 검색하세요"
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `300px`,
                      height: `40px`,
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
                {/* <Autocomplete
                  onLoad={(autocomplete) => setSearchBox(autocomplete)}
                  onPlaceChanged={onPlaceMarking}
                >
                  <input
                    type="text"
                    placeholder="가고싶은 곳을 입력하면 마커가 생성됩니다."
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `300px`,
                      height: `40px`,
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
                </Autocomplete> */}

                {MarkerList.length !== 0 &&
                  MarkerList.map((item, i) => {
                    console.log(item);
                    return (
                      <Marker
                        icon={{
                          path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
                          fillColor: "yellow",
                          fillOpacity: 0.9,
                          scale: 2,
                          strokeColor: "gold",
                          strokeWeight: 2,
                        }}
                        position={{
                          lat: item.geometry.location.lat(),
                          lng: item.geometry.location.lng(),
                        }}
                      />
                    );
                  })}

                <Marker
                  icon={
                    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                  }
                  position={{ lat: 37.4953064, lng: 126.9551549 }}
                />
              </GoogleMap>
            </GoogleMapBox>

            <WantPlaceInfoBox>
              {MarkerList.map((place, i) => {
                console.log(place);
                return (
                  <>
                    <WantedPlace key={i} place={place} index={i} setCenter={setCenter} />
                  </>
                );
              })}
            </WantPlaceInfoBox>
          </OwnerWrapper>
          {/* <input
            value={address}
            type="text"
            onChange={(e) => setAddress(e.currentTarget.value)}
          ></input>
          <button onClick={() => geocodeAddress(address)}>
            위도 경도 알아보기
          </button> */}
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default React.memo(Owner);
