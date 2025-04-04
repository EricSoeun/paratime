export interface TimezoneData {
  city: string;
  timezone: string;
  countryCode: string; // Optionnel, pour afficher un drapeau par exemple
}

// Liste initiale de villes et fuseaux horaires
// Source: Liste des fuseaux horaires IANA (tz database)
export const timezones: TimezoneData[] = [
  { city: 'Londres', timezone: 'Europe/London', countryCode: 'GB' },
  { city: 'Paris', timezone: 'Europe/Paris', countryCode: 'FR' },
  { city: 'Berlin', timezone: 'Europe/Berlin', countryCode: 'DE' },
  { city: 'New York', timezone: 'America/New_York', countryCode: 'US' },
  { city: 'Los Angeles', timezone: 'America/Los_Angeles', countryCode: 'US' },
  { city: 'Tokyo', timezone: 'Asia/Tokyo', countryCode: 'JP' },
  { city: 'Sydney', timezone: 'Australia/Sydney', countryCode: 'AU' },
  { city: 'Moscou', timezone: 'Europe/Moscow', countryCode: 'RU' },
  { city: 'Dubai', timezone: 'Asia/Dubai', countryCode: 'AE' },
  { city: 'Singapour', timezone: 'Asia/Singapore', countryCode: 'SG' },
  { city: 'São Paulo', timezone: 'America/Sao_Paulo', countryCode: 'BR' },
  // Ajoutez d'autres villes si nécessaire
];

// Fonction utilitaire pour obtenir le nom d'affichage (optionnel)
export const getDisplayTimezone = (tz: string): string => {
  // Pourrait retourner un nom plus convivial à l'avenir
  return tz.replace(/_/g, ' ');
};
