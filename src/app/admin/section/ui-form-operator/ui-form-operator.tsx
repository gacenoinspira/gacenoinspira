"use client";

import React, { useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  MapMouseEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { UiForm, UiInput } from "@/lib/components/index";
import { CategoryTableRow, ZoneTableRow } from "@/lib/type";
import { createOperator } from "../../lib";

// Replace with your Mapbox token
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

type Location = {
  lat: number;
  lng: number;
};

type Props = {
  zones: ZoneTableRow[];
  categories: CategoryTableRow[];
};

export function UiFormOperator({ zones, categories }: Props) {
  const [location, setLocation] = useState<Location | null>(null);
  const [zone, setZone] = useState<string>("");
  const [category, setCategory] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleMapClick = (e: MapMouseEvent) => {
    const { lng, lat } = e.lngLat;
    setLocation({ lat, lng });
    console.log("Coordenadas:", { lat, lng });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Formulario enviado:", { location, zone, category });
    console.log("Formulario enviado:", { name, description, phone });
    const resp = await createOperator({
      name: name as string,
      description: description as string,
      phone: Number(phone),
      zone_id: Number(zone),
      category_id: category,
      lat: location?.lat as number,
      lng: location?.lng as number,
    });
    console.log(resp);
    if (resp.status) {
      setZone("");
      setCategory(0);
      setLocation(null);
      setName("");
      setDescription("");
      setPhone("");
      e.currentTarget.reset();
    }
  };

  return (
    <div>
      <UiForm onSubmit={handleSubmit}>
        <UiInput
          placeholder="Nombre del operador"
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <UiInput
          placeholder="Description"
          name="description"
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <UiInput
          placeholder="Telefono"
          name="phone"
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          name="zone"
          id=""
          onChange={(e) => setZone(e.target.value)}
          value={zone}
        >
          <option value="">Selecciona una zona</option>
          {zones.map((zone) => (
            <option key={zone.id} value={zone.id}>
              {zone.name}
            </option>
          ))}
        </select>
        <select
          name="category"
          id=""
          onChange={(e) => setCategory(Number(e.target.value))}
          value={category}
        >
          <option value="">Selecciona una categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

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
        <button type="submit">Guardar</button>
      </UiForm>
    </div>
  );
}
