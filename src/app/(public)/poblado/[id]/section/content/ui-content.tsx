"use client";

import React, { useEffect, useState } from "react";
import styles from "./content.module.css";
import Image from "next/image";
import { MapaDestino } from "@/Public/components/mapa-destino/MapaDestino";
import { LatLngTuple } from "leaflet";

interface UiContentProps {
  title: string;
  description: string;
  location?: string;
  phone?: string;
  website?: string;
  images?: string[];
  onViewMore?: () => void;
  logo?: string;
  activity?: string[];
  rules?: string[];
  img?: string[];
  indications?: string;
  latitudorigin: number | null;
  longitudorigin: number | null;
  latituddestino: number | null;
  longituddestino: number | null;
}

const PARQUE_PRINCIPAL_COORD = {
  latitud: 4.820722,
  longitud: -73.167917,
};

const destino = {
  path: 'centro-poblado-horizontes',
  latitud: 4.724203,
  longitud: -73.137818,
  nombre: 'Centro Poblado Horizontes',
  descripcion: 'Centro Poblado Horizontes',
};

const API_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN';

export function UiContent({
  title = "Iglesia Centro Poblado Guamal",
  description = "La iglesia de San Luis de Guamal es un ícono arquitectónico y religioso ubicado en el corazón del municipio. Construida en el siglo XVIII, esta joya colonial destaca por su imponente fachada blanca y su campanario que se alza sobre el paisaje urbano. El interior sorprende con sus techos altos, arcos de medio punto y un retablo mayor dorado que alberga la imagen del santo patrón. Los lugareños la consideran no solo un lugar de culto, sino un símbolo de identidad y tradición que ha sido testigo de generaciones de fieles y visitantes.",
  logo = "/img/san_luis.jpeg",
  activity = [],
  rules = [],
  indications = "",
  images = [],
  latitudorigin = PARQUE_PRINCIPAL_COORD.latitud,
  longitudorigin = PARQUE_PRINCIPAL_COORD.longitud,
  longituddestino = destino.longitud,
  latituddestino = destino.latitud,
}: UiContentProps) {
  const [routeCoordinates, setRouteCoordinates] = useState<LatLngTuple[] | null>(null);
  const [, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const destinationCoords: LatLngTuple = [latituddestino || destino.latitud, longituddestino || destino.longitud];
    const originCoords: LatLngTuple = [latitudorigin || PARQUE_PRINCIPAL_COORD.latitud, longitudorigin || PARQUE_PRINCIPAL_COORD.longitud];
    
    getRoute(originCoords, destinationCoords);
  }, [latitudorigin, longitudorigin, latituddestino, longituddestino]);

  const getRoute = async (start: LatLngTuple, end: LatLngTuple) => {
    try {
      const startCoord = `${start[1]},${start[0]}`;
      const endCoord = `${end[1]},${end[0]}`;
      const profile = 'driving';
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startCoord};${endCoord}?geometries=geojson&access_token=${API_KEY}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la API de Mapbox: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error("La API no devolvió ninguna ruta.");
      }

      // La API devuelve [longitud, latitud]. El `map` los invierte a [latitud, longitud] para Leaflet.
      const coordinates = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
      setRouteCoordinates(coordinates);
    } catch (error) {
      console.error("Error fetching route:", error);
      setLocationError("No se pudo calcular la ruta. Mostrando una línea recta.");
      setRouteCoordinates([start, end]); // Fallback to a straight line
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={ styles.contentText }>
          {description.split(".").map((item, index) => (
            <p key={index} className={styles.description}>
              {item}
            </p>
          ))}
          {!!activity.length && (
            <>
              <h2 className={`${styles.title} ${styles.mt}`}>Actividades</h2>
              <ul className={styles.ul}>
                {activity.map((item, index) => (
                  <li key={index} className={styles.li}>
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        <div className={styles.imageContainer}>
          <Image
            src={images[0] || logo}
            alt={title}
            width={500}
            height={300}
            className={styles.ImagenMedium}
          />
        </div>
        <div className={styles.gallery}>
        </div>
        <div className={styles.contentText}>
          {indications && (
          <>
            <h2 className={`${styles.title} ${styles.mt}`}>
              ¿Cómo puedo llegar?
            </h2>
            <p className={styles.paragraph}>{indications}</p>
            <MapaDestino
              origen={[latitudorigin || PARQUE_PRINCIPAL_COORD.latitud, longitudorigin || PARQUE_PRINCIPAL_COORD.longitud]}
              destino={{
                latitud: latituddestino || destino.latitud,
                longitud: longituddestino || destino.longitud,
                nombre: title,
                descripcion: title
              }}
              routeCoordinates={routeCoordinates}
            />
          </>
        )}
        {!!rules.length && (
          <>
            <h2 className={`${styles.title} ${styles.mt}`}>Recomendaciones</h2>
            <ul className={styles.ul}>
              {rules.map((item, index) => (
                <li key={index} className={styles.li}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
        {images.length > 1 && (
          
          <div className={styles.imageContainer}>
            <Image
              src={images[1] || logo}
              alt={title}
              width={500}
              height={300}
              className={styles.ImagenMedium}
            />
          </div>
        )}
        </div>
        
      </div>
    </div>
  );
}