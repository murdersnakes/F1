"use client";
import "leaflet/dist/leaflet.css?global";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

interface MapComponentProps {
  location: {
    lat: string;
    long: string;
  };
}

const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 15); // zoom level is set to 13
  }, [center]);
  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ location }) => {
  const position = [parseFloat(location.lat), parseFloat(location.long)];

  return (
    <MapContainer className="w-full h-96 mb-5">
      <ChangeView center={position} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} />
    </MapContainer>
  );
};

export default MapComponent;
