import React from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker 
} from 'react-simple-maps';
import { timezones, TimezoneData } from '../utils/timezones';

// Style pour le cercle qui indique la sélection
const selectedCircleStyle = {
  fill: '#FF5533',
  stroke: '#FFFFFF',
  strokeWidth: 2,
  r: 5
};

// Type pour les props du composant
type TimeZoneMapProps = {
  selectedTimezone: string;
  onTimezoneSelect: (timezone: string) => void;
};

// Carte du monde avec projection geoMercator
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export function TimeZoneMap(props: TimeZoneMapProps): React.ReactNode {
  // Fonction pour gérer le clic sur une ville/fuseau horaire
  const handleMarkerClick = (timezone: string): void => {
    props.onTimezoneSelect(timezone);
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Sélectionner un fuseau horaire sur la carte
      </h3>
      <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden h-[300px] bg-gray-100 dark:bg-gray-800">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 147,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                  style={{
                    default: { fill: "#D6D6DA", outline: "none" },
                    hover: { fill: "#F5F5F5", outline: "none" },
                    pressed: { fill: "#E5E5E5", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          
          {timezones.map((tz: TimezoneData) => {
            // Vérifier si les coordonnées sont disponibles
            if (tz.coordinates) {
              const isSelected = props.selectedTimezone === tz.timezone;
              
              return (
                <Marker
                  key={tz.timezone}
                  coordinates={[tz.coordinates.longitude, tz.coordinates.latitude]}
                  onClick={() => handleMarkerClick(tz.timezone)}
                >
                  <circle
                    r={isSelected ? 6 : 4}
                    fill={isSelected ? "#FF5533" : "#0088cc"}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                    style={{ cursor: "pointer" }}
                  />
                  {isSelected && (
                    <text
                      textAnchor="middle"
                      y={-10}
                      style={{
                        fontFamily: "system-ui",
                        fontSize: "8px",
                        fill: "#FFFFFF",
                        textShadow: "0px 0px 2px #000",
                        pointerEvents: "none"
                      }}
                    >
                      {tz.city}
                    </text>
                  )}
                </Marker>
              );
            }
            return null;
          })}
        </ComposableMap>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Cliquez sur un point pour sélectionner un fuseau horaire
      </p>
    </div>
  );
} 