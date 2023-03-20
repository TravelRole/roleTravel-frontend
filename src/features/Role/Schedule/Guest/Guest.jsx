import React, { useState } from "react";
import {
  GoogleMap,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";

const containerStyle = {
  width: "1000px",
  height: "700px",
  padding: "5px",
  boxSizing: "border-box",
};

const center = {
  lat: 37.7912297,
  lng: 128.9209403,
};
const options = {
  disableDefaultUI: true, // 구글맵 내부의 지도, 위성 버튼을 감춘다.
};
const libraries = ["places"];

function Guest({ onSearch }) {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBXXkjAR0duRfDCQN3Lil459ky2Ws1V248",
    libraries: libraries,
    language: "ko",
  });

  const [searchBox, setSearchBox] = useState(null);
  const [place, setPlace] = useState([]);
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    setPlace(places);
  };
  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  return (
    <>
      {isLoaded ? (
        <>
        <div style={{display:"flex" ,flexDirection:"row"}}>
            <div>
            {place.map((item) => (
              <div>
                {item.name}
                {JSON.stringify(item.geometry.location)}
              </div>
            ))}
            </div>
          
          <div>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              options={options}
            >
              <StandaloneSearchBox
                onPlacesChanged={onPlacesChanged}
                onLoad={onSBLoad}
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
                    left: "15%",
                    marginLeft: "-120px",
                  }}
                />
              </StandaloneSearchBox>
            </GoogleMap>
          </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default React.memo(Guest);
