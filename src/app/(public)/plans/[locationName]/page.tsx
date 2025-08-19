'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LatLngTuple } from 'leaflet';
import { MapaDestino } from '../../components/mapa-destino/MapaDestino';
import styles from './location.module.css';

// Define the coordinates for "Parque Principal San Luis de Gaceno"
const PARQUE_PRINCIPAL_COORD = {
  latitud: 4.820722, // Aproximación decimal de N4 49 14.6
  longitud: -73.167917, // Aproximación decimal de W73 10 04.5
};

const destinosDisponibles = [
  {
    path: 'parque-principal-san-luis-de-gaceno',
    latitud: PARQUE_PRINCIPAL_COORD.latitud,
    longitud: PARQUE_PRINCIPAL_COORD.longitud,
    nombre: 'Parque Principal San Luis de Gaceno',
    descripcion: 'Parque Principal San Luis de Gaceno',
  },
  {
    path: 'centro-poblado-horizontes',
    latitud: 4.724203,
    longitud: -73.137818,
    nombre: 'Centro Poblado Horizontes',
    descripcion: 'Centro Poblado Horizontes',
  },
  {
    path: 'centro-poblado-guamal',
    latitud: 4.747816,
    longitud: -73.146834,
    nombre: 'Centro Poblado Guamal',
    descripcion: 'Centro Poblado Guamal',
  },
  {
    path: 'centro-poblado-san-carlos-del-guavio',
    latitud: 4.75170,
    longitud: -73.06555,
    nombre: 'Centro Poblado San Carlos del Guavio',
    descripcion: 'Centro Poblado San Carlos del Guavio',
  },
  {
    path: 'centro-poblado-la-mesa',
    latitud: 4.804901,
    longitud: -73.090213,
    nombre: 'Centro Poblado La Mesa',
    descripcion: 'Centro Poblado La Mesa',
  },
  {
    path: 'centro-poblado-santa-teresa',
    latitud: 4.924386,
    longitud: -73.085889,
    nombre: 'Centro Poblado Santa Teresa',
    descripcion: 'Centro Poblado Santa Teresa',
  },
];

const API_KEY = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || 'YOUR_MAPBOX_ACCESS_TOKEN'; // Reemplaza esto con tu clave de acceso de Mapbox real

// El nombre de esta función debe coincidir con el nombre de tu archivo de página
export default function DynamicPlanificaPage() {
  const params = useParams(); // Obtenemos los parámetros de la URL
  const locationName = params.locationName;

  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLngTuple[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [destino, setDestino] = useState<any>(null);

  /**
   * Fetches the route coordinates from Mapbox Directions API.
   * @param {LatLngTuple} start - The starting coordinates.
   * @param {LatLngTuple} end - The ending coordinates.
   * @returns {Promise<void>}
   */
  const getRoute = async (start: LatLngTuple, end: LatLngTuple) => {
    try {
      // Mapbox API expects coordinates as [longitude, latitude]
      const startCoord = `${start[1]},${start[0]}`;
      const endCoord = `${end[1]},${end[0]}`;
      const profile = 'driving';

      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${profile}/${startCoord};${endCoord}?geometries=geojson&access_token=${API_KEY}`
      );

      if (!response.ok) {
        // Handle API errors specifically
        const errorData = await response.json();
        throw new Error(`Error en la API de Mapbox: ${errorData.message || response.statusText}`);
      }

      const data = await response.json();

      if (!data.routes || data.routes.length === 0) {
        throw new Error("La API no devolvió ninguna ruta.");
      }
      
      const coordinates = data.routes[0].geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
      setRouteCoordinates(coordinates);
    } catch (error) {
      console.error("Error fetching route:", error);
      setLocationError("No se pudo calcular la ruta. Verifica tu clave de Mapbox y los permisos. Mostrando una línea recta.");
      setRouteCoordinates([start, end]); // Fallback to a straight line
    }
  };

  useEffect(() => {
    const foundDestino = destinosDisponibles.find((d) => d.path === locationName);
    if (!foundDestino) {
      setDestino(null);
      setLocationError(`Destino "${locationName}" no encontrado.`);
      setIsLoading(false);
      return;
    }

    setDestino(foundDestino);

    // Get the origin coordinates based on the destination
    const getOriginAndRoute = (originCoords: LatLngTuple) => {
      setUserLocation(originCoords);
      const destinationCoords: LatLngTuple = [foundDestino.latitud, foundDestino.longitud];
      getRoute(originCoords, destinationCoords).finally(() => {
        setIsLoading(false);
      });
    };

    if (locationName === 'parque-principal-san-luis-de-gaceno') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            getOriginAndRoute([position.coords.latitude, position.coords.longitude]);
          },
          (error) => {
            console.error("Error al obtener la ubicación:", error);
            setLocationError("No se pudo obtener tu ubicación. Mostrando una ruta desde Bogotá.");
            getOriginAndRoute([4.7110, -74.0721]); // Bogotá
          }
        );
      } else {
        setLocationError("Tu navegador no soporta geolocalización. Mostrando una ruta desde Bogotá.");
        getOriginAndRoute([4.7110, -74.0721]); // Bogotá
      }
    } else {
      // For all other destinations, set the origin to "Parque Principal San Luis de Gaceno"
      getOriginAndRoute([PARQUE_PRINCIPAL_COORD.latitud, PARQUE_PRINCIPAL_COORD.longitud]);
    }
  }, [locationName]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        Cargando mapa y calculando ruta...
      </div>
    );
  }

  // Si no se encuentra un destino o hay un error, se muestra un mensaje
  if (!destino) {
    return (
      <div className={styles.errorContainer}>
        <h1 className={styles.errorTitle}>Error</h1>
        <p>{locationError || "Ubicación no válida."}</p>
      </div>
    );
  }

  // Si todo es correcto, se renderiza el mapa con la ubicación del usuario
  // y el destino encontrado.
  return (
    <div className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>
          Ruta a {destino.nombre}
        </h1>
        <p className={styles.pageDescription}>
          Calculando la ruta desde tu ubicación actual hasta {destino.nombre}.
        </p>

        {locationError && (
          <div className={styles.alertBox} role="alert">
            <p>{locationError}</p>
          </div>
        )}

        {userLocation && routeCoordinates && (
          <MapaDestino
            origen={userLocation}
            destino={{
              latitud: destino.latitud,
              longitud: destino.longitud,
              nombre: destino.nombre,
              descripcion: destino.descripcion
            }}
            routeCoordinates={routeCoordinates}
          />
        )}
      </div>
    </div>
  );
}
