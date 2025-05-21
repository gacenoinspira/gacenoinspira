"use client";

import { useState } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

type Location = {
  id: number;
  name: string;
  coordinates: [number, number];
  description: string;
};

const locations = [
  {
    id: 1,
    name: 'Centro de San Luis de Gaceno',
    coordinates: [-73.16851, 4.82052] as [number, number],
    description: 'El corazón del municipio, donde se encuentra la plaza principal y la iglesia.'
  },
  {
    id: 2,
    name: 'Mirador Natural',
    coordinates: [-73.15851, 4.82552] as [number, number],
    description: 'Vistas panorámicas increíbles de la región y el valle del río Gacena.'
  },
  {
    id: 3,
    name: 'Cascada La Chorrera',
    coordinates: [-73.17234, 4.83567] as [number, number],
    description: 'Hermosa cascada natural rodeada de vegetación nativa. Ideal para caminatas ecológicas.'
  },
  {
    id: 4,
    name: 'Puente Colonial',
    coordinates: [-73.16289, 4.81876] as [number, number],
    description: 'Antiguo puente de piedra sobre el río Gacena, patrimonio histórico del municipio.'
  }
];

export function UiMap() {
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);

  return (
    <div style={{ width: '100%', height: '500px', position: 'relative' }}>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: -73.16851,
          latitude: 4.82052,
          zoom: 12,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />

        {locations.map((location) => (
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
              backgroundColor: '#3b82f6',
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
  );
}
