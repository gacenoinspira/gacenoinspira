"use client";

import { useState, useRef, useCallback } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

type Location = {
  id: number;
  name: string;
  coordinates: [number, number];
  description: string;
  sector: number;
};

const locations = [
  {
    id: 1,
    name: 'Centro de San Luis de Gaceno',
    coordinates: [-73.16851, 4.82052] as [number, number],
    description: 'El corazón del municipio, donde se encuentra la plaza principal y la iglesia.',
    sector: 1
  },
  {
    id: 2,
    name: 'Mirador Natural',
    coordinates: [-73.15851, 4.82552] as [number, number],
    description: 'Vistas panorámicas increíbles de la región y el valle del río Gacena.',
    sector: 1
  },
  {
    id: 3,
    name: 'Cascada La Chorrera',
    coordinates: [-73.17234, 4.83567] as [number, number],
    description: 'Hermosa cascada natural rodeada de vegetación nativa. Ideal para caminatas ecológicas.',
    sector: 2
  },
  {
    id: 4,
    name: 'Puente Colonial',
    coordinates: [-73.16289, 4.81876] as [number, number],
    description: 'Antiguo puente de piedra sobre el río Gacena, patrimonio histórico del municipio.',
    sector: 2
  },
  {
    id: 5,
    name: 'Parque Central',
    coordinates: [-73.17000, 4.81500] as [number, number],
    description: 'Área verde para el esparcimiento familiar en el centro de la ciudad.',
    sector: 3
  },
  {
    id: 6,
    name: 'Mirador del Sur',
    coordinates: [-73.16000, 4.81500] as [number, number],
    description: 'Vistas panorámicas hacia el sur del municipio.',
    sector: 4
  }
];

const sectorColors = {
  1: '#3b82f6', // azul
  2: '#10b981', // verde
  3: '#f59e0b', // amarillo
  4: '#8b5cf6'  // morado
};

export function UiMap() {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [mapStyle, setMapStyle] = useState<string>('mapbox://styles/mapbox/streets-v11');
  
  // Función para manejar el cambio de estilo del mapa
  const handleStyleChange = useCallback((style: string) => {
    setMapStyle(style);
    // Asegurarse de que el terreno se actualice después de cambiar el estilo
    setTimeout(() => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      }
    }, 100);
  }, []);

  const filteredLocations = selectedSector 
    ? locations.filter(loc => loc.sector === selectedSector)
    : locations;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {[1, 2, 3, 4].map((sector) => (
          <button
            key={sector}
            onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
            style={{
              padding: '8px 16px',
              backgroundColor: sectorColors[sector as keyof typeof sectorColors],
              color: selectedSector === sector ? 'white' : '#1f2937',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              boxShadow: selectedSector === sector 
                ? `0 0 0 2px ${sectorColors[sector as keyof typeof sectorColors]}, 0 2px 4px rgba(0,0,0,0.1)` 
                : '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            Sector {sector}
          </button>
        ))}
      </div>
      <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -73.16851,
          latitude: 4.82052,
          zoom: 12,
          pitch: 45,
          bearing: 0
        }}
        projection="globe"
        style={{ width: '100%', height: '100%' }}
        mapStyle={mapStyle}
        terrain={{ source: 'mapbox-dem', exaggeration: 1.5 }}
        onLoad={() => {
          if (mapRef.current) {
            const map = mapRef.current.getMap();
            // Añadir la fuente de elevación
            if (!map.getSource('mapbox-dem')) {
              map.addSource('mapbox-dem', {
                type: 'raster-dem',
                url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom: 14
              });
              map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
            }
          }
        }}
      >
        <NavigationControl 
          position="top-right" 
          showCompass={true}
          showZoom={true}
        />
        <FullscreenControl position="top-right" />
        
        {/* Controles de estilo de mapa */}
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          left: '10px', 
          zIndex: 1,
          display: 'flex',
          gap: '5px'
        }}>
          <button 
            onClick={() => handleStyleChange('mapbox://styles/mapbox/satellite-v9')}
            style={{
              padding: '5px 10px',
              backgroundColor: mapStyle.includes('satellite') ? '#3b82f6' : '#fff',
              color: mapStyle.includes('satellite') ? '#fff' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            Satélite
          </button>
          <button 
            onClick={() => handleStyleChange('mapbox://styles/mapbox/streets-v11')}
            style={{
              padding: '5px 10px',
              backgroundColor: mapStyle.includes('streets') ? '#3b82f6' : '#fff',
              color: mapStyle.includes('streets') ? '#fff' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
            }}
          >
            Mapa
          </button>
        </div>

        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            longitude={location.coordinates[0]}
            latitude={location.coordinates[1]}
            onClick={() => {
              setPopupInfo(location);
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: sectorColors[location.sector as keyof typeof sectorColors],
              borderRadius: '50%',
              border: '2px solid white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              {location.id}
            </div>
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.coordinates[0])}
            latitude={Number(popupInfo.coordinates[1])}
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
          >
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: 0, fontWeight: 'bold' }}>{popupInfo.name}</h3>
              <p style={{ margin: '5px 0 0 0' }}>{popupInfo.description}</p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  </div>
  );
}
