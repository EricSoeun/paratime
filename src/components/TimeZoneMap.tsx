import React from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker 
} from 'react-simple-maps';
import { timezones, TimezoneData } from '../utils/timezones';

// Type pour les props du composant
type TimeZoneMapProps = {
  selectedTimezone: string;
  onTimezoneSelect: (timezone: string) => void;
};

// Carte du monde avec projection geoMercator
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export function TimeZoneMap(props: TimeZoneMapProps): React.ReactNode {
  // Fonction pour gérer le clic sur une ville/fuseau horaire
  const handleMarkerClick = (timezone: string, event: React.MouseEvent): void => {
    event.stopPropagation(); // Empêcher la propagation de l'événement
    console.log("Marker clicked:", timezone);
    props.onTimezoneSelect(timezone);
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Sélectionner un fuseau horaire sur la carte
      </h3>
      <div className="border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden h-[300px] bg-gray-100 dark:bg-gray-900">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
            center: [0, 20]
          }}
          width={800}
          height={300}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#1e293b" // Fond bleu foncé comme sur le screenshot
          }}
        >
          {/* Fond de carte - pays */}
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#334155" // Couleur plus foncée pour les pays
                  stroke="#475569" // Bordure plus visible
                  strokeWidth={0.5}
                  style={{
                    default: { fill: "#334155", outline: "none" },
                    hover: { fill: "#475569", outline: "none" },
                    pressed: { fill: "#475569", outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          
          {/* Points des fuseaux horaires */}
          {timezones.map((tz: TimezoneData) => {
            // Vérifier si les coordonnées sont disponibles
            if (tz.coordinates) {
              const isSelected = props.selectedTimezone === tz.timezone;
              
              return (
                <Marker
                  key={tz.timezone}
                  coordinates={[tz.coordinates.longitude, tz.coordinates.latitude] as [number, number]}
                  onClick={(event: React.MouseEvent) => handleMarkerClick(tz.timezone, event)}
                >
                  <g className={`timezone-marker ${isSelected ? 'selected' : ''}`}>
                    <circle
                      r={isSelected ? 7 : 5}
                      fill={isSelected ? "#FF5533" : "#38bdf8"} // Point bleu clair, rouge si sélectionné
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                    />
                    {isSelected && (
                      <text
                        textAnchor="middle"
                        y={-12}
                        style={{
                          fontFamily: "system-ui",
                          fontSize: "10px",
                          fontWeight: "bold",
                          fill: "#FFFFFF",
                          textShadow: "0px 0px 3px #000",
                          pointerEvents: "none"
                        }}
                      >
                        {tz.city}
                      </text>
                    )}
                  </g>
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