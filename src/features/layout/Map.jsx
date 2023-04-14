import axios from "axios";
import React, { useState } from "react";

const SearchLocationInput = () => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${"af6115e739ae8be2ed4fa60be40583a2"}&libraries=services`;
  document.head.appendChild(script);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?page=1&size=10&sort=accuracy&query=${value}`,
        {
          headers: {
            Authorization: `KakaoAK ${"af6115e739ae8be2ed4fa60be40583a2"}`,
          },
        }
      );
      const results = response.data.documents.map((place) => ({
        id: place.id,
        name: place.place_name,
      }));
      console.log(results);
      setSuggestions(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectSuggestion = async (suggestion) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${suggestion.name}&category_group_code=PO3`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
          },
        }
      );
      const results = response.data.documents.map((place) => ({
        id: place.id,
        name: place.place_name,
        address: place.address_name,
        lat: place.y,
        lng: place.x,
      }));
      setPlaces(results);
      setSuggestions([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={query} onChange={handleInputChange} />
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {places.length > 0 && (
        <ul>
          {places.map((place) => (
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
