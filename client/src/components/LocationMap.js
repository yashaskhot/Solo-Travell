import { Loader } from "@googlemaps/js-api-loader";
import React, { useEffect } from "react";

const LocationMap = ({ apiKey, latitude, longitude }) => {
  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly", // You can specify the version if needed
      // ...additionalOptions, // You can include additional options here
    });

    loader.load().then(async () => {
      const { Map } = await window.google.maps.importLibrary("maps");

      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 15, // Adjust the zoom level as needed
      };

      const map = new Map(document.getElementById("map"), mapOptions);

      // Add a marker for the location
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "Location",
      });
    });
  }, [apiKey, latitude, longitude]);

  return <div id="map" style={{ width: "800px", height: "200px",padding:"20px",marginBottom:"20px",justifyContent:"center",alignItems:"center" }}></div>;
};

export default LocationMap;
