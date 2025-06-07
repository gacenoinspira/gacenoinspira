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
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 2,
    name: "Mirador Natural",
    coordinates: [-73.15851, 4.82552] as [number, number],
    description:
      "Vistas panorámicas increíbles de la región y el valle del río Gacena.",
    sector: 1,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 3,
    name: "Cascada La Chorrera",
    coordinates: [-73.17234, 4.83567] as [number, number],
    description:
      "Hermosa cascada natural rodeada de vegetación nativa. Ideal para caminatas ecológicas.",
    sector: 2,
    category: "actividad",
    img: "/img/turismo.jpg",
  },
  {
    id: 4,
    name: "Puente Colonial",
    coordinates: [-73.16289, 4.81876] as [number, number],
    description:
      "Antiguo puente de piedra sobre el río Gacena, patrimonio histórico del municipio.",
    sector: 2,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 5,
    name: "Parque Central",
    coordinates: [-73.17, 4.815] as [number, number],
    description:
      "Área verde para el esparcimiento familiar en el centro de la ciudad.",
    sector: 3,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 6,
    name: "Mirador del Sur",
    coordinates: [-73.16, 4.815] as [number, number],
    description: "Vistas panorámicas hacia el sur del municipio.",
    sector: 4,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 7,
    name: "Plaza Bolivar",
    coordinates: [-73.165, 4.82] as [number, number],
    description:
      "Plaza principal del municipio, rodeada de edificios históricos y monumentos.",
    sector: 1,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 8,
    name: "Casa de la Cultura",
    coordinates: [-73.168, 4.822] as [number, number],
    description:
      "Institución que promueve la cultura y el arte en el municipio.",
    sector: 1,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 9,
    name: "Parque de la Vida Silvestre",
    coordinates: [-73.175, 4.828] as [number, number],
    description: "Reserva natural con variedad de flora y fauna silvestre.",
    sector: 2,
    category: "actividad",
    img: "/img/turismo.jpg",
  },
  {
    id: 10,
    name: "Iglesia de Nuestra Se ora de los Dolores",
    coordinates: [-73.163, 4.821] as [number, number],
    description: "Iglesia católica del siglo XIX, con arquitectura colonial.",
    sector: 2,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 11,
    name: "Museo de la Ciudad",
    coordinates: [-73.162, 4.819] as [number, number],
    description: "Museo que expone la historia y patrimonio del municipio.",
    sector: 3,
    category: "lugares",
    img: "/img/turismo.jpg",
  },
  {
    id: 12,
    name: "Festival de la Cosecha",
    coordinates: [-73.166, 4.818] as [number, number],
    description:
      "Celebración anual de la cosecha local con música en vivo, comida típica y muestras culturales.",
    sector: 1,
    category: "eventos",
    img: "/img/turismo.jpg",
  },
  {
    id: 13,
    name: "Feria Artesanal",
    coordinates: [-73.164, 4.817] as [number, number],
    description:
      "Exposición y venta de artesanías locales. Último fin de semana de cada mes.",
    sector: 1,
    category: "eventos",
    img: "/img/turismo.jpg",
  },
  {
    id: 14,
    name: "Noche de Poesía",
    coordinates: [-73.168, 4.822] as [number, number],
    description:
      "Lecturas poéticas al aire libre en la Casa de la Cultura. Todos los jueves a las 7 PM.",
    sector: 1,
    category: "eventos",
    img: "/img/turismo.jpg",
  },
  {
    id: 15,
    name: "Carrera de la Montaña",
    coordinates: [-73.17, 4.83] as [number, number],
    description:
      "Carrera de aventura por los senderos naturales del municipio. Incluye categorías para todas las edades.",
    sector: 2,
    category: "eventos",
    img: "/img/turismo.jpg",
  },
  {
    id: 16,
    name: "Festival Gastronómico",
    coordinates: [-73.165, 4.82] as [number, number],
    description:
      "Muestra de la gastronomía local con participación de los mejores restaurantes de la región.",
    sector: 1,
    category: "eventos",
    img: "/img/turismo.jpg",
  },
];

const sectorColors = {
  1: "#3b82f6", // azul
  2: "#10b981", // verde
  3: "#f59e0b", // amarillo
  4: "#8b5cf6", // morado
};

