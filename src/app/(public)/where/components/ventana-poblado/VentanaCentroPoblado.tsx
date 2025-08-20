'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './VentanaCentroPoblado.module.css';
import { FaMapMarkerAlt, FaUsers, FaLandmark, FaHandshake } from 'react-icons/fa';
import { destinosDisponibles } from '@/data/destinosDisponibles';
import { useRouter } from 'next/navigation';
import { ActivityCategory } from '../conatiner-card/container-cards';

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

export interface Props {
  centroPoblado?: string;
  setTypePoblado?: Dispatch<SetStateAction<ActivityCategory | undefined>>
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


export function VentanaCentroPoblado({ centroPoblado, setTypePoblado }: Props) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const router = useRouter()
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (!OPENWEATHER_API_KEY) {
          throw new Error("OpenWeatherMap API Key no está configurada.");
        }
        const { lat, lon } = getLatitudeLongitude();

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
  }, [OPENWEATHER_API_KEY, centroPoblado]);

  const getLatitudeLongitude = () => {
    const destino = destinosDisponibles.find((d) => d.path === centroPoblado);
    if (destino) {
      return { lat: destino.latitud, lon: destino.longitud };
    } else {
      console.error(`Destino "${centroPoblado}" no encontrado.`);
      return { lat: 4.8203, lon: -73.1683 }; // Valores por defecto
    }
  }

  function capitalizeSlug(slug: string): string {
  const spacedString = slug.replace(/-/g, ' ');
  const words = spacedString.split(' ');
  const capitalizedWords = words.map((word: string) => {

    if (!word) {
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(' ');
}

const handleClickEvents = (id: string) => {
  switch(id){
    case 'ubicacion':
      router.push(`/plans/${ centroPoblado || 'parque-principal-san-luis-de-gaceno' }`);
      break;
    case 'actividades':
      //return ''
      if( !setTypePoblado ) break;
      setTypePoblado('Actividades para todos los gustos');
      router.push('#container-cards')
      break
    case 'cultura':
      //return ''
      if( !setTypePoblado ) break;
      setTypePoblado('Cultura viva entre montañas y sabanas');
      router.push('#container-cards')
      break;
    case 'apoyoLocal':
      router.push('/#section-map')
      break;
    default: 
        break;
  }
}

  return (
    <section className={styles.ventanaPobladoSection}>
      <h2 className={styles.mainTitle}>Cosas que debes saber antes de viajar a { capitalizeSlug( centroPoblado || '' ) || 'San Luis De Gaceno' }</h2>
      <div className={styles.underline}></div>

      <div className={styles.iconsContainer}>
        {iconData.map((item) => (
          <div key={item.id} className={styles.iconItem} onClick={ () => handleClickEvents(item.id) }>
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