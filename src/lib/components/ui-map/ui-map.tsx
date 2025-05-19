/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CircleLayerSpecification, } from "mapbox-gl";
import React from "react";
import Map,{Layer,Source} from 'react-map-gl/mapbox';

const geojson:any = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-73.16851, 4.82052],
            [-73.16851, 4.83052],
            [-73.15851, 4.83052],
            [-73.15851, 4.82052],
            [-73.16851, 4.82052]
          ]]
        },
        properties: {title: 'San Luis de Gaceno'}
      }
    ]
  };
  
  const layerStyle:CircleLayerSpecification = {
    id: 'point',
    type: 'circle',
    source: 'points',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

export function UiMap() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -73.16851,
        latitude: 4.82052,
        zoom: 15,
      }}
      style={{ width: "90%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      attributionControl={false} 
    >
    <Source id="points" type="geojson" data={geojson} >
    <Layer {...layerStyle} />
    </Source>    
    </Map>
  );
}