const categoryColors = {
  eventos: "#8b5cf6",
  lugares: "#10b981",
  actividad: "#10b981",
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
    zoom: 16,
    pitch: 0,
    bearing: 0,
    transitionDuration: 1000,
    transitionInterpolator: FlyToInterpolator,
  });

  // Add state for pulsing markers and hover effects
  const [pulsingMarkers, setPulsingMarkers] = useState<Record<number, boolean>>(
    {}
  );
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

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

  // Simplified flyToLocation since we moved the logic to handleMarkerClick
  const flyToLocation = (location: Location) => {
    setPopupInfo(location);
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.flyTo({
        center: [location.coordinates[0], location.coordinates[1]],
        zoom: 15,
        speed: 1.2,
        curve: 1,
        duration: 1500,
        essential: true,
      });

      // Add a slight tilt for better perspective
      setTimeout(() => {
        map.easeTo({
          pitch: 30,
          duration: 1000,
        });
      }, 500);
    }
  };

  const handleMarkerClick = (e: any, location: Location) => {
    e?.originalEvent?.stopPropagation?.();

    // If clicking the same marker, just toggle the popup
    if (popupInfo?.id === location.id) {
      setPopupInfo(null);
    } else {
      // Set popup info first
      setPopupInfo(location);
      // Then fly to location
      if (mapRef.current) {
        const map = mapRef.current.getMap();
        map.flyTo({
          center: [location.coordinates[0], location.coordinates[1]],
          zoom: 16,
          speed: 1.2,
          curve: 1,
          duration: 1500,
          essential: true,
        });

        // Add a slight tilt for better perspective
        setTimeout(() => {
          map.easeTo({
            pitch: 30,
            duration: 1000,
          });
        }, 500);
      }
    }

    // Add pulse effect on click
    setPulsingMarkers((prev) => ({
      ...prev,
      [location.id]: true,
    }));

    // Remove pulse effect after animation
    setTimeout(() => {
      setPulsingMarkers((prev) => ({
        ...prev,
        [location.id]: false,
      }));
    }, 1000);
  };

  // Seismic marker component with earthquake animation on click
  const SeismicMarker = ({
    color,
    size = 20,
    pulse = false,
    onClick,
  }: {
    color: string;
    size?: number;
    pulse?: boolean;
    onClick: (e: React.MouseEvent) => void;
  }) => {
    const markerRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    // Seismic/earthquake effect
    const triggerSeismicEffect = useCallback(() => {
      if (!markerRef.current || isAnimating) return;

      setIsAnimating(true);
      const marker = markerRef.current;

      // Create random seismic movement
      const timeline = gsap.timeline({
        onComplete: () => setIsAnimating(false),
      });

      // Add more pronounced and dynamic random shakes
      const shakeIntensity = 20; // Increased from 15
      const rotationIntensity = 30; // Increased from 25

      for (let i = 0; i < 8; i++) {
        // Increased to 8 shakes for more impact
        // Vary the intensity for a more dynamic effect
        const currentIntensity = shakeIntensity * (1 - i * 0.1);
        const currentRotation = rotationIntensity * (1 - i * 0.1);

        timeline.to(
          marker,
          {
            x: (Math.random() - 0.5) * currentIntensity,
            y: (Math.random() - 0.5) * currentIntensity,
            rotation: (Math.random() - 0.5) * currentRotation,
            scale: 1 + 0.15 * (1 - i * 0.1), // Gradually reduce scale effect
            duration: 0.08 + i * 0.01, // Vary duration slightly
            ease: "power1.inOut",
          },
          `+=${i * 0.03}` // Reduced delay between shakes for faster sequence
        );
      }

      // Return to original position with more pronounced elastic effect
      timeline.to(marker, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.8, // Increased duration for more noticeable return
        ease: "elastic.out(1, 0.3)", // More bouncy effect
      });
    }, [isAnimating]);

    // Handle click with seismic effect
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        triggerSeismicEffect();
        onClick(e);
      },
      [onClick, triggerSeismicEffect]
    );

    return (
      <div
        ref={markerRef}
        onClick={handleClick}
        style={{
          position: "relative",
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transformOrigin: "center bottom",
          cursor: "pointer",
          zIndex: pulse ? 10 : 1,
        }}
      >
        {/* Pulsing effect ring */}
        {pulse && (
          <div
            style={
              {
                position: "absolute",
                width: size * 2.5, // Increased size
                height: size * 2.5, // Increased size
                backgroundColor: `${color}60`, // More opaque
                borderRadius: "50%",
                animation: "pulse 0.8s ease-out", // Faster animation
                transform: "scale(0.4)", // Start smaller for more dramatic effect
                opacity: 0.8, // Start more visible
                zIndex: 0,
                boxShadow: `0 0 20px ${color}80`, // Add glow effect
                // Set the CSS variable for the pulse color
                "--pulse-color": color,
              } as React.CSSProperties
            }
          />
        )}

        {/* Main marker */}
        <div
          className={`seismic-marker ${pulse ? "pulse" : ""}`}
          style={{
            width: size * 0.8,
            height: size * 0.8,
            backgroundColor: color,
            borderRadius: "50%",
            border: "2px solid white",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.81)",
            position: "relative",
            zIndex: 2,
            transform: pulse ? "scale(1.1)" : "scale(1)",
          }}
        >
          {/* Inner circle for depth */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "60%",
              height: "60%",
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "800px", position: "relative" }}>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(0.4);
            opacity: 0.8;
            box-shadow: 0 0 10px #fff, 0 0 20px #fff,
              0 0 30px var(--pulse-color, #4f46e5);
          }
          50% {
            opacity: 0.5;
            box-shadow: 0 0 20px #fff, 0 0 40px #fff,
              0 0 60px var(--pulse-color, #4f46e5);
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
            box-shadow: 0 0 30px #fff, 0 0 60px #fff,
              0 0 90px var(--pulse-color, #4f46e5);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .bounce {
          animation: bounce 1.5s infinite;
        }

        .seismic-marker {
          transition: all 0.2s ease;
        }

        .seismic-marker:hover {
          transform: scale(1.1);
        }

        .seismic-marker.pulse:hover {
          transform: scale(1.2);
        }
      `}</style>
      <div
        style={{
          width: "100%",
          height: "800px",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div className={styles.map_container_btn}>
          {allCategories.map((category) => (
            <button
              key={`cat-${category}`}
              onClick={() => {
                setSelectedCategory(
                  selectedCategory === category ? null : category
                );
                setSelectedSector(null);
              }}
              className={`${styles.categoryButton} ${
                selectedCategory === category ? styles.active : ""
              }`}
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? categoryColors[category as keyof typeof categoryColors] ||
                      "#6b7280"
                    : `${
                        categoryColors[
                          category as keyof typeof categoryColors
                        ] || "#6b7280"
                      }33`,
                color: selectedCategory === category ? "white" : "#1f2937",
                border: `1px solid ${
                  categoryColors[category as keyof typeof categoryColors] ||
                  "#6b7280"
                }`,
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        {/* <div
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
        </div> */}
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

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              longitude={location.coordinates[0]}
              latitude={location.coordinates[1]}
              onClick={(e) => handleMarkerClick(e, location)}
            >
              <div
                onMouseEnter={() => {
                  setHoveredLocation(location);
                  setHoveredMarker(location.id);
                }}
                onMouseLeave={() => {
                  setHoveredLocation(null);
                  setHoveredMarker(null);
                }}
                style={{
                  cursor: "pointer",
                  transform:
                    hoveredMarker === location.id ? "translateY(-5px)" : "none",
                  transition: "transform 0.3s ease, filter 0.3s ease",
                  filter:
                    hoveredMarker === location.id
                      ? "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                      : "none",
                  zIndex: hoveredMarker === location.id ? 10 : 1,
                }}
              >
                <SeismicMarker
                  color={
                    selectedCategory
                      ? categoryColors[
                          location.category as keyof typeof categoryColors
                        ] || "#6b7280"
                      : sectorColors[
                          location.sector as keyof typeof sectorColors
                        ]
                  }
                  pulse={pulsingMarkers[location.id] || false}
                  onClick={(e: any) => handleMarkerClick(e, location)}
                />
                {hoveredMarker === location.id && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      backgroundColor: "white",
                      color: "#333",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      whiteSpace: "nowrap",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      marginBottom: "8px",
                      zIndex: 20,
                    }}
                  >
                    {location.name}
                  </div>
                )}
              </div>
            </Marker>
          ))}

          {popupInfo && (
            <Popup
              key={`popup-${popupInfo.id}`}
              anchor="bottom"
              longitude={popupInfo.coordinates[0]}
              latitude={popupInfo.coordinates[1]}
              onClose={() => setPopupInfo(null)}
              closeButton={false}
              closeOnClick={false}
              closeOnMove={false}
              style={{
                padding: "0",
                margin: "0",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
                maxWidth: "300px",
                zIndex: 1000,
              }}
              // offset={[0, -10]}
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
                  <img
                    src={popupInfo.img}
                    alt={popupInfo.name}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
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
                    <button
                      className={styles.btn_close_popup}
                      onClick={() => setPopupInfo(null)}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}
