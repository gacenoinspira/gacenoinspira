/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useCallback } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  MapRef,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import styles from "./map.module.css";
import Image from "next/image";

type Location = {
  id: number;
  name: string;
  coordinates: [number, number];
  description: string;
  sector: number;
  category: string;
  img: string;
};

const locations: Location[] = [
  {
    id: 1,
    name: "Centro de San Luis de Gaceno",
    coordinates: [-73.16851, 4.82052] as [number, number],
    description:
      "El corazón del municipio, donde se encuentra la plaza principal y la iglesia.",
    sector: 1,
    category: "Lugares Históricos",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    name: "Mirador Natural",
    coordinates: [-73.15851, 4.82552] as [number, number],
    description:
      "Vistas panorámicas increíbles de la región y el valle del río Gacena.",
    sector: 1,
    category: "Miradores",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    name: "Cascada La Chorrera",
    coordinates: [-73.17234, 4.83567] as [number, number],
    description:
      "Hermosa cascada natural rodeada de vegetación nativa. Ideal para caminatas ecológicas.",
    sector: 2,
    category: "Naturaleza",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    name: "Puente Colonial",
    coordinates: [-73.16289, 4.81876] as [number, number],
    description:
      "Antiguo puente de piedra sobre el río Gacena, patrimonio histórico del municipio.",
    sector: 2,
    category: "Lugares Históricos",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 5,
    name: "Parque Central",
    coordinates: [-73.17, 4.815] as [number, number],
    description:
      "Área verde para el esparcimiento familiar en el centro de la ciudad.",
    sector: 3,
    category: "Parques",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 6,
    name: "Mirador del Sur",
    coordinates: [-73.16, 4.815] as [number, number],
    description: "Vistas panorámicas hacia el sur del municipio.",
    sector: 4,
    category: "Miradores",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 7,
    name: "Plaza Bolivar",
    coordinates: [-73.165, 4.82] as [number, number],
    description:
      "Plaza principal del municipio, rodeada de edificios históricos y monumentos.",
    sector: 1,
    category: "Plazas",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 8,
    name: "Casa de la Cultura",
    coordinates: [-73.168, 4.822] as [number, number],
    description:
      "Institución que promueve la cultura y el arte en el municipio.",
    sector: 1,
    category: "Cultura",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 9,
    name: "Parque de la Vida Silvestre",
    coordinates: [-73.175, 4.828] as [number, number],
    description: "Reserva natural con variedad de flora y fauna silvestre.",
    sector: 2,
    category: "Naturaleza",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 10,
    name: "Iglesia de Nuestra Se ora de los Dolores",
    coordinates: [-73.163, 4.821] as [number, number],
    description: "Iglesia católica del siglo XIX, con arquitectura colonial.",
    sector: 2,
    category: "Religión",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 11,
    name: "Museo de la Ciudad",
    coordinates: [-73.162, 4.819] as [number, number],
    description: "Museo que expone la historia y patrimonio del municipio.",
    sector: 3,
    category: "Museos",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

const sectorColors = {
  1: "#3b82f6", // azul
  2: "#10b981", // verde
  3: "#f59e0b", // amarillo
  4: "#8b5cf6", // morado
};

const categoryColors = {
  "Lugares Históricos": "#8b5cf6",
  Miradores: "#10b981",
  Naturaleza: "#10b981",
  Parques: "#3b82f6",
  Cultura: "#ec4899",
  Religión: "#f43f5e",
  Museos: "#8b5cf6",
  Plazas: "#f59e0b",
};

const allCategories = Array.from(new Set(locations.map((loc) => loc.category)));

const FlyToInterpolator = {
  flyTo: (map: any, options: any) => {
    map.flyTo({
      center: options.center,
      zoom: options.zoom || 12,
      speed: 1.2,
      curve: 1,
      duration: 2000,
    });
  },
};
//Estilos del mapa
const mapStyles = {
  street: "mapbox://styles/mapbox/streets-v11",
  outdoors: "mapbox://styles/mapbox/outdoors-v11",
  light: "mapbox://styles/mapbox/light-v11",
  dark: "mapbox://styles/mapbox/dark-v11",
  satellite: "mapbox://styles/mapbox/satellite-v11",
  satelliteStreets: "mapbox://styles/mapbox/satellite-streets-v11",
};

export function UiMap() {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [selectedSector, setSelectedSector] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mapStyle, setMapStyle] = useState<string>(mapStyles.street);
  const [searchQuery, setSearchQuery] = useState("");
  interface ViewStateType {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
    transitionDuration: number;
    transitionInterpolator: any; // Using any as FlyToInterpolator type is not directly exported
  }

  const [viewState, setViewState] = useState<ViewStateType>({
    longitude: -73.16851,
    latitude: 4.82052,
    zoom: 14,
    pitch: 0,
    bearing: 0,
    transitionDuration: 200,
    transitionInterpolator: FlyToInterpolator,
  });

  // Helper function to update view state while preserving transition properties
  const updateViewState = useCallback((newState: Partial<ViewStateType>) => {
    setViewState((prev) => ({
      ...prev,
      ...newState,
    }));
  }, []);

  // Función para manejar el cambio de estilo del mapa
  const handleStyleChange = useCallback((style: string) => {
    setMapStyle(style);
    // Asegurarse de que el terreno se actualice después de cambiar el estilo
    setTimeout(() => {
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      }
    }, 100);
  }, []);

  const filteredLocations = locations.filter((location) => {
    const matchesSector = !selectedSector || location.sector === selectedSector;
    const matchesCategory =
      !selectedCategory || location.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesCategory && matchesSearch;
  });

  const flyToLocation = (location: Location) => {
    if (mapRef.current) {
      // Get map instance to ensure it's available, but we don't need to store it
      mapRef.current.getMap();
      updateViewState({
        longitude: location.coordinates[0],
        latitude: location.coordinates[1],
        zoom: 15,
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: FlyToInterpolator,
      });
      setPopupInfo(location);
    }
  };

  const handleMarkerClick = (e: any, location: Location) => {
    e.originalEvent.stopPropagation();
    setPopupInfo(location);
    flyToLocation(location);
  };

  // const handleLocationClick = (location: Location) => {
  //   flyToLocation(location);
  // };

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (searchQuery && filteredLocations.length > 0) {
  //     flyToLocation(filteredLocations[0]);
  //   }
  // };

  // const handleResetMap = () => {
  //   setSearchQuery("");
  //   setSelectedSector(null);
  //   setSelectedCategory(null);
  //   updateViewState({
  //     longitude: -73.16851,
  //     latitude: 4.82052,
  //     zoom: 12,
  //     pitch: 0,
  //     bearing: 0,
  //     transitionDuration: 1000,
  //     transitionInterpolator: FlyToInterpolator,
  //   });
  // };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 10,
          width: "300px",
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
      > */}
      {/* <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar lugares..."
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <button 
            type="button"
            onClick={handleResetMap}
            style={{
              padding: '8px 12px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Reset
          </button>
        </form> */}
      {/* {searchQuery && (
          <div style={{ marginTop: '10px', maxHeight: '200px', overflowY: 'auto' }}>
            {filteredLocations.length > 0 ? (
              filteredLocations.map(location => (
                <div 
                  key={`search-${location.id}`}
                  onClick={() => handleLocationClick(location)}
                  onMouseEnter={() => {setHoveredLocation(location)}}
                  onMouseLeave={() => setHoveredLocation(null)}
                  style={{
                    padding: '8px',
                    margin: '4px 0',
                    backgroundColor: hoveredLocation?.id === location.id ? '#f3f4f6' : 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    borderLeft: `3px solid ${sectorColors[location.sector as keyof typeof sectorColors]}`,
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{location.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{location.category}</div>
                </div>
              ))
            ) : (
              <div style={{ padding: '8px', color: '#666', fontSize: '14px' }}>
                No se encontraron resultados
              </div>
            )}
          </div>
        )} */}
      {/* </div> */}
      {/* <div style={{ 
        marginBottom: '20px',
        paddingTop: searchQuery ? '80px' : '0',
        transition: 'padding-top 0.3s ease'
      }}> */}
      {/* <div style={{ 
          display: 'flex', 
          gap: '10px', 
          marginBottom: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => {
              setSelectedSector(null);
              setSelectedCategory(null);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: !selectedSector && !selectedCategory ? '#3b82f6' : '#f3f4f6',
              color: !selectedSector && !selectedCategory ? 'white' : '#1f2937',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            Mostrar Todo
          </button>
          
          {[1, 2, 3, 4].map((sector) => (
            <button
              key={`sector-${sector}`}
              onClick={() => {
                setSelectedSector(selectedSector === sector ? null : sector);
                setSelectedCategory(null);
              }}
              style={{
                padding: '8px 16px',
                backgroundColor: selectedSector === sector 
                  ? sectorColors[sector as keyof typeof sectorColors] 
                  : `${sectorColors[sector as keyof typeof sectorColors]}33`,
                color: selectedSector === sector ? 'white' : '#1f2937',
                border: `1px solid ${sectorColors[sector as keyof typeof sectorColors]}`,
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              Sector {sector}
            </button>
          ))}
        </div> */}

      {/* <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginTop: '10px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {allCategories.map((category) => (
            <button
              key={`cat-${category}`}
              onClick={() => {
                setSelectedCategory(selectedCategory === category ? null : category);
                setSelectedSector(null);
              }}
              style={{
                padding: '6px 12px',
                backgroundColor: selectedCategory === category 
                  ? (categoryColors[category as keyof typeof categoryColors] || '#6b7280')
                  : `${categoryColors[category as keyof typeof categoryColors] || '#6b7280'}33`,
                color: selectedCategory === category ? 'white' : '#1f2937',
                border: `1px solid ${categoryColors[category as keyof typeof categoryColors] || '#6b7280'}`,
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                transition: 'all 0.2s',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
              }}
            >
              {category}
            </button>
          ))}
        </div> */}
      {/* </div> */}
      <div
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            zIndex: 10,
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <button
            onClick={() => {
              if (mapRef.current) {
                const map = mapRef.current.getMap();
                map.zoomIn();
              }
            }}
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              if (mapRef.current) {
                const map = mapRef.current.getMap();
                map.zoomOut();
              }
            }}
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            −
          </button>
        </div>
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            ...viewState,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={mapStyle}
          scrollZoom={false}
        >
          <NavigationControl
            position="top-right"
            showCompass={true}
            showZoom={true}
          />
          <FullscreenControl position="top-right" />

          {/* Controles de estilo de mapa */}
          {/* <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1,
              display: "flex",
              gap: "5px",
            }}
          >
            <button
              onClick={() =>
                handleStyleChange("mapbox://styles/mapbox/satellite-v9")
              }
              style={{
                padding: "5px 10px",
                backgroundColor: mapStyle.includes("satellite")
                  ? "#3b82f6"
                  : "#fff",
                color: mapStyle.includes("satellite") ? "#fff" : "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              Satélite
            </button>
            <button
              onClick={() =>
                handleStyleChange("mapbox://styles/mapbox/streets-v11")
              }
              style={{
                padding: "5px 10px",
                backgroundColor: mapStyle.includes("streets")
                  ? "#3b82f6"
                  : "#fff",
                color: mapStyle.includes("streets") ? "#fff" : "#333",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
              }}
            >
              Mapa
            </button>
          </div> */}

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              longitude={location.coordinates[0]}
              latitude={location.coordinates[1]}
              onClick={(e) => handleMarkerClick(e, location)}
            >
              <div
                onMouseEnter={() => setHoveredLocation(location)}
                onMouseLeave={() => setHoveredLocation(null)}
                style={{
                  width: "24px",
                  height: "24px",
                  backgroundColor: selectedCategory
                    ? categoryColors[
                        location.category as keyof typeof categoryColors
                      ] || "#6b7280"
                    : sectorColors[
                        location.sector as keyof typeof sectorColors
                      ],
                  borderRadius: "50%",
                  border:
                    hoveredLocation?.id === location.id
                      ? "3px solid #ff0"
                      : "2px solid white",
                  transform:
                    hoveredLocation?.id === location.id ? "scale(1.2)" : "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "12px",
                }}
              >
                {location.id}
              </div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              anchor="bottom"
              longitude={Number(popupInfo.coordinates[0])}
              latitude={Number(popupInfo.coordinates[1])}
              onClose={() => setPopupInfo(null)}
              closeButton={true}
              closeOnClick={false}
              closeOnMove={false}
              style={{
                padding: "0",
                margin: "0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
              }}
            >
              <div style={{ maxWidth: "300px", padding: "0", margin: "0" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "180px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={popupInfo.img}
                    alt={popupInfo.name}
                    fill
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      padding: "15px",
                      color: "white",
                    }}
                  >
                    <h3
                      style={{
                        margin: "0 0 5px 0",
                        fontWeight: "700",
                        fontSize: "18px",
                        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                      }}
                    >
                      {popupInfo.name}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          padding: "3px 10px",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          backdropFilter: "blur(5px)",
                        }}
                      >
                        Sector {popupInfo.sector}
                      </span>
                      <span
                        style={{
                          padding: "3px 10px",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "600",
                          backdropFilter: "blur(5px)",
                        }}
                      >
                        {popupInfo.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "15px" }}>
                  <p
                    style={{
                      margin: "0 0 15px 0",
                      color: "#4b5563",
                      fontSize: "14px",
                      lineHeight: "1.5",
                    }}
                  >
                    {popupInfo.description}
                  </p>
                  <button
                    onClick={() =>
                      (window.location.href = `/lugar/${popupInfo.id}`)
                    }
                    className={styles.btn_link}
                  >
                    <span>Ver más detalles</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}

