import { LoadScript } from "@react-google-maps/api";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState } from "react";

const SearchLocationInput = () => {
  const libraries = ["places"];
  const onPlaceChanged = (place) => {
    console.log(place);
    //   const selectedPlace =
    //   console.log("selectedPlace: ", selectedPlace);
    //   setPlace(selectedPlace);
    //   const lat = place?.geometry?.location?.lat();
    //   const lng = place?.geometry?.location?.lng();

    //   console.log(lat, lng);
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
      libraries={libraries}
    >
      <StandaloneSearchBox>
        <Autocomplete onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            id="tripLocation"
            placeholder="여행 장소를 입력해주세요."
          />
        </Autocomplete>
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default SearchLocationInput;
