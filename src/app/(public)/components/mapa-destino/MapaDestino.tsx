'use client';

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './MapaDestino.module.css'; // Asegúrate de crear este archivo CSS
import { FaWind, FaTint } from 'react-icons/fa';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax.com/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
    main: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

interface MapaDestinoProps {
  origen: LatLngTuple; // [latitud, longitud] del usuario
  destino: {
    latitud: number;
    longitud: number;
    nombre: string;
    descripcion: string;
  };
}

const getConditionalText = (weather: WeatherData): string => {
  const temp = weather.main.temp;
  const weatherMain = weather.weather[0]?.main;
  const weatherDescription = weather.weather[0]?.description.toLowerCase();

  if (weatherMain === 'Rain' || weatherDescription.includes('lluvia')) {
    return 'Día lluvioso, ideal para un café caliente.';
  }
  if (temp > 25 && weatherMain === 'Clear') {
    return 'Día soleado y caluroso, perfecto para la aventura.';
  }
  if (temp >= 15 && temp <= 25 && (weatherMain === 'Clear' || weatherMain === 'Clouds')) {
    return 'Clima templado, disfruta del recorrido.';
  }
  return `Clima actual: ${weatherDescription}.`;
};

export function MapaDestino({ origen, destino }: MapaDestinoProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!OPENWEATHER_API_KEY) {
          throw new Error("OpenWeatherMap API Key no está configurada.");
        }
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${destino.latitud}&lon=${destino.longitud}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`
        );
        if (!response.ok) {
          throw new Error(`Error al obtener el clima: ${response.statusText}`);
        }
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (error: any) {
        console.error("Error fetching weather data:", error);
        setWeatherError(error.message || "No se pudo obtener la información del clima.");
      } finally {
        setLoadingWeather(false);
      }
    };
    fetchWeatherData();
  }, [destino.latitud, destino.longitud, OPENWEATHER_API_KEY]);

  // Calcula el centro y el zoom para que ambos marcadores sean visibles
  const bounds = L.latLngBounds([origen, [destino.latitud, destino.longitud]]);
  const center = bounds.getCenter();
  // const zoom = bounds.isValid() ? bounds.pad(0.5).zoom : 13;

  return (
    <div className={styles.container}>
      <div className={styles.infoCard}>
        <h1 className={styles.title}>{destino.nombre}</h1>
        <p className={styles.description}>{destino.descripcion}</p>
        <div className={styles.weatherInfo}>
          {loadingWeather && <p>Cargando clima...</p>}
          {weatherError && <p className={styles.weatherError}>{weatherError}</p>}
          {weatherData && (
            <div className={styles.weatherContent}>
              <div className={styles.weatherMain}>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                  className={styles.weatherIcon}
                />
                <p className={styles.temperature}>{Math.round(weatherData.main.temp)}°C</p>
                <p className={styles.weatherDescription}>{getConditionalText(weatherData)}</p>
              </div>
              <div className={styles.weatherDetails}>
                <div className={styles.detailItem}>
                  <FaTint className={styles.detailIcon} />
                  <span>Humedad: {weatherData.main.humidity}%</span>
                </div>
                <div className={styles.detailItem}>
                  <FaWind className={styles.detailIcon} />
                  <span>Viento: {weatherData.wind.speed} m/s</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.mapContainer}>
        <MapContainer center={center} zoom={13} className={styles.map}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={origen}>
            <Popup>Tu ubicación actual.</Popup>
          </Marker>
          <Marker position={[destino.latitud, destino.longitud]}>
            <Popup>{destino.nombre}</Popup>
          </Marker>
          <Polyline pathOptions={{ color: '#003893' }} positions={[origen, [destino.latitud, destino.longitud]]} />
        </MapContainer>
      </div>
    </div>
  );
}