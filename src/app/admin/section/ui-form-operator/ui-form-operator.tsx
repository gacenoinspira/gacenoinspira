"use client";

import React, { useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  MapMouseEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { UiForm, UiInput } from "@/lib/components/index";

// Replace with your Mapbox token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Location = {
  lat: number;
  lng: number;
};

export function UiFormOperator() {
  const [location, setLocation] = useState<Location | null>(null);

  const handleMapClick = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setLocation({ lat, lng });
    console.log("Coordenadas:", { lat, lng });
  };

  return (
    <div>
      <UiForm>
        <UiInput
          placeholder="Nombre del operador"
          name="name"
          id="name"
          type="text"
        />
        <UiInput
          placeholder="Description"
          name="description"
          id="description"
          type="text"
        />
        <UiInput placeholder="Telefono" name="phone" id="phone" type="tel" />
      </UiForm>
      <h2>Elige tu ubicación</h2>
      <Map
        initialViewState={{
          longitude: -73.16851,
          latitude: 4.82052,
          zoom: 16,
        }}
        style={{ width: "100%", height: "600px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={handleMapClick}
      >
        <NavigationControl position="top-right" showCompass={false} />

        {location && (
          <Marker
            longitude={location.lng}
            latitude={location.lat}
            draggable
            onDragEnd={(e) => {
              const { lng, lat } = e.lngLat;
              setLocation({ lat, lng });
            }}
          >
            <div style={{ fontSize: "24px", cursor: "pointer" }}>📍</div>
          </Marker>
        )}
      </Map>
    </div>
  );
}
