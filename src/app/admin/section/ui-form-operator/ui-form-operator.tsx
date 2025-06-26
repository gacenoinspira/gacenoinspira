"use client";

import React, { useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  MapMouseEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { UiForm } from "@/lib/components/index";
import { CategoryTableRow, ZoneTableRow } from "@/lib/type";
import { createOperator } from "../../lib";
import styles from "./ui-form-operator.module.css";
import { FaMapMarkerAlt, FaSave } from "react-icons/fa";

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
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Nuevo Operador Turístico</h1>
      <UiForm onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nombre del operador</label>
            <input
              className={styles.inputField}
              placeholder="Ej: Aventuras Guavio"
              name="name"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="phone">Teléfono</label>
            <input
              className={styles.inputField}
              placeholder="Ej: 3001234567"
              name="phone"
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="zone">Zona</label>
            <select
              className={styles.selectField}
              name="zone"
              id="zone"
              onChange={(e) => setZone(e.target.value)}
              value={zone}
              required
            >
              <option value="">Selecciona una zona</option>
              {zones.map((zone) => (
                <option key={zone.id} value={zone.id}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className={styles.inputGroup}>
            <label htmlFor="category">Categoría</label>
            <select
              className={styles.selectField}
              name="category"
              id="category"
              onChange={(e) => setCategory(Number(e.target.value))}
              value={category}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label htmlFor="description">Descripción</label>
            <textarea
              className={styles.inputField}
              placeholder="Describe los servicios que ofrece el operador"
              name="description"
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={styles.mapSection}>
          <h2 className={styles.mapTitle}>
            <FaMapMarkerAlt /> Ubicación en el mapa
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.95rem' }}>
            Haz clic en el mapa para marcar la ubicación o arrastra el marcador para ajustarla
          </p>
          <div className={styles.mapContainer}>
            <Map
              initialViewState={{
                longitude: -73.16851,
                latitude: 4.82052,
                zoom: 13,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={handleMapClick}
              reuseMaps
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
                  <div className={styles.customMarker}>
                    <FaMapMarkerAlt color="#EF4444" size={32} />
                  </div>
                </Marker>
              )}
            </Map>
          </div>
          {location && (
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#4b5563' }}>
              Ubicación seleccionada: Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
            </p>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          <FaSave style={{ marginRight: '8px' }} />
          Guardar Operador
        </button>
      </UiForm>
    </div>
  );
}
