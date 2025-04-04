import React, { useState, useEffect } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { timezones, TimezoneData } from '../utils/timezones';
import { feature } from 'topojson-client';

// Type pour les props du composant
type TimeZoneMapProps = {
  selectedTimezone: string;
  onTimezoneSelect: (timezone: string) => void;
};

// URL vers un TopoJSON fiable hébergé sur un CDN (données de NaturalEarth)
// world-atlas renvoie un fichier TopoJSON, pas GeoJSON, d'où les problèmes d'affichage
const WORLD_GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Fallback en cas d'échec de chargement - version très simplifiée des continents
const FALLBACK_GEO = {
  "type": "FeatureCollection",
  "features": [
    {"type":"Feature","properties":{"name":"Afrique"},"geometry":{"type":"Polygon","coordinates":[[[20,-30],[50,-30],[50,30],[20,30],[0,10],[-20,30],[-20,0],[20,-30]]]}},
    {"type":"Feature","properties":{"name":"Europe"},"geometry":{"type":"Polygon","coordinates":[[[0,40],[20,40],[40,60],[30,70],[10,70],[0,60],[0,40]]]}},
    {"type":"Feature","properties":{"name":"Asie"},"geometry":{"type":"Polygon","coordinates":[[[40,0],[40,40],[60,60],[140,60],[140,0],[100,-10],[40,0]]]}},
    {"type":"Feature","properties":{"name":"Amérique du Nord"},"geometry":{"type":"Polygon","coordinates":[[[-160,60],[-60,60],[-60,10],[-120,10],[-160,60]]]}},
    {"type":"Feature","properties":{"name":"Amérique du Sud"},"geometry":{"type":"Polygon","coordinates":[[[-80,10],[-40,10],[-40,-50],[-80,-50],[-80,10]]]}},
    {"type":"Feature","properties":{"name":"Australie"},"geometry":{"type":"Polygon","coordinates":[[[110,-10],[150,-10],[150,-40],[110,-40],[110,-10]]]}}
  ]
};

export function TimeZoneMap(props: TimeZoneMapProps): React.ReactNode {
  const [geoData, setGeoData] = useState<any>(FALLBACK_GEO); // Initialiser avec le fallback
  const [loading, setLoading] = useState<boolean>(true);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // Chargement des données géographiques au montage du composant
  useEffect(() => {
    let isMounted = true; // Pour éviter les mises à jour sur un composant démonté
    setLoading(true);
    
    fetch(WORLD_GEO_URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erreur de réseau: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Données géographiques détaillées chargées");
        if (isMounted) {
          try {
            // Conversion du TopoJSON en GeoJSON
            // @ts-ignore
            const countries = feature(data, data.objects.countries);
            console.log("TopoJSON convertit en GeoJSON avec succès");
            setGeoData(countries);
            setUsingFallback(false);
          } catch (error) {
            console.error("Erreur lors de la conversion TopoJSON->GeoJSON:", error);
            // Continuer avec le fallback
            setUsingFallback(true);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.error("Erreur lors du chargement des données géographiques détaillées:", err);
        if (isMounted) {
          // On utilise déjà le fallback, donc on peut juste indiquer qu'on l'utilise
          setUsingFallback(true);
          setLoading(false);
        }
      });

    // Nettoyage pour éviter les problèmes de mémoire si le composant est démonté
    return () => {
      isMounted = false;
    };
  }, []);

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
      <div className="relative border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden h-[300px] bg-gray-100 dark:bg-[#1e293b]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <svg className="animate-spin h-6 w-6 mb-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Chargement de la carte...</span>
            </div>
          </div>
        ) : (
          <ComposableMap
            projection="geoEqualEarth" // Cette projection est plus réaliste que geoMercator
            projectionConfig={{
              scale: 220, // Augmentation de l'échelle pour un zoom plus prononcé
              center: [0, 20]
            }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#1e293b"
            }}
          >
            <ZoomableGroup 
              zoom={1} // Niveau de zoom initial
              center={[0, 1]} // Position de centrage initial
              minZoom={1} // Zoom minimum autorisé
              maxZoom={4} // Zoom maximum autorisé
            >
              <Geographies geography={geoData}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey || geo.properties?.name || Math.random().toString()}
                      geography={geo}
                      fill="#293548"
                      stroke="#3b4a63"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#3b5170", outline: "none" },
                        pressed: { fill: "#3b5170", outline: "none" }
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
                          r={isSelected ? 6 : 4} // Légèrement plus petits points en raison du zoom
                          fill={isSelected ? "#FF5533" : "#38bdf8"}
                          stroke="#FFFFFF"
                          strokeWidth={1.5}
                        />
                        {isSelected && (
                          <text
                            textAnchor="middle"
                            y={-10}
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
            </ZoomableGroup>
          </ComposableMap>
        )}
        
        {usingFallback && (
          <div className="absolute bottom-0 left-0 right-0 bg-yellow-600 bg-opacity-80 text-white text-xs p-1 text-center">
            Affichage simplifié - impossible de charger la carte détaillée
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
        Cliquez sur un point pour sélectionner un fuseau horaire
      </p>
    </div>
  );
} 