export interface TimezoneData {
  city: string;
  timezone: string;
  countryCode: string; // Optionnel, pour afficher un drapeau par exemple
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

// Liste initiale de villes et fuseaux horaires
// Source: Liste des fuseaux horaires IANA (tz database)
export const timezones: TimezoneData[] = [
  { city: 'Londres', timezone: 'Europe/London', countryCode: 'GB', coordinates: { latitude: 51.5074, longitude: -0.1278 } },
  { city: 'Paris', timezone: 'Europe/Paris', countryCode: 'FR', coordinates: { latitude: 48.8566, longitude: 2.3522 } },
  { city: 'Berlin', timezone: 'Europe/Berlin', countryCode: 'DE', coordinates: { latitude: 52.5200, longitude: 13.4050 } },
  { city: 'New York', timezone: 'America/New_York', countryCode: 'US', coordinates: { latitude: 40.7128, longitude: -74.0060 } },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', countryCode: 'US', coordinates: { latitude: 34.0522, longitude: -118.2437 } },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', countryCode: 'JP', coordinates: { latitude: 35.6762, longitude: 139.6503 } },
  { city: 'Sydney', timezone: 'Australia/Sydney', countryCode: 'AU', coordinates: { latitude: -33.8688, longitude: 151.2093 } },
  { city: 'Moscou', timezone: 'Europe/Moscow', countryCode: 'RU', coordinates: { latitude: 55.7558, longitude: 37.6173 } },
  { city: 'Dubai', timezone: 'Asia/Dubai', countryCode: 'AE', coordinates: { latitude: 25.2048, longitude: 55.2708 } },
  { city: 'Singapour', timezone: 'Asia/Singapore', countryCode: 'SG', coordinates: { latitude: 1.3521, longitude: 103.8198 } },
  { city: 'São Paulo', timezone: 'America/Sao_Paulo', countryCode: 'BR', coordinates: { latitude: -23.5505, longitude: -46.6333 } },
  // Ajoutez d'autres villes si nécessaire
];

// Fonction utilitaire pour obtenir le nom d'affichage (optionnel)
export const getDisplayTimezone = (tz: string): string => {
  // Pourrait retourner un nom plus convivial à l'avenir
  return tz.replace(/_/g, ' ');
};