// export function UiMap() {
//   const [popupInfo, setPopupInfo] = useState<Location | null>(null);

//   return (
//     <div style={{ width: '100%', height: '500px', position: 'relative' }}>
//       <Map
//         mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
//         initialViewState={{
//           longitude: -73.16851,
//           latitude: 4.82052,
//           zoom: 12,
//         }}
//         style={{ width: '100%', height: '100%' }}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//       >
//         <NavigationControl position="top-right" />
//         <FullscreenControl position="top-right" />

//         {locations.map((location) => (
//           <Marker
//             key={location.id}
//             longitude={location.coordinates[0]}
//             latitude={location.coordinates[1]}
//             onClick={() => {
//               setPopupInfo(location);
//             }}
//           >
//             <div style={{
//               width: '24px',
//               height: '24px',
//               backgroundColor: '#3b82f6',
//               borderRadius: '50%',
//               border: '2px solid white',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontWeight: 'bold',
//               fontSize: '12px'
//             }}>
//               {location.id}
//             </div>
//           </Marker>
//         ))}

//         {popupInfo && (
//           <Popup
//             anchor="top"
//             longitude={Number(popupInfo.coordinates[0])}
//             latitude={Number(popupInfo.coordinates[1])}
//             onClose={() => setPopupInfo(null)}
//             closeButton={true}
//             closeOnClick={false}
//           >
//             <div style={{ padding: '10px' }}>
//               <h3 style={{ margin: 0, fontWeight: 'bold' }}>{popupInfo.name}</h3>
//               <p style={{ margin: '5px 0 0 0' }}>{popupInfo.description}</p>
//             </div>
//           </Popup>
//         )}
//       </Map>
//     </div>
