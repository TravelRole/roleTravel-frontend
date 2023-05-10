import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import styled from "styled-components";

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

// const center = {
//   lat: 37.4953064,
//   lng: 126.9551549,
// };
const options = {
  disableDefaultUI: true, // 구글맵 내부의 지도, 위성 버튼을 감춘다.
};

const libraries = ["places"];

const MarkersLocation = [];
const MarkerList = [];

function Owner() {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBXXkjAR0duRfDCQN3Lil459ky2Ws1V248",
    libraries: libraries,
    language: "ko",
  });

  const [searchBox, setSearchBox] = useState(null);
  const [place, setPlace] = useState([]);
  const [placesService, setPlacesService] = useState(null);
  // const mapRef = useRef(null);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     const service = new window.google.maps.places.PlacesService(
  //       mapRef.current
  //     );
  //     setPlacesService(service);
  //     console.log("im useEffect");
  //   }
  // }, [mapRef]);

  // const onload = (ref) => {
  //   setSearchBox(ref);
  // };

  // const onPlacesChanged = () => {
  //   const placeInfo = searchBox.getPlaces();
  //   handlePlaceClick(placeInfo);
  // };

  // const handlePlaceClick = (placeArray) => {
  //   console.log(placeArray);
  //   const newarr = [];
  //   placeArray.forEach((item, i) => {
  //     if (placesService) {
  //       placesService.getDetails(
  //         {
  //           placeId: item.place_id,
  //         },
  //         (result, status) => {
  //           if (status === "OK") {
  //             newarr.push(result);
  //             console.log(i);
  //           } else return console.log(`im error ${i}`);
  //         }
  //       );
  //     } else return console.log("noting")
  //   });
  //   console.log(newarr);
  // };

  // const testhandle = () => {
  //   if (placesService) {
  //     placesService.getDetails(
  //       {
  //         placeId: "ChIJwcUdPn6ffDURby68IYepwG0",
  //       },
  //       (result, status) => {
  //         if (status === "OK") {
  //           console.log(result); // 장소(place)의 세부 정보(details)를 출력합니다.
  //         }
  //       }
  //     );
  //   } else {
  //     console.log("im erreor");
  //   }
  // };

  // const onPlacesChanged = () => {
  //   const placeInfo = searchBox.getPlaces();
  //   handlePlaceClick(placeInfo);
  // };

  const [SearchResult, setSearchResult] = useState(null);

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  const [lat, setlat] = useState(37.4953064);
  const [lng, setlng] = useState(126.9551549);

  const center = {
    lat: lat,
    lng: lng,
  };

  const onPlaceChanged = () => {
    if (SearchResult !== null) {
      const place = SearchResult.getPlace();
      const placeName = place.name;
      MarkerList.push(placeName);
      console.log(MarkerList);
      const x = place.geometry.location.lat();
      const y = place.geometry.location.lng();
      setlat(x);
      setlng(y);
      MarkersLocation.push({ lat: x, lng: y });
      console.log(MarkersLocation);
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
                // onLoad={(map) => (mapRef.current = map)}
              >
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    placeholder="Customized your placeholder"
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
                      left: "50%",
                      marginLeft: "-120px",
                    }}
                  />
                </Autocomplete>

                {MarkersLocation.length !== 0 &&
                  MarkersLocation.map((position) => {
                    return (
                      <Marker
                        icon={
                          "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                        }
                        position={position}
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

                {/* 검색기능 */}
                {/* <StandaloneSearchBox
                  onPlacesChanged={onPlacesChanged}
                  onLoad={onload}
                >
                  <input
                    type="text"
                    placeholder="장소를 검색해보세요"
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
                </StandaloneSearchBox> */}
              </GoogleMap>
            </GoogleMapBox>
            <PlaceInfoBox>
              {MarkerList.map((item, i) => {
                return <div key={i}>{`${i + 1}. ${item}`}</div>;
              })}
              {/* {place.map((item, i) => {
                return (
                  <>
                    <div>{item.name}</div>
                  </>
                );
              })} */}
            </PlaceInfoBox>
            {/* <div>
              <button onClick={testhandle}>장소(place) 정보 가져오기</button>
            </div> */}
          </OwnerWrapper>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default React.memo(Owner);
