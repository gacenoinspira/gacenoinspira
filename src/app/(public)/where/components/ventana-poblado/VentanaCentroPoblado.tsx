'use client';

import React, { useState, useEffect } from 'react';
import styles from './VentanaCentroPoblado.module.css';
import { FaMapMarkerAlt, FaUsers, FaLandmark, FaHandshake } from 'react-icons/fa';

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
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

interface IconData {
  id: string;
  icon: React.ElementType;
  description: string;
  climateInfo: string;
  locationInfo: string;
}

const iconData: IconData[] = [
  // {
  //   id: 'clima',
  //   icon: FaSun,
  //   description: 'Clima cálido todo el año',
  //   climateInfo: 'San Luis de Gaceno goza de un clima tropical cálido.',
  //   locationInfo: 'Ubicado en una zona estratégica.'
  // },
  {
    id: 'ubicacion',
    icon: FaMapMarkerAlt,
    description: 'Ubicación estratégica',
    climateInfo: 'El clima favorece la exploración de la naturaleza.',
    locationInfo: 'Punto clave de acceso a múltiples rutas turísticas.'
  },
  {
    id: 'actividades',
    icon: FaUsers,
    description: 'Actividades para todos los gustos',
    climateInfo: 'El clima es perfecto para todas las actividades al aire libre.',
    locationInfo: 'Cerca de ríos, montañas y senderos.'
  },
  {
    id: 'cultura',
    icon: FaLandmark,
    description: 'Cultura viva entre montañas y sabanas',
    climateInfo: 'El clima contribuye a un ambiente cultural vibrante.',
    locationInfo: 'Rodeado de paisajes naturales, ideal para el agroturismo.'
  },
  {
    id: 'apoyoLocal',
    icon: FaHandshake,
    description: 'Apoya lo local y vive mejor',
    climateInfo: 'El clima benigno impulsa la producción local.',
    locationInfo: 'Conecta con comunidades auténticas en un entorno natural único.'
  },
];

export function VentanaCentroPoblado() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  const getConditionalText = (weather: WeatherData): string => {
    const temp = weather.main.temp;
    const weatherMain = weather.weather[0]?.main;
    const weatherDescription = weather.weather[0]?.description.toLowerCase();

    if (weatherMain === 'Rain' || weatherDescription.includes('lluvia')) {
      return `¡Está lloviendo! Un buen momento para disfrutar de un café caliente y la vista desde un lugar acogedor.`;
    }
    if (temp > 25 && weatherMain === 'Clear') {
      return '¡Prepárate para un día de sol radiante y calor! Ideal para actividades al aire libre y disfrutar de la naturaleza.';
    }
    if (temp >= 15 && temp <= 25 && (weatherMain === 'Clear' || weatherMain === 'Clouds')) {
      return 'Disfruta de un clima templado y agradable. Perfecto para pasear y explorar los alrededores.';
    }
    if (weatherMain === 'Clouds' || weatherDescription.includes('nublado')) {
      return 'Un día mayormente nublado, ideal para caminatas tranquilas sin el sol intenso.';
    }
    if (temp < 15) {
      return 'El clima es fresco. Prepárate para un clima fresco y lleva un abrigo.';
    }

    // Default message if no specific condition is met
    return `El clima es ${weatherDescription}. La temperatura es de ${temp}°C.`;
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!OPENWEATHER_API_KEY) {
          throw new Error("OpenWeatherMap API Key no está configurada.");
        }
        const lat = 4.8203; // Latitud corregida de San Luis de Gaceno
        const lon = -73.1683; // Longitud corregida de San Luis de Gaceno

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=es`
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
  }, [OPENWEATHER_API_KEY]);

  return (
    <section className={styles.ventanaPobladoSection}>
      <h2 className={styles.mainTitle}>5 cosas que debes saber antes de viajar a San Luis de Gaceno</h2>
      <div className={styles.underline}></div>

      <div className={styles.iconsContainer}>
        {iconData.map((item) => (
          <div key={item.id} className={styles.iconItem}>
            <item.icon className={styles.icon} />
            <p className={styles.iconDescription}>{item.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.weatherInfoSection}>
        {loadingWeather && <p>Cargando clima...</p>}
        {weatherError && <p className={styles.weatherError}>{weatherError}</p>}
        {weatherData && (
          <>
            <div className={styles.weatherDetails}>
                <p className={styles.temperature}>
                    Temperatura: {weatherData.main.temp}°C (Sensación: {weatherData.main.feels_like}°C)
                </p>
                <div className={styles.mainWeatherIconContainer}>
                    <img
                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                        alt={weatherData.weather[0].description}
                        className={styles.mainWeatherIcon}
                    />
                </div>
                <p className={styles.conditionText}>
                    {getConditionalText(weatherData)}
                </p>
            </div>
            <div className={styles.extraWeatherInfo}>
                <p className={styles.humidity}>
                    Humedad: {weatherData.main.humidity}%
                </p>
                <p className={styles.wind}>
                    Viento: {weatherData.wind.speed} m/s
                </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}