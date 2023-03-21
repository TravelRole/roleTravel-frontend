import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  Autocomplete,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";

const libraries = ["places"];

const GoogleApi = {

  useJsApiLoader: () =>
    useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyBXXkjAR0duRfDCQN3Lil459ky2Ws1V248",
      libraries: libraries,
      language: "ko",
    }),

    

  PlaceSerivec: (mapRef) => {
    const [placesService, setPlacesService] = useState(null);
    useEffect(() => {
      setTimeout(() => {
        if (mapRef.current) {
          const map = new window.google.maps.places.PlacesService(
            mapRef.current
          );
          setPlacesService(map);
        }
      }, 1000);
    }, [mapRef]);

    return placesService;
  },

};

export default GoogleApi;
