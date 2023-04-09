import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";

const SearchLocationInput = () => {
  const [placeList, setPlaceList] = useState([]);

  const onChangeInput = useCallback(async (e) => {
    const { value } = e.target;
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${value}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
          },
        }
      );
      // const results = response.data.documents.map((place) => ({
      //   id: place.id,
      //   name: place.place_name,
      // }));
      const results = response.data.documents;
      console.log(results);
      // setSuggestions(results);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // const handleInputChange = async (e) => {
  //   const value = e.target.value;
  //   setQuery(value);
  //   if (value.trim() === "") {
  //     // setSuggestions([]);
  //     return;
  //   }

  //   const handleSelectSuggestion = async (suggestion) => {
  //     try {
  //       const response = await axios.get(
  //         `https://dapi.kakao.com/v2/local/search/keyword.json?query=${suggestion.name}&category_group_code=PO3`,
  //         {
  //           headers: {
  //             Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
  //           },
  //         }
  //       );
  //       const results = response.data.documents.map((place) => ({
  //         id: place.id,
  //         name: place.place_name,
  //         address: place.address_name,
  //         lat: place.y,
  //         lng: place.x,
  //       }));
  //       setPlaces(results);
  //       setSuggestions([]);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // onChange={handleInputChange}
  // onClick={() => handleSelectSuggestion(suggestion)}
  return (
    <div>
      <div>
        <input type="text" onChange={onChangeInput} />
        {/* {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion.id}>{suggestion.name}</li>
            ))}
          </ul>
        )} */}
      </div>
      {placeList.length > 0 && (
        <ul>
          {placeList.map((place) => (
            <li key={place.id}>
              <div>{place.name}</div>
              <div>{place.address}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchLocationInput;
