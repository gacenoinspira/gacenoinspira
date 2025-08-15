'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { LatLngTuple } from 'leaflet';
import { MapaDestino } from '../../components/mapa-destino/MapaDestino';
import { dmsToDecimal } from '@/lib/utils/dmsDecimal';

// Función auxiliar para convertir coordenadas DMS a decimales, como en el ejemplo anterior


// Lista de destinos disponibles. He normalizado los nombres para que sean
// más fáciles de usar en una URL (por ejemplo, "parque-principal-san-luis-de-gaceno").
const destinosDisponibles = [
  {
    path: 'parque-principal-san-luis-de-gaceno',
    latitud: dmsToDecimal('N4 49 14.6'),
    longitud: dmsToDecimal('W73 10 04.5'),
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

// El nombre de esta función debe coincidir con el nombre de tu archivo de página
export default function DynamicPlanificaPage() {
  const params = useParams(); // Obtenemos los parámetros de la URL
  const locationName = params.locationName;

  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [destino, setDestino] = useState<any>(null);

  // Efecto para buscar la ubicación y el destino en base a la URL
  useEffect(() => {
    // 1. Obtener la ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
          setLocationError("No se pudo obtener tu ubicación. Mostrando una ubicación por defecto (Bogotá).");
          setUserLocation([4.7110, -74.0721]); // Ubicación por defecto
          setIsLoading(false);
        }
      );
    } else {
      setLocationError("Tu navegador no soporta geolocalización. Mostrando una ubicación por defecto (Bogotá).");
      setUserLocation([4.7110, -74.0721]); // Ubicación por defecto
      setIsLoading(false);
    }

    // 2. Buscar el destino en base al parámetro de la URL
    if (locationName) {
      const foundDestino = destinosDisponibles.find(
        (d) => d.path === locationName
      );
      if (foundDestino) {
        setDestino(foundDestino);
      } else {
        // Manejar el caso de un destino no encontrado
        setDestino(null);
        setLocationError(`Destino "${locationName}" no encontrado.`);
      }
    }
  }, [locationName]); // El efecto se ejecuta cuando cambia el locationName de la URL

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}>Cargando mapa...</div>;
  }

  // Si no se encuentra un destino o hay un error, se muestra un mensaje
  if (!destino) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1 className="text-3xl font-bold mb-4">Error</h1>
        <p>{locationError || "Ubicación no válida."}</p>
      </div>
    );
  }

  // Si todo es correcto, se renderiza el mapa con la ubicación del usuario
  // y el destino encontrado.
  return (
    <div style={{ padding: '20px' }}>
      <h1 className="text-3xl font-bold mb-4">
        Ruta a {destino.nombre}
      </h1>
      <p className="mb-4">
        Calculando la ruta desde tu ubicación actual hasta {destino.nombre}.
      </p>

      {locationError && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          <p>{locationError}</p>
        </div>
      )}

      {userLocation  && (
        <MapaDestino
          origen={userLocation}
          destino={{
            latitud: destino.latitud,
            longitud: destino.longitud,
            nombre: destino.nombre,
            descripcion: destino.descripcion
          }}
        />
      )}
    </div>
  );
}
